import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AdminDTO, CreateAdminDTO } from './dto';
import { Sanitizer } from './interceptor';
import { IAdmin } from './interface';
import { AdminModel } from './admin.model';

@Injectable()
export class AdminService {
  constructor() {
    this.model = AdminModel;
    this.sanitizer = new Sanitizer();
  }
  private model: Model<IAdmin>;
  private readonly sanitizer: Sanitizer;

  /** Create a new user */
  create = async (createAdminDTO: CreateAdminDTO): Promise<AdminDTO> => {
    let user = await this.model.findOne({ email: createAdminDTO.email });
    this.checkEmail(user);
    user = new this.model({
      email: createAdminDTO.email,
      firstName: createAdminDTO.firstName,
      lastName: createAdminDTO.lastName,
    });
    user = await user.save();
    createAdminDTO.id = user._id;
    return this.sanitizer.sanitizeAdmin(user);
  };

  /* Find the user and return it using the authId. This is for internal use only. */
  async findById(id: string): Promise<IAdmin> {
    return this.model.findOne({ _id: id });
  }

  /** Find the user using the email */
  async findByEmail(email: string): Promise<AdminDTO> {
    const user = await this.model.findOne({ email: email });
    return this.sanitizer.sanitizeAdmin(user);
  }

  /** returns all users */
  async getUsers(): Promise<AdminDTO[]> {
    const admins = await this.model.find();
    return this.sanitizer.sanitizeMany(admins);
  }

  /** Private methods */
  private checkEmail(admin: IAdmin) {
    if (admin) {
      throw new HttpException(
        'User with this email exists',
        HttpStatus.CONFLICT,
      );
    }
  }
}
