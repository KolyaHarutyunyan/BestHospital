import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { IEnrollment } from '../interface';
import { EnrollmentDTO } from '../dto';
// import { AddressSanitizer } from '../../address';

@Injectable()
export class EnrollmentSanitizer implements ISanitize {
    constructor(
        //   private readonly addressSanitizer: AddressSanitizer
    ) { }

    sanitize(enrollment: IEnrollment): EnrollmentDTO {
        const enrollmentDTO: EnrollmentDTO = {
            primary: enrollment.primary,
            startDate: enrollment.startDate,
            terminationDate: enrollment.terminationDate,
            fundingSource: enrollment.fundingSource,
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
