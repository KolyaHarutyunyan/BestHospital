import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { FundingService } from '../../funding';
import { MongooseUtil } from '../../util';
import { ClientModel } from '../client.model';
import { IClient } from '../interface';
import { CreateEnrollmentDTO, EnrollmentDTO, UpdateEnrollmentDTO } from './dto';
import { ClientEnrollmentModel } from './enrollment.model';
import { EnrollmentSanitizer } from './interceptor/enrollment.sanitizer';
import { IEnrollment } from './interface';

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

  // create enrollment
  async create(
    dto: CreateEnrollmentDTO,
    clientId: string,
    funderId: string,
  ): Promise<EnrollmentDTO> {
    try {
      if (new Date(dto.startDate) > new Date(Date.now())) {
        throw new HttpException('Date cannot be in the future', HttpStatus.BAD_REQUEST);
      }
      const [client, activeEnrollment] = await Promise.all([
        this.clientModel.findById({ _id: clientId }),
        this.model.findOne({ clientId, funderId, terminationDate: null }),
        this.fundingService.findById(funderId),
      ]);
      this.checkClient(client);
      if (activeEnrollment) {
        throw new HttpException('Can not be two active enrollment', HttpStatus.BAD_REQUEST);
      }
      if (dto.primary) {
        const findEnrollment = await this.model.findOne({ clientId, primary: true });
        if (findEnrollment !== null) {
          findEnrollment.primary = false;
          await findEnrollment.save();
        }
      }
      const enrollment = new this.model({
        clientId,
        funderId,
        primary: dto.primary,
        startDate: dto.startDate,
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

  // find all enrollments
  async findAll(clientId: string): Promise<EnrollmentDTO[]> {
    try {
      const enrollments = await this.model
        .find({ clientId })
        .populate({ path: 'funderId', select: 'name' });
      return this.sanitizer.sanitizeMany(enrollments);
    } catch (e) {
      throw e;
    }
  }
  // find enrollment by funder
  async findByFunder(funderId: string): Promise<EnrollmentDTO> {
    try {
      const enrollment = await this.model.findOne({ funderId });
      this.checkEnrollment(enrollment);
      if (enrollment.terminationDate) {
        throw new HttpException('Enrollment is not active', HttpStatus.NOT_FOUND);
      }
      return this.sanitizer.sanitize(enrollment);
    } catch (e) {
      throw e;
    }
  }
  // update the enrollment
  async update(
    _id: string,
    clientId: string,
    funderId: string,
    dto: UpdateEnrollmentDTO,
  ): Promise<EnrollmentDTO> {
    try {
      const [enrollment, client, activeEnrollment] = await Promise.all([
        this.model.findById({ _id, clientId }),
        this.clientModel.findById({ _id: clientId }),
        this.model.findOne({ clientId, funderId, terminationDate: null }),
        this.fundingService.findById(funderId),
      ]);
      this.checkEnrollment(enrollment);
      this.checkClient(client);
      if (activeEnrollment && activeEnrollment._id.toString() !== _id.toString()) {
        throw new HttpException('Can not be two active enrollment', HttpStatus.BAD_REQUEST);
      }
      enrollment.funderId = funderId;
      if (dto.startDate) {
        if (new Date(dto.startDate) > new Date(Date.now())) {
          throw new HttpException('Date cannot be in the future', HttpStatus.BAD_REQUEST);
        }
        enrollment.startDate = dto.startDate;
      }
      if (dto.primary) {
        if (enrollment.terminationDate) {
          throw new HttpException(
            'Can not set primary because enrollment have a termination date',
            HttpStatus.BAD_REQUEST,
          );
        }
        const findEnrollment = await this.model.findOne({ clientId, primary: true });
        if (findEnrollment !== null && enrollment.id != findEnrollment.id) {
          findEnrollment.primary = false;
          await findEnrollment.save();
        }
      }

      enrollment.primary = dto.primary;
      // enrollment.funderId = funderId;
      await enrollment.save();
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
  /** terminate enrollment */
  async terminate(_id: string): Promise<EnrollmentDTO> {
    const enrollment = await this.model.findById({ _id });
    this.checkEnrollment(enrollment);
    enrollment.terminationDate = new Date(Date.now());
    enrollment.primary ? (enrollment.primary = false) : undefined;
    await enrollment.save();
    return this.sanitizer.sanitize(enrollment);
  }
  //remove the enrollment
  // async remove(_id: string): Promise<string> {
  //   const enrollment = await this.model.findById({ _id });
  //   this.checkEnrollment(enrollment);
  //   if (enrollment.primary) {
  //     throw new HttpException('Can not delete the primary enrollment', HttpStatus.NOT_FOUND);
  //   }
  //   await enrollment.remove();
  //   return enrollment._id;
  // }

  /** Private methods */
  /** if the client is not found, throws an exception */
  private checkClient(client: IClient) {
    if (!client) {
      throw new HttpException('Client with this id was not found', HttpStatus.NOT_FOUND);
    }
  }

  /** if the enrollment is not found, throws an exception */
  private checkEnrollment(enrollment: IEnrollment) {
    if (!enrollment) {
      throw new HttpException('Enrollment with this id was not found', HttpStatus.NOT_FOUND);
    }
  }
}
