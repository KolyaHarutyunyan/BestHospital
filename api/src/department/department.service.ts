import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { MongooseUtil } from '../util';
import { CreateDepartmentDto } from './dto/create.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentModel } from './department.model';
import { IDepartment } from './interface';
import { Model } from 'mongoose';

@Injectable()
export class DepartmentService {
  constructor(
    // private readonly terminationService: TerminationService,
    // private readonly sanitizer: EmploymentSanitizer,
  ) {
    this.model = DepartmentModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IDepartment>;
  private mongooseUtil: MongooseUtil;

  async create(dto: CreateDepartmentDto) {
    try {
      let department = new this.model({
        name: dto.name
      });
      await department.save();
    }
    catch (e) {
      throw e
    }
  }

  findAll() {
    return `This action returns all department`;
  }

  async findOne(_id: string) {
    let department = await this.model.findById({ _id })
    this.checkDepartment(department)
    return department;
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
  /** Private methods */
  /** if the department is not valid, throws an exception */
  private checkDepartment(department: IDepartment) {
    if (!department) {
      throw new HttpException(
        'Profile with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
