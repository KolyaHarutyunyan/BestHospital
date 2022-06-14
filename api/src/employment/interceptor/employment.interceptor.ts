import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { EmploymentDto } from '../dto';
import { IEmployment } from '../interface';

@Injectable()
export class EmploymentSanitizer implements ISanitize {
  sanitize(employment: IEmployment): EmploymentDto {
    const employmentDTO: EmploymentDto = {
      id: employment.id,
      title: employment.title,
      staffId: employment.staffId,
      supervisor: employment.supervisor,
      departmentId: employment.departmentId,
      startDate: employment.startDate,
      endDate: employment.endDate,
      active: employment.active,
      schedule: employment.schedule,
      type: employment.type,
      termination: employment.termination,
    };
    return employmentDTO;
  }

  sanitizeMany(employments: IEmployment[]): EmploymentDto[] {
    const employmentDTOs: EmploymentDto[] = [];
    for (let i = 0; i < employments.length; i++) {
      employmentDTOs.push(this.sanitize(employments[i]));
    }
    return employmentDTOs;
  }
}
