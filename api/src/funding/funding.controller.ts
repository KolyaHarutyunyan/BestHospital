import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateTerminationDto } from 'src/termination/dto/create-termination.dto';
import { ParseObjectIdPipe } from '../util';
import { CreateFundingDTO, FundingDTO, FundingQueryDTO, UpdateFundingDto } from './dto';
import { FundingService } from './funding.service';
import { IFunderCount } from './interface';

@Controller('funding')
@ApiTags('Funding Endpoints')
export class FundingController {
  constructor(private readonly fundingService: FundingService) {}

  /** Create a new funder */
  @Post()
  @ApiHeader({ name: 'Access-Token', description: 'Access-Token' })
  @ApiOkResponse({ type: FundingDTO })
  async create(@Body() createFundingDTO: CreateFundingDTO): Promise<FundingDTO> {
    return await this.fundingService.create(createFundingDTO, createFundingDTO.user.id);
  }
  /** Get all funders */
  @Get()
  @ApiHeader({ name: 'Access-Token', description: 'Access-Token' })
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
  @ApiHeader({ name: 'Access-Token', description: 'Access-Token' })
  @ApiOkResponse({ type: FundingDTO })
  async findById(@Param('id', ParseObjectIdPipe) id: string): Promise<FundingDTO> {
    return await this.fundingService.findById(id);
  }

  /** Edit the Funder */
  @Patch(':id')
  @ApiHeader({ name: 'Access-Token', description: 'Access-Token' })
  @ApiOkResponse({ type: FundingDTO })
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateFundingDto: UpdateFundingDto,
  ): Promise<FundingDTO> {
    const funder = await this.fundingService.update(id, updateFundingDto, updateFundingDto.user.id);
    return funder;
  }

  /** Delete the funder */
  @Delete(':id')
  @ApiHeader({ name: 'Access-Token', description: 'Access-Token' })
  @ApiOkResponse({ type: FundingDTO })
  async remove(@Param('id', ParseObjectIdPipe) id: string): Promise<FundingDTO> {
    return await this.fundingService.remove(id);
  }
  /** Inactivate a funder */
  @Patch(':id/setStatus')
  @ApiHeader({ name: 'Access-Token', description: 'Access-Token' })
  @ApiOkResponse({ type: FundingDTO })
  async setStatus(
    @Param('id', ParseObjectIdPipe) funderId: string,
    @Body() dto: CreateTerminationDto,
    @Query() status: FundingQueryDTO,
  ): Promise<FundingDTO> {
    const funder = await this.fundingService.setStatus(funderId, status.status, dto);
    return funder;
  }
}
