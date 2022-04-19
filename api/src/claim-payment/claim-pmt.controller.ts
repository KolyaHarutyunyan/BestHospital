import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiHeader, ApiOkResponse } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '../util';
import { ACCESS_TOKEN } from '../authN/authN.constants';
import { ClaimPmtService } from './claim-pmt.service';
import { ClaimPmtDto } from './dto/claim-pmt.dto.';
import { CreateClaimPmtDto } from './dto/create-claim-pmt.dto';
import { UpdateClaimPmtDto } from './dto/update-claim-payment.dto';

@Controller('claim-pmt')
export class ClaimPmtController {
  constructor(private readonly claimPmtService: ClaimPmtService) {}
  /** create claim-pmts payment */
  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: ClaimPmtDto })
  create(@Body() createClaimPmtDto: CreateClaimPmtDto) {
    return this.claimPmtService.create(createClaimPmtDto);
  }
  /** get all claim-pmts */
  @Get()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: [ClaimPmtDto] })
  findAll() {
    return this.claimPmtService.findAll();
  }
  /** get claim-pmt by id */
  @Get(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: ClaimPmtDto })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.claimPmtService.findOne(id);
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
