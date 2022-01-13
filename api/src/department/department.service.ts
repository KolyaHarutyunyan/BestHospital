import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { MongooseUtil } from '../util';
import { UpdateDepartmentDTO, CreateDepartmentDTO, DepartmentDTO } from './dto';
import { DepartmentModel } from './department.model';
import { IDepartment } from './interface';
import { Model } from 'mongoose';
import { DepartmentSanitizer } from './interceptor/department.sanitizer';

@Injectable()
export class DepartmentService {
  constructor(private readonly sanitizer: DepartmentSanitizer) {
    this.model = DepartmentModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IDepartment>;
  private mongooseUtil: MongooseUtil;

  // create the department
  async create(dto: CreateDepartmentDTO): Promise<DepartmentDTO> {
    try {
      const department = new this.model({
        name: dto.name,
      });
      await department.save();
      return this.sanitizer.sanitize(department);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Department already exists');
      throw e;
    }
  }

  // find all departments
  async findAll(): Promise<DepartmentDTO[]> {
    try {
      const departments = await this.model.find();
      return this.sanitizer.sanitizeMany(departments);
    } catch (e) {
      throw e;
    }
  }

  // find the department
  async findOne(_id: string): Promise<DepartmentDTO> {
    const department = await this.model.findById({ _id });
    this.checkDepartment(department);
    return this.sanitizer.sanitize(department);
  }

  // update the department
  async update(_id: string, dto: UpdateDepartmentDTO): Promise<DepartmentDTO> {
    try {
      const department = await this.model.findById({ _id });
      this.checkDepartment(department);
      department.name = dto.name;
      await department.save();
      return this.sanitizer.sanitize(department);
    } catch (e) {
      throw e;
    }
  }

  // remove the department
  async remove(_id: string): Promise<string> {
    try {
      const department = await this.model.findByIdAndDelete({ _id });
      this.checkDepartment(department);
      return department._id;
    } catch (e) {
      throw e;
    }
  }

  /** Private methods */
  /** if the department is not valid, throws an exception */
  private checkDepartment(department: IDepartment) {
    if (!department) {
      throw new HttpException('Department with this id was not found', HttpStatus.NOT_FOUND);
    }
  }
}
