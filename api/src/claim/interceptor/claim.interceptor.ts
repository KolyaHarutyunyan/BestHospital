import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { ClaimDto } from '../dto';
import { IClaim } from '../interface';

@Injectable()
export class ClaimSanitizer implements ISanitize {
    sanitize(claim: IClaim): ClaimDto {
        const claimDTO: ClaimDto = {
            _id: claim._id,
            client: claim.client,
            staff: claim.staff,
            funder: claim.funder,
            totalCharge: claim.totalCharge,
            ammountPaid: claim.ammountPaid,
            submittedDate: claim.submittedDate,
            paymentRef: claim.paymentRef,
            link: claim.link,
            date: claim.date,
            status: claim.status,
            createdDate: claim.createdDate,
            receivable: claim.receivable,
            details: claim.details
        };
        return claimDTO;
    }

    sanitizeMany(claims: IClaim[]): ClaimDto[] {
        const claimDTOs: ClaimDto[] = [];
        for (let i = 0; i < claims.length; i++) {
            claimDTOs.push(this.sanitize(claims[i]));
        }
        return claimDTOs;
    }
}
