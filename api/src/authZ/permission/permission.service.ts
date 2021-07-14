import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PermissionSanitizer } from './interceptors';
import { PermissionModel } from './permission.model';
import { AddPermissionDTO, PermissionDTO, UpdatePermissionDTO } from './dto';
import { IPermission } from './interface';
import { MongooseUtil } from '../../util';

@Injectable()
export class PermissionService {
  constructor(private readonly sanitizer: PermissionSanitizer) {
    this.model = PermissionModel;
    // this.sanitizer = new Sanitizer();
    this.mongooseUtil = new MongooseUtil();
  }

  // private sanitizer: Sanitizer;
  private model: Model<IPermission>;
  private mongooseUtil: MongooseUtil;

  /** Service API */
  /** Returns the list of permissions */
  async getAll(): Promise<PermissionDTO[]> {
    const permissions = await this.model.find();
    return this.sanitizer.sanitizeMany(permissions);
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
      return this.sanitizer.sanitizeMany(newPermissions);
    } catch (err) {
      this.mongooseUtil.checkDuplicateKey(
        err,
        'Permission with this code exists',
      );
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
    return this.sanitizer.sanitize(permission);
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
