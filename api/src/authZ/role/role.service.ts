import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Sanitizer } from './interceptors';
import { RoleModel } from './role.model';
import { CreateRoleDTO, CreateRoleOptions, RoleDTO } from './dto';
import { IRole } from './interface';
import { MONGO_DUPLICATE_KEY } from './role.constants';
import { IPermission } from '../permission';
import { RoleUpdateDTO } from './dto';

@Injectable()
export class RoleService {
  constructor() {
    this.roleModel = RoleModel;
    this.sanitizer = new Sanitizer();
  }

  private sanitizer: Sanitizer;
  private roleModel: Model<IRole>;

  /** Service API */
  /** Get All roles from the system */
  async getRoles(): Promise<RoleDTO[]> {
    const roles = await this.roleModel.find();
    return this.sanitizer.sanitizeRoles(roles);
  }

  /** Get a single role with permissions */
  async getRole(id: string): Promise<RoleDTO> {
    const role = await this.roleModel.findOne({ _id: id });
    return this.sanitizer.sanitizeRole(role);
  }

  /** Get the roles given by the roles array with their permissions, extracts permission codes and returns the aggregate as an array */
  async getUserPermissionSet(roles: string[]): Promise<Set<number>> {
    const rolesWithPermissionCodes = await this.roleModel
      .find({
        _id: { $in: roles },
      })
      .populate('permissions');
    const codeSet = new Set<number>();
    let rolePermissions: IPermission[];
    for (let i = 0; i < rolesWithPermissionCodes.length; i++) {
      rolePermissions = (<unknown>(
        rolesWithPermissionCodes[i].permissions
      )) as IPermission[];
      rolePermissions.map((permission) => codeSet.add(permission.code));
    }
    return codeSet;
  }

  /** Create a new role and set the permission IDs */
  async createRole(
    createRoleDTO: CreateRoleDTO,
    options?: CreateRoleOptions,
  ): Promise<RoleDTO> {
    let role: IRole = new this.roleModel({
      title: createRoleDTO.title,
      description: createRoleDTO.description,
      permissions: createRoleDTO.permissions,
      isDefault: options?.isDefault,
    });
    try {
      role = await role.save();
      return this.sanitizer.sanitizeRoles([role])[0];
    } catch (err) {
      if (err.code === MONGO_DUPLICATE_KEY) {
        throw new HttpException(
          'A role with this title already exists, provide a unique title',
          HttpStatus.CONFLICT,
        );
      }
      throw err;
    }
  }

  /** Updates role details */
  async updateRole(
    roleId: string,
    roleUpdateDTO: RoleUpdateDTO,
  ): Promise<RoleDTO> {
    let role = await this.roleModel.findById(roleId);
    this.checkRole(role);
    this.updateRoleFields(role, roleUpdateDTO);
    role = await role.save();
    return this.sanitizer.sanitizeRole(role);
  }

  /** Add a permission to this role */
  async addPermission(roleId: string, permissionId: string): Promise<RoleDTO> {
    let role = await this.roleModel.findById(roleId);
    this.canAddPermission(role.permissions, permissionId);
    role.permissions.push(permissionId);
    role = await role.save();
    return this.sanitizer.sanitizeRole(role);
  }

  /** Remove permission from this role if it exists */
  async removePermission(
    roleId: string,
    permissionId: string,
  ): Promise<RoleDTO> {
    const role = await this.roleModel.findOneAndUpdate(
      { _id: roleId },
      { $pull: { permissions: permissionId } },
      { new: true },
    );
    return this.sanitizer.sanitizeRole(role);
  }

  /** Deletes a role and returns 1 if it was deleted and 0 if it was not  */
  async deleteRole(roleId: string) {
    const role = await this.roleModel.findById(roleId);
    this.checkForDefaultRole(role);
    const deleted = await this.roleModel.deleteOne({ _id: roleId });
    if (deleted.n && deleted.n == 1) {
      return roleId;
    }
    throw new HttpException(
      'Role was not deleted',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  /** Private API */
  /** Checks if the role is default  */
  private checkForDefaultRole(role: IRole) {
    if (role.isDefault) {
      throw new HttpException(
        'Default roles cannot be deleted',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  /** Throws an error if the role is not found */
  private checkRole(role: IRole) {
    if (!role) {
      throw new HttpException('Such role was not found', HttpStatus.NOT_FOUND);
    }
  }

  /** update role details */
  private updateRoleFields(role: IRole, roleUpdateDTO: RoleUpdateDTO) {
    if (!roleUpdateDTO) {
      throw new HttpException(
        'Role update details were not provided',
        HttpStatus.NOT_MODIFIED,
      );
    }
    if (roleUpdateDTO.title) {
      //update title
      role.title = roleUpdateDTO.title;
    }
    if (roleUpdateDTO.description) {
      //update Description
      role.description = roleUpdateDTO.description;
    }
  }

  /** Checks if this permission can be added to the role */
  private canAddPermission(permissions: string[], permissionId: string) {
    if (permissions.filter((p) => p === permissionId)) {
      throw new HttpException(
        'This permisssion was alread added to the role',
        HttpStatus.CONFLICT,
      );
    }
  }
}
