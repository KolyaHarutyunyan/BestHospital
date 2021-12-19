import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IRequest, ParseObjectIdPipe } from '../util';
import { ACCESS_TOKEN } from '../authN';
import { MergeClaims } from './claim.constants';
import { ClaimService } from './claim.service';
import { ClaimDto, CreateClaimDto, UpdateClaimDto, GenerateClaimDto } from './dto';
import { ClaimStatus } from './claim.constants';

@Controller('claim')
@ApiTags('Claim Endpoints')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) { }

  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  create(@Body() createClaimDto: CreateClaimDto) {
    return this.claimService.create(createClaimDto);
  }

  @Post('generate')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiQuery({ name: 'group', enum: MergeClaims })
  generateClaims(@Body() generateClaims: GenerateClaimDto,
    @Query('group') group: MergeClaims
  ) {
    return this.claimService.generateClaims(generateClaims, group);
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

  /** Set claim status */
  @Patch(':id/setStatus')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiQuery({ name: 'status', enum: ClaimStatus })
  @ApiQuery({ name: 'details', required: false })
  async setStatus(
    @Param('id', ParseObjectIdPipe) claimId: string,
    @Request() req: IRequest,
    @Query('status') status: ClaimStatus,
    @Query('details') details: string,
  ) {
    const userId: string = req.body.user.id;
    const billing = await this.claimService.setStatus(
      claimId,
      status,
      userId,
      details
    );
    return billing;
  }
}
