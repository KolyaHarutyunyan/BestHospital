import { Controller, Get, Post, Body, Patch, Param, Query, Request } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IRequest, ParseObjectIdPipe } from '../util';
import { ACCESS_TOKEN } from '../authN';
import { MergeClaims } from './claim.constants';
import { ClaimService } from './claim.service';
import { ClaimDto, GenerateClaimDto } from './dto';
import { ClaimStatus } from './claim.constants';

@Controller('claim')
@ApiTags('Claim Endpoints')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  // @Post()
  // @ApiHeader({ name: ACCESS_TOKEN })
  // @ApiOkResponse({ type: ClaimDto })
  // create(@Body() createClaimDto: CreateClaimDto) {
  //   return this.claimService.create(createClaimDto);
  // }

  @Post('generate')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiQuery({ name: 'group', enum: MergeClaims })
  @ApiOkResponse({ type: [ClaimDto] })
  generateClaims(@Body() generateClaims: GenerateClaimDto, @Query('group') group: MergeClaims) {
    return this.claimService.generateClaims(generateClaims, group);
  }
  // @Post(':id/close')
  // @ApiHeader({ name: ACCESS_TOKEN })
  // @ApiQuery({ name: 'details', required: false })
  // @ApiOkResponse({ type: [ClaimDto] })
  // closeClaim(@Param('id', ParseObjectIdPipe) id: string, @Query('details') details: string) {
  //   return this.claimService.closeClaim(id, details);
  // }

  @Get()
  @ApiHeader({ name: ACCESS_TOKEN })
  findAll() {
    return this.claimService.findAll();
  }

  @Get(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.claimService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateClaimDto: UpdateClaimDto) {
  //   return this.claimService.update(+id, updateClaimDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.claimService.remove(+id);
  // }

}
