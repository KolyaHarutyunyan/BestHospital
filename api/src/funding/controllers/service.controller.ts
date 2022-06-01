import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ServiceDTO } from '../dto';
import { ACCESS_TOKEN } from '../../authN';
import { ParseObjectIdPipe } from '../../util';
import { CreateServiceDTO, UpdateServiceDto } from '../dto';
import { Service } from '../services/service';

@Controller('funding')
@ApiHeader({ name: ACCESS_TOKEN })
@ApiTags('Funding Service Endpoints')
export class ServiceController {
  constructor(private readonly fundingService: Service) {}
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
  /** Get all services */
  @Get(':id/service')
  @ApiOkResponse({ type: [ServiceDTO] })
  async findAllServices(@Param('id', ParseObjectIdPipe) id: string): Promise<ServiceDTO[]> {
    return await this.fundingService.findAllServices(id);
  }
  /** Get service by Id */
  @Get('service/:serviceId')
  @ApiOkResponse({ type: [ServiceDTO] })
  async findService(
    @Param('serviceId', ParseObjectIdPipe) serviceId: string,
  ): Promise<ServiceDTO[]> {
    return await this.fundingService.findService(serviceId);
  }
  /** Edit the Service */
  @Patch('/service/:serviceId')
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
}
