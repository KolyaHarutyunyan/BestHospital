import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../../util';
import { IEnrollment } from '../interface';
import { EnrollmentDTO } from '../dto';

@Injectable()
export class EnrollmentSanitizer implements ISanitize {
  sanitize(enrollment: IEnrollment): EnrollmentDTO {
    const enrollmentDTO: EnrollmentDTO = {
      id: enrollment.id,
      clientId: enrollment.clientId,
      funderId: enrollment.funderId,
      primary: enrollment.primary,
      startDate: enrollment.startDate,
      terminationDate: enrollment.terminationDate,
    };
    return enrollmentDTO;
  }

  sanitizeMany(enrollments: IEnrollment[]): EnrollmentDTO[] {
    const enrollmentDTOs: EnrollmentDTO[] = [];
    for (let i = 0; i < enrollments.length; i++) {
      enrollmentDTOs.push(this.sanitize(enrollments[i]));
    }
    return enrollmentDTOs;
  }
}
