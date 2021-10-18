import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { IDepartment } from '../interface';
import { DepartmentDTO } from '../dto';

@Injectable()
export class DepartmentSanitizer implements ISanitize {
    constructor(
    ) { }

    sanitize(department: IDepartment): DepartmentDTO {
        const departmentDTO: DepartmentDTO = {
            id: department.id,
            name: department.name
        };
        return departmentDTO;
    }

    sanitizeMany(departments: IDepartment[]): DepartmentDTO[] {
        const departmentDTOs: DepartmentDTO[] = [];
        for (let i = 0; i < departments.length; i++) {
            departmentDTOs.push(this.sanitize(departments[i]));
        }
        return departmentDTOs;
    }
}
