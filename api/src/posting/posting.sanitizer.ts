import { Injectable } from '@nestjs/common';
import { ISanitize } from '../util';
import { PostingDto } from './dto';
import { IPosting } from './interface/posting.interface';

@Injectable()
export class PostingSanitizer implements ISanitize {
  sanitize(posting: IPosting): PostingDto {
    const postingDTO: PostingDto = {
      _id: posting._id,
      paymentType: posting.paymentType,
      paymentReference: posting.paymentReference,
      paymentAmount: posting.paymentAmount,
      payer: posting.payer,
      invoice: posting.invoice,
      paymentDate: posting.paymentDate,
      transaction: posting.transaction,
      documents: posting.documents,
    };
    return postingDTO;
  }

  sanitizeMany(postings: IPosting[]): PostingDto[] {
    const postingDTOs: PostingDto[] = [];
    for (let i = 0; i < postings.length; i++) {
      postingDTOs.push(this.sanitize(postings[i]));
    }
    return postingDTOs;
  }
}
