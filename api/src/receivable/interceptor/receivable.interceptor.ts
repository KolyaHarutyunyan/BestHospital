import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { ReceivableDto } from '../dto';
import { IReceivable } from '../interface';

@Injectable()
export class ReceivableSanitizer implements ISanitize {
    sanitize(receivable: IReceivable): ReceivableDto {
        const receivableDTO: ReceivableDto = {
            _id: receivable.id,
            placeService: receivable.placeService,
            cptCode: receivable.cptCode,
            totalUnits: receivable.totalUnits,
            totalBill: receivable.totalBill,
            renderProvider: receivable.renderProvider,
            dateOfService: receivable.dateOfService,
            bills: receivable.bills
        };
        return receivableDTO;
    }

    sanitizeMany(receivables: IReceivable[]): ReceivableDto[] {
        const receivableDTOs: ReceivableDto[] = [];
        for (let i = 0; i < receivables.length; i++) {
            receivableDTOs.push(this.sanitize(receivables[i]));
        }
        return receivableDTOs;
    }
}
