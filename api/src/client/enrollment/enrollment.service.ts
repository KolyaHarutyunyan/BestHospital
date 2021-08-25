import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MongooseUtil } from '../../util';
import { Model } from 'mongoose';
import { ClientEnrollmentModel } from './enrollment.model';
import { ClientModel } from '../client.model';
import { CreateEnrollmentDTO, EnrollmentDTO, UpdateEnrollmentDTO } from './dto';
import { IEnrollment } from './interface';
import { IClient } from '../interface';
import { FundingService } from '../../funding';
import { EnrollmentSanitizer } from './interceptor/enrollment.sanitizer';

@Injectable()
export class EnrollmentService {
  constructor(
    private readonly fundingService: FundingService,
    private readonly sanitizer: EnrollmentSanitizer,

  ) {
    this.model = ClientEnrollmentModel;
    this.clientModel = ClientModel;
    this.mongooseUtil = new MongooseUtil();
  }

  private model: Model<IEnrollment>;
  private clientModel: Model<IClient>;


  private mongooseUtil: MongooseUtil;

  async create(dto: CreateEnrollmentDTO, clientId: string, funderId: string): Promise<EnrollmentDTO> {
    try {
      const client = await this.clientModel.findById({ _id: clientId });
      this.checkClient(client);
      const funder = await this.fundingService.findOne(funderId);

      if (dto.primary) {
        const findEnrollment = await this.model.findOne({ clientId, primary: true });
        if (findEnrollment !== null) {
          findEnrollment.primary = false;
          await findEnrollment.save()
        }
      }
      let enrollment = new this.model({
        clientId,
        funderId,
        primary: dto.primary,
        startDate: dto.startDate,
        terminationDate: dto.terminationDate
      });
      await enrollment.save();

      if (enrollment.primary) {
        client.enrollment = funderId;
        await client.save();
      }
      return this.sanitizer.sanitize(enrollment);

    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Enrollment already exists');
      throw e;
    }
  }

  async findAll(clientId: string): Promise<EnrollmentDTO[]> {
    try {
      const enrollments = await this.model.find({ clientId }).populate({ path: 'funderId', select: 'name' });
      this.checkEnrollment(enrollments[0]);
      return this.sanitizer.sanitizeMany(enrollments);
    } catch (e) {
      throw e;
    }
  }

  async update(_id: string, clientId: string, funderId: string, dto: UpdateEnrollmentDTO): Promise<EnrollmentDTO> {
    try {
      const enrollment = await this.model.findById({ _id, clientId });
      this.checkEnrollment(enrollment);
      const client = await this.clientModel.findById({ _id: clientId });
      this.checkClient(client);
      if (dto.startDate) {
        let startDate = new Date(dto.startDate);
        this.checkTime(startDate);
        enrollment.startDate = startDate.toLocaleDateString()
      };
      if (dto.terminationDate) {
        let terminationDate = new Date(dto.terminationDate);
        this.checkTime(terminationDate);
        enrollment.terminationDate = terminationDate.toLocaleDateString()
      };

      if (dto.primary) {
        const findEnrollment = await this.model.findOne({ clientId, primary: true });
        if (findEnrollment !== null && enrollment.id != findEnrollment.id) {
          findEnrollment.primary = false;
          await findEnrollment.save()
        }
      }

      enrollment.primary = dto.primary;
      // enrollment.funderId = funderId;
      await enrollment.save()
      if (enrollment.primary) {
        client.enrollment = funderId;
        await client.save();
      }
      // return enrollment
      return this.sanitizer.sanitize(enrollment);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Client already exists');
      throw e;
    }
  }

  async remove(_id: string): Promise<string> {
    const enrollment = await this.model.findById({ _id });
    this.checkEnrollment(enrollment);
    if (enrollment.primary) {
      throw new HttpException(
        'Can not delete the primary enrollment',
        HttpStatus.NOT_FOUND,
      );
    }
    await enrollment.remove()
    return enrollment._id;
  }
  /** Private methods */
  /** if the date is not valid, throws an exception */
  private checkTime(date: Date) {
    if (isNaN(date.getTime())) {
      throw new HttpException(
        'Date with this format was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  /** Private methods */
  /** if the client is not found, throws an exception */
  private checkClient(client: IClient) {
    if (!client) {
      throw new HttpException(
        'Profile with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  /** if the enrollment is not found, throws an exception */
  private checkEnrollment(enrollment: IEnrollment) {
    if (!enrollment) {
      throw new HttpException(
        'Profile with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  /** if the contact is not found, throws an exception */
  // private checkContact(contact: IContact) {
  //   if (!contact) {
  //     throw new HttpException(
  //       'Profile with this id was not found',
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  // }
}
