import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FundingService } from './funding.service';
import { HistoryService } from '../history/history.service';

import { CreateFundingDTO, FundingDTO, UpdateFundingDto, ServiceDTO, UpdateServiceDto, CreateServiceDTO, FundingQueryDTO } from './dto';
import { Public, ParseObjectIdPipe } from '../util';
import { CreateTerminationDto } from 'src/termination/dto/create-termination.dto';

@Controller('funding')
@ApiTags('Funding Endpoints')
export class FundingController {
  constructor(
    private readonly fundingService: FundingService,
    private readonly historyService: HistoryService,
  ) { }

  /** Create a new funder */
  @Post()
  @ApiHeader({ name: 'Access-Token', description: 'Access-Token' })
  @ApiOkResponse({ type: FundingDTO })
  async create(@Body() createFundingDTO: CreateFundingDTO): Promise<FundingDTO> {
    return await this.fundingService.create(createFundingDTO);
  }

  /** Create a new service */
  @Post(':id/service')
  @ApiHeader({ name: 'Access-Token', description: 'Access-Token' })
  @ApiOkResponse({ type: ServiceDTO })
  async createService(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() createServiceDTO: CreateServiceDTO): Promise<ServiceDTO> {
    const staffId = '60f01ec194abb63ff8f0aa75';
    const service = await this.fundingService.createService(createServiceDTO, id);
    return service
  }

  /** Create a new modifier */
  // @Post('/modifier')
  // @Public()
  // @ApiOkResponse({ type: ServiceDTO })
  // async createModifier(
  //   @Body() createModifierDTO: CreateModifiersDTO): Promise<ModifyDTO> {
  //   const staffId = '60f01ec194abb63ff8f0aa75';
  //   const modifier = await this.fundingService.createModifier(createModifierDTO);
  //   return modifier
  // }

  /** Get all funders */
  @Get()
  @ApiHeader({ name: 'Access-Token', description: 'Access-Token' })
  @ApiOkResponse({ type: [FundingDTO] })
  @ApiQuery({
    name: "skip",
    description: "where",
    required: false,
    type: Number
  })
  @ApiQuery({
    name: "limit",
    description: "how",
    required: false,
    type: Number
  })
  @ApiQuery({
    name: "status",
    description: "status",
    required: false,
    type: FundingQueryDTO
  })
  async findAll(
    @Query('skip') skip: number,
    @Query('limit') limit: number,
    @Query('status') status: string): Promise<FundingDTO[]> {
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
  async findService(@Param('serviceId', ParseObjectIdPipe) serviceId: string): Promise<ServiceDTO[]> {
    return await this.fundingService.findService(serviceId);
  }

  /** Get Funder By Id */
  @Get(':id')
  @ApiHeader({ name: 'Access-Token', description: 'Access-Token' })
  @ApiOkResponse({ type: FundingDTO })
  async findById(@Param('id', ParseObjectIdPipe) id: string): Promise<FundingDTO> {
    return await this.fundingService.findById(id);
  }

  /** Get Modifier By funding Service Id */
  // @Get('modifier/:fundingserviceId')
  // @Public()
  // @ApiOkResponse({ type: FundingDTO })
  // async findmodifier(@Param('fundingserviceId', ParseObjectIdPipe) fundingserviceId: string): Promise<FundingDTO> {
  //   return await this.fundingService.findmodifier(fundingserviceId);
  // }

  /** Edit the Funder */
  @Patch(':id')
  @ApiHeader({ name: 'Access-Token', description: 'Access-Token' })
  @ApiOkResponse({ type: FundingDTO })
  async update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateFundingDto: UpdateFundingDto): Promise<FundingDTO> {
    const staffId = '60f01ec194abb63ff8f0aa75';
    const funder = await this.fundingService.update(id, updateFundingDto);
    return funder;
  }

  /** Edit the Service */
  @Patch('/service/:serviceId')
  @ApiHeader({ name: 'Access-Token', description: 'Access-Token' })
  @ApiOkResponse({ type: ServiceDTO })
  async updateService(
    @Param('serviceId', ParseObjectIdPipe) serviceId: string,
    @Body() updateServiceDto: UpdateServiceDto): Promise<ServiceDTO> {
    const staffId = '60f01ec194abb63ff8f0aa75';
    const service = await this.fundingService.updateService(serviceId, updateServiceDto);
    return service
  }

  /** Edit the Modifier */
  // @Patch(':modifyId/modifier')
  // @Public()
  // // @ApiOkResponse({ type: FundingDTO })
  // async updateModify(@Param('modifyId', ParseObjectIdPipe) modifyId: string, @Body() updateModifierDto: UpdateModifierDto): Promise<any> {
  //   const staffId = '60f01ec194abb63ff8f0aa75';
  //   const modifier = await this.fundingService.updateModifier(modifyId, updateModifierDto);
  //   return modifier;
  // }

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
    @Query() status: FundingQueryDTO
  ): Promise<FundingDTO> {
    const funder = await this.fundingService.setStatus(
      funderId,
      status.status,
      dto
    );
    return funder;
  }
 /** Inactivate a client */
//  @Patch(':id/setStatus')
//  @Public()
//  @ApiQuery({ name: 'status', enum: ClientStatus })
//  @ApiOkResponse({ type: ClientDTO })
//  async inactivate(
//    @Param('id', ParseObjectIdPipe) clientId: string,
//    @Body() dto: CreateTerminationDto,
//    @Query() status: ClientQueryDTO
//  ): Promise<ClientDTO> {
//    const staff = await this.clientService.setStatus(
//      clientId,
//      status.status,
//      dto
//    );
//    return staff;
//  }
  /** Activated a funder */
  // @Patch(':id/activate')
  // @Public()
  // @ApiOkResponse({ type: FundingDTO })
  // async activate(
  //   @Param('id', ParseObjectIdPipe) funderId: string,
  // ): Promise<FundingDTO> {
  //   const funder = await this.fundingService.setStatusActive(
  //     funderId,
  //     1,
  //   );
  //   return funder;
  // }
}
