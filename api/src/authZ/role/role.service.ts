import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { RoleSanitizer } from './interceptors';
import { RoleModel } from './role.model';
import { CreateRoleDTO, CreateRoleOptions, RoleDTO } from './dto';
import { IRole } from './interface';
import { IPermission } from '../permission';
import { RoleUpdateDTO } from './dto';
import { MongooseUtil } from '../../util';

@Injectable()
export class RoleService {
  constructor(private readonly sanitizer: RoleSanitizer) {
    this.roleModel = RoleModel;
    // this.sanitizer = new RoleSanitizer();
    this.mongooseUtil = new MongooseUtil();
  }

  // private sanitizer: RoleSanitizer;
  private roleModel: Model<IRole>;
  private mongooseUtil: MongooseUtil;
  /** Service API */
  /** Get All roles from the system */
  async getRoles(): Promise<RoleDTO[]> {
    const roles = await this.roleModel.find().populate('permissions');
    return this.sanitizer.sanitizeMany(roles);
  }

  /** Get a single role with permissions */
  async getRole(id: string): Promise<RoleDTO> {
    const role = await this.roleModel.findOne({ _id: id }).populate('permissions');
    return this.sanitizer.sanitize(role);
  }

  /** Get the roles given by the roles array with their permissions, extracts permission codes and returns the aggregate as an array */
  async getUserPermissionSet(roles: string[]): Promise<Set<number>> {
    if (!roles || roles.length < 1) return new Set<number>();
    const rolesWithPermissionCodes = await this.roleModel
      .find({
        _id: { $in: roles },
      })
      .populate('permissions');
    const codeSet = new Set<number>();
    let rolePermissions: IPermission[];
    for (let i = 0; i < rolesWithPermissionCodes.length; i++) {
      rolePermissions = (<unknown>rolesWithPermissionCodes[i].permissions) as IPermission[];
      rolePermissions.map((permission) => codeSet.add(permission.code));
    }
    return codeSet;
  }

  /** Create a new role and set the permission IDs */
  async createRole(createRoleDTO: CreateRoleDTO, options?: CreateRoleOptions): Promise<RoleDTO> {
    let role: IRole = new this.roleModel({
      title: createRoleDTO.title,
      description: createRoleDTO.description,
      permissions: createRoleDTO.permissions,
      isDefault: options?.isDefault,
    });
    try {
      role = await (await role.save()).populate('permissions').execPopulate();
      return this.sanitizer.sanitize(role);
    } catch (err) {
      this.mongooseUtil.checkDuplicateKey(err, 'A role with this title already exists');
      throw err;
    }
  }

  /** Updates role details */
  async updateRole(roleId: string, roleUpdateDTO: RoleUpdateDTO): Promise<RoleDTO> {
    let role = await this.roleModel.findById(roleId);
    this.checkRole(role);
    this.updateRoleFields(role, roleUpdateDTO);
    role = await (await role.save()).populate('permissions').execPopulate();
    return this.sanitizer.sanitize(role);
  }

  /** Add a permission to this role (only unique values will be added) */
  async addPermissions(roleId: string, permissions: string[]): Promise<RoleDTO> {
    let role = await this.roleModel.findById(roleId);
    // create a unique set to check permission duplicas
    const permissionSet: Set<string> = new Set(role.permissions);
    for (let i = 0; i < role.permissions.length; i++) {
      permissionSet.add(role.permissions[i].toString());
    }
    // Check if the permission already existed in the role
    for (let i = 0; i < permissions.length; i++) {
      if (!permissionSet.has(permissions[i])) {
        role.permissions.push(permissions[i]);
      }
    }
    role = await (await role.save()).populate('permissions').execPopulate();
    return this.sanitizer.sanitize(role);
  }

  /** Remove permission from this role if it exists */
  async removePermission(roleId: string, permissions: string[]): Promise<RoleDTO> {
    const role = await this.roleModel
      .findOneAndUpdate({ _id: roleId }, { $pullAll: { permissions: permissions } }, { new: true })
      .populate('permissions');
    return this.sanitizer.sanitize(role);
  }

  /** Deletes a role and returns 1 if it was deleted and 0 if it was not  */
  async deleteRole(roleId: string) {
    const role = await this.roleModel.findById(roleId);
    this.checkForDefaultRole(role);
    const deleted = await this.roleModel.deleteOne({ _id: roleId });
    if (deleted.n && deleted.n == 1) {
      return roleId;
    }
    throw new HttpException('Role was not deleted', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  /** Private API */
  /** Checks if the role is default  */
  private checkForDefaultRole(role: IRole) {
    if (role.isDefault) {
      throw new HttpException('Default roles cannot be deleted', HttpStatus.FORBIDDEN);
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
      throw new HttpException('Role update details were not provided', HttpStatus.NOT_MODIFIED);
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
}
