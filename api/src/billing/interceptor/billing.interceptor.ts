import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { BillingDto } from '../dto';
import { AddressSanitizer } from '../../address';
import { IBilling } from '../interface/billing.interface';

@Injectable()
export class BillingSanitizer implements ISanitize {
  constructor(private readonly addressSanitizer: AddressSanitizer) {}

  sanitize(billing: IBilling): BillingDto {
    const billingDTO: BillingDto = {
      _id: billing.id,
      appointment: billing.appointment,
      client: billing.client,
      staff: billing.staff,
      authorization: billing.authorization,
      authService: billing.authService,
      placeService: billing.placeService,
      totalHours: billing.totalHours,
      totalUnits: billing.totalUnits,
      dateOfService: billing.dateOfService,
      billedAmount: billing.billedAmount,
      payerTotal: billing.payerTotal,
      payerPaid: billing.payerPaid,
      clientResp: billing.clientResp,
      clientPaid: billing.clientPaid,
      balance: billing.balance,
      claimStatus: billing.claimStatus,
      invoiceStatus: billing.invoiceStatus,
      status: billing.status,
      location: billing.location,
      // transaction: billing.transaction,
      createdDate: billing.createdDate,
      updatedDate: billing.updatedDate
    };
    return billingDTO;
  }

  sanitizeMany(billings: IBilling[]): BillingDto[] {
    const billingDTOs: BillingDto[] = [];
    for (let i = 0; i < billings.length; i++) {
        billingDTOs.push(this.sanitize(billings[i]));
    }
    return billingDTOs;
  }
}
