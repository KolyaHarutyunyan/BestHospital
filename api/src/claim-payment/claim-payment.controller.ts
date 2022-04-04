import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClaimPaymentService } from './claim-payment.service';
import { CreateClaimPaymentDto } from './dto/create-claim-payment.dto';
import { UpdateClaimPaymentDto } from './dto/update-claim-payment.dto';

@Controller('claim-payment')
export class ClaimPaymentController {
  constructor(private readonly claimPaymentService: ClaimPaymentService) {}

  @Post()
  create(@Body() createClaimPaymentDto: CreateClaimPaymentDto) {
    return this.claimPaymentService.create(createClaimPaymentDto);
  }

  @Get()
  findAll() {
    return this.claimPaymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.claimPaymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClaimPaymentDto: UpdateClaimPaymentDto) {
    return this.claimPaymentService.update(+id, updateClaimPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.claimPaymentService.remove(+id);
  }
}
