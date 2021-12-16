import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from 'src/util';
import { ACCESS_TOKEN } from '../authN';
import { ClaimService } from './claim.service';
import { ClaimDto, CreateClaimDto, UpdateClaimDto } from './dto';

@Controller('claim')
@ApiTags('Claim Endpoints')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  create(@Body() createClaimDto: CreateClaimDto) {
    return this.claimService.create(createClaimDto);
  }

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClaimDto: UpdateClaimDto) {
    return this.claimService.update(+id, updateClaimDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.claimService.remove(+id);
  }
}
