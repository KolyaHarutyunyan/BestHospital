import { Injectable } from '@nestjs/common';
import { CreateClaimPaymentDto } from './dto';
import { UpdateClaimPaymentDto } from './dto/update-claim-payment.dto';

@Injectable()
export class ClaimPaymentService {
  /** create claim payment */
  async create(dto: CreateClaimPaymentDto) {
    return 'This action adds a new claimPayment';
  }

  findAll() {
    return `This action returns all claimPayment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} claimPayment`;
  }

  update(id: number, updateClaimPaymentDto: UpdateClaimPaymentDto) {
    return `This action updates a #${id} claimPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} claimPayment`;
  }
}
