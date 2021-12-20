import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { InvoiceDto } from '../dto';
import { IInvoice } from '../interface';

@Injectable()
export class InvoiceSanitizer implements ISanitize {
    sanitize(claim: IInvoice): InvoiceDto {
        const invoiceDTO: InvoiceDto = {
            // _id: claim.id,
            // client: claim.client,
            // staff: claim.staff,
            // funder: claim.funder,
            // totalCharge: claim.totalCharge,
            // ammountPaid: claim.ammountPaid,
            // submittedDate: claim.submittedDate,
            // paymentRef: claim.paymentRef,
            // link: claim.link,
            // date: claim.date,
            // status: claim.status,
            // createdDate: claim.createdDate,
            // receivable: claim.receivable,
            // details: claim.details
        };
        return invoiceDTO;
    }

    sanitizeMany(invoices: IInvoice[]): InvoiceDto[] {
        const invoiceDTOs: InvoiceDto[] = [];
        for (let i = 0; i < invoices.length; i++) {
            invoiceDTOs.push(this.sanitize(invoices[i]));
        }
        return invoiceDTOs;
    }
}