import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateTerminationDto } from 'src/termination/dto/create-termination.dto';
import { ParseObjectIdPipe } from '../util';
import {
  CreateFundingDTO, CreateServiceDTO, FundingDTO, FundingQueryDTO, ServiceDTO, UpdateFundingDto, UpdateServiceDto
} from './dto';
import { FundingService } from './funding.service';
import { CreateModifiersDTO, UpdateModifiersDto } from './modifier/dto';


@Controller('funding')
@ApiTags('Funding Endpoints')
export class FundingController {
  constructor(private readonly fundingService: FundingService) { }

  /** Create a new funder */
  @Post()
  @ApiHeader({ name: 'Access-Token', description: 'Access-Token' })
  @ApiOkResponse({ type: FundingDTO })
  async create(@Body() createFundingDTO: CreateFundingDTO): Promise<FundingDTO> {
    return await this.fundingService.create(createFundingDTO, createFundingDTO.user.id);
  }

  /** Create a new service */
  @Post(':id/service')
  @ApiHeader({ name: 'Access-Token', description: 'Access-Token' })
  @ApiOkResponse({ type: ServiceDTO })
  async createService(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() createServiceDTO: CreateServiceDTO,
  ): Promise<ServiceDTO> {
    const service = await this.fundingService.createService(
      createServiceDTO,
      id,
      createServiceDTO.user.id,
    );
    return service;
  }
  @Post(":id/modifiers")
  @ApiHeader({ name: 'Access-Token', description: 'Access-Token' })
  @ApiOkResponse({ type: ServiceDTO })
  async createModifier(@Param('id', ParseObjectIdPipe) id: string, @Body() dto: CreateModifiersDTO): Promise<ServiceDTO> {
    const modifier = await this.fundingService.saveModifiers(id, dto.serviceId, dto.modifiers);
    return modifier;
  }
  @Patch(":id/:serviceId/modifiers")
  @ApiHeader({ name: 'Access-Token', description: 'Access-Token' })
  @ApiOkResponse({ type: ServiceDTO })
  async updateModifiers(@Param('id', ParseObjectIdPipe) id: string, @Param('serviceId', ParseObjectIdPipe) serviceId: string, @Body() dto: UpdateModifiersDto): Promise<ServiceDTO> {
    const modifier = await this.fundingService.updateModifiers(id, serviceId, dto);
    return modifier;
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
  ): Promise<FundingDTO[]> {
    return await this.fundingService.findAll(skip, limit, status);
  }

  /** Get all services */
  @Get(':id/service')
  @ApiHeader({ name: 'Access-Token', description: 'Access-Token' })
  @ApiOkResponse({ type: [ServiceDTO] })
  async findAllServices(@Param('id', ParseObjectIdPipe) id: string): Promise<ServiceDTO[]> {
    return await this.fundingService.findAllServices(id);
  }
  /** Get service by Id */
  @Get('service/:serviceId')
  @ApiHeader({ name: 'Access-Token', description: 'Access-Token' })
  @ApiOkResponse({ type: [ServiceDTO] })
  async findService(
    @Param('serviceId', ParseObjectIdPipe) serviceId: string,
  ): Promise<ServiceDTO[]> {
    return await this.fundingService.findService(serviceId);
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

  /** Edit the Service */
  @Patch('/service/:serviceId')
  @ApiHeader({ name: 'Access-Token', description: 'Access-Token' })
  @ApiOkResponse({ type: ServiceDTO })
  async updateService(
    @Param('serviceId', ParseObjectIdPipe) serviceId: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ): Promise<ServiceDTO> {
    const service = await this.fundingService.updateService(
      serviceId,
      updateServiceDto,
      updateServiceDto.user.id,
    );
    return service;
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
