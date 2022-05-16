import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { InvoiceDto } from '../dto';
import { IInvoice } from '../interface';

@Injectable()
export class InvoiceSanitizer implements ISanitize {
  sanitize(invoice: IInvoice): InvoiceDto {
    const invoiceDTO: InvoiceDto = {
      _id: invoice._id,
      client: invoice.client,
      dateRange: invoice.dateRange,
      invoiceTotal: invoice.invoiceTotal,
      ammountPaid: invoice.ammountPaid,
      totalBilled: invoice.totalBilled,
      totalTime: invoice.totalTime,
      dueDate: invoice.dueDate,
      downloadLink: invoice.downloadLink,
      status: invoice.status,
      receivable: invoice.receivable,
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
