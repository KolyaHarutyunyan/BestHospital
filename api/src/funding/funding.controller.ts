import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../authN';
import { ParseObjectIdPipe } from '../util';
import { CreateFundingDTO, FundingDTO, FundingQueryDTO, UpdateFundingDto } from './dto';
import { FundingService } from './funding.service';
import { IFunderCount } from './interface';

@Controller('funding')
@ApiTags('Funding Endpoints')
@ApiHeader({ name: ACCESS_TOKEN })
export class FundingController {
  constructor(private readonly fundingService: FundingService) {}

  /** Create a new funder */
  @Post()
  @ApiOkResponse({ type: FundingDTO })
  async create(@Body() createFundingDTO: CreateFundingDTO): Promise<FundingDTO> {
    return await this.fundingService.create(createFundingDTO, createFundingDTO.user.id);
  }
  /** Get all funders */
  @Get()
  @ApiOkResponse({ type: [FundingDTO] })
  @ApiQuery({
    name: 'skip',
    description: 'where',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    description: 'how',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'status',
    description: 'status',
    required: false,
    type: FundingQueryDTO,
  })
  async findAll(
    @Query('skip') skip: number,
    @Query('limit') limit: number,
    @Query('status') status: string,
  ): Promise<IFunderCount> {
    return await this.fundingService.findAll(skip, limit, status);
  }

  /** Get Funder By Id */
  @Get(':id')
  @ApiOkResponse({ type: FundingDTO })
  async findById(@Param('id', ParseObjectIdPipe) id: string): Promise<FundingDTO> {
    return await this.fundingService.findById(id);
  }

  /** Edit the Funder */
  @Patch(':id')
  @ApiOkResponse({ type: FundingDTO })
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateFundingDto: UpdateFundingDto,
  ): Promise<FundingDTO> {
    const funder = await this.fundingService.update(id, updateFundingDto, updateFundingDto.user.id);
    return funder;
  }
  @Patch(':id/active')
  @ApiOkResponse({ type: FundingDTO })
  async active(@Param('id', ParseObjectIdPipe) funderId: string): Promise<FundingDTO> {
    const funder = await this.fundingService.active(funderId);
    return funder;
  }
  @Patch(':id/inActive')
  @ApiOkResponse({ type: FundingDTO })
  async inActive(@Param('id', ParseObjectIdPipe) funderId: string): Promise<FundingDTO> {
    const funder = await this.fundingService.inActive(funderId);
    return funder;
  }
}
