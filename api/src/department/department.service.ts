import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { MongooseUtil } from '../util';
import { UpdateDepartmentDTO, CreateDepartmentDTO, DepartmentDTO } from './dto'
import { DepartmentModel } from './department.model';
import { IDepartment } from './interface';
import { Model } from 'mongoose';

@Injectable()
export class DepartmentService {
  constructor() {
    this.model = DepartmentModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IDepartment>;
  private mongooseUtil: MongooseUtil;

  async create(dto: CreateDepartmentDTO): Promise<DepartmentDTO> {
    try {
      let department = new this.model({
        name: dto.name
      });
      await department.save();
      return department;
    }
    catch (e) {
      throw e
    }
  }

  async findAll(): Promise<DepartmentDTO[]> {
    try {
      const departments = await this.model.find();
      this.checkDepartment(departments[0]);
      return departments
    }
    catch (e) {
      throw e
    }
  }

  async findOne(_id: string): Promise<DepartmentDTO> {
    let department = await this.model.findById({ _id })
    this.checkDepartment(department)
    return department;
  }

  async update(_id: string, dto: UpdateDepartmentDTO): Promise<DepartmentDTO> {
    try {
      const department = await this.model.findById({ _id });
      this.checkDepartment(department);
      department.name = dto.name;
      await department.save()
      return department
    }
    catch (e) {
      throw e
    }
  }

  async remove(_id: string): Promise<string> {
    try {
      const department = await this.model.findByIdAndDelete({ _id });
      this.checkDepartment(department);
      return department._id;
    }
    catch (e) {
      throw e
    }
  }
  /** Private methods */
  /** if the department is not valid, throws an exception */
  private checkDepartment(department: IDepartment) {
    if (!department) {
      throw new HttpException(
        'Department with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
