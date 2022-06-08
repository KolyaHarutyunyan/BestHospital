import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../authN/authN.constants';
import { CreateTerminationDto } from 'src/termination/dto/create-termination.dto';
import { ParseObjectIdPipe } from '../util';
import { ClientStatus } from './client.constants';
import { ClientService } from './client.service';
import { ClientDTO, CreateClientDTO, UpdateClientDto, ClientQueryDTO } from './dto';

@Controller('client')
@ApiTags('Client Endpoints')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
  /** Create a new client */
  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  create(@Body() createClientDto: CreateClientDTO) {
    return this.clientService.create(createClientDto);
  }
  /**Get All Clients */
  @Get()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: [ClientDTO] })
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
    type: ClientQueryDTO,
  })
  findAll(
    @Query('skip') skip: number,
    @Query('limit') limit: number,
    @Query('status') status: string,
  ) {
    return this.clientService.findAll(skip, limit, status);
  }
  /** Get Client By Id */
  @Get(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  findById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.clientService.findById(id);
  }
  /** Update Client By Id */
  @Patch(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto, updateClientDto.user.id);
  }
  /** Delete Client By Id */
  @Delete(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: String })
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.clientService.remove(id);
  }
  @Patch(':id/active')
  @ApiOkResponse({ type: ClientDTO })
  async active(@Param('id', ParseObjectIdPipe) id: string): Promise<ClientDTO> {
    return await this.clientService.active(id);
  }
  @Patch(':id/inActive')
  @ApiOkResponse({ type: ClientDTO })
  async inActive(@Param('id', ParseObjectIdPipe) id: string): Promise<ClientDTO> {
    return await this.clientService.inActive(id);
  }
  @Patch(':id/hold')
  @ApiOkResponse({ type: ClientDTO })
  async hold(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: CreateTerminationDto,
  ): Promise<ClientDTO> {
    return await this.clientService.hold(id, dto);
  }
  @Patch(':id/terminate')
  @ApiOkResponse({ type: ClientDTO })
  async terminate(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: CreateTerminationDto,
  ): Promise<ClientDTO> {
    return await this.clientService.terminate(id, dto);
  }
}
