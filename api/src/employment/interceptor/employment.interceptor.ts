import { Injectable } from '@nestjs/common';
import { TerminationDTO, CreateTerminationDto } from '../../termination/dto';
import { ISanitize } from '../../util';
import { EmploymentDto } from '../dto';
import { IEmployment } from '../interface';

@Injectable()
export class EmploymentSanitizer implements ISanitize {
    constructor() { }

    sanitize(employment: IEmployment): EmploymentDto {
        const employmentDTO: EmploymentDto = {
            id: employment.id,
            title: employment.title,
            staffId: employment.staffId,
            supervisor: employment.supervisor,
            departmentId: employment.departmentId,
            date: employment.date,
            schedule: employment.schedule,
            termination: employment.termination
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
