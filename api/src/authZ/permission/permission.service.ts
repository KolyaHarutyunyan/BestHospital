import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Sanitizer } from './interceptors';
import { PermissionModel } from './permission.model';
import { AddPermissionDTO, PermissionDTO, UpdatePermissionDTO } from './dto';
import { IPermission } from './interface';
import { MONGO_DUPLICATE_KEY } from './permission.constants';

@Injectable()
export class PermissionService {
  constructor() {
    this.model = PermissionModel;
    this.sanitizer = new Sanitizer();
  }

  private sanitizer: Sanitizer;
  private model: Model<IPermission>;

  /** Service API */
  /** Returns the list of permissions */
  async getAll(): Promise<PermissionDTO[]> {
    const permissions = await this.model.find();
    return this.sanitizer.sanitizePermissions(permissions);
  }

  /** adds permissions the permission list */
  async add(permissions: AddPermissionDTO[]): Promise<PermissionDTO[]> {
    const permissionModels: IPermission[] = [];
    permissions.map((permission) =>
      permissionModels.push(
        new this.model({
          title: permission.title,
          description: permission.description,
          code: permission.code,
        }),
      ),
    );
    try {
      const newPermissions = await this.model.insertMany(permissionModels);
      return this.sanitizer.sanitizePermissions(newPermissions);
    } catch (err) {
      if (err.code === MONGO_DUPLICATE_KEY) {
        throw new HttpException(
          'one or more permissions have a code that already was used',
          HttpStatus.CONFLICT,
        );
      }
      throw err;
    }
  }

  /** Deletes a particular permission */
  async delete(permissionId: string): Promise<number> {
    const result = await this.model.deleteOne({ _id: permissionId });
    return result.n;
  }

  /** Updates the title and/or description of the permission */
  async update(
    permissionId: string,
    updateDTO: UpdatePermissionDTO,
  ): Promise<PermissionDTO> {
    const permission = await this.model.findById(permissionId);
    this.checkPermission(permission);
    this.updateFields(permission, updateDTO);
    return this.sanitizer.sanitizePermission(permission);
  }

  /** Private Methods */

  /** update role details */
  private updateFields(perm: IPermission, updateDTO: UpdatePermissionDTO) {
    if (!updateDTO) {
      throw new HttpException(
        'Permission update details were not provided',
        HttpStatus.NOT_MODIFIED,
      );
    }
    if (updateDTO.title) {
      //update title
      perm.title = updateDTO.title;
    }
    if (updateDTO.description) {
      //update Description
      perm.description = updateDTO.description;
    }
  }

  /** Throws an error if the permission is not found */
  private checkPermission(perm: IPermission) {
    if (!perm) {
      throw new HttpException(
        'Such permission was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
