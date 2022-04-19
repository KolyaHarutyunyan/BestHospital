import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../authN/authN.constants';
import { ClaimPmtService } from './claim-pmt.service';
import { CreateClaimPmtDto } from './dto/create-claim-pmt.dto';
import { UpdateClaimPmtDto } from './dto/update-claim-payment.dto';

@Controller('claim-pmt')
export class ClaimPmtController {
  constructor(private readonly claimPmtService: ClaimPmtService) {}

  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  create(@Body() createClaimPmtDto: CreateClaimPmtDto) {
    return this.claimPmtService.create(createClaimPmtDto);
  }

  @Get()
  findAll() {
    return this.claimPmtService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.claimPmtService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClaimPmtDto: UpdateClaimPmtDto) {
    return this.claimPmtService.update(id, updateClaimPmtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.claimPmtService.remove(+id);
  }
}
