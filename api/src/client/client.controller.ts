import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateTerminationDto } from 'src/termination/dto/create-termination.dto';
import { ParseObjectIdPipe, Public } from '../util';
import { ClientStatus } from './client.constants';
import { ClientService } from './client.service';
import {
  ClientDTO,
  CreateClientDTO, UpdateClientDto, ClientQueryDTO
} from './dto';

@Controller('client')
@ApiTags('Client Endpoints')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }
  /** Create a new client */
  @Post()
  @Public()
  create(@Body() createClientDto: CreateClientDTO) {
    return this.clientService.create(createClientDto);
  }
  /**Get All Clients */
  @Get()
  @Public()
  @ApiOkResponse({ type: [ClientDTO] })
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
    type: ClientQueryDTO
  })
  findAll(
    @Query('skip') skip: number,
    @Query('limit') limit: number,
    @Query('status') status: string) {
    return this.clientService.findAll(skip, limit, status);
  }
  /** Get Client By Id */
  @Get(':id')
  @Public()
  findById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.clientService.findById(id);
  }
  /** Update Client By Id */
  @Patch(':id')
  @Public()
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }
  /** Delete Client By Id */
  @Delete(':id')
  @Public()
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.clientService.remove(id);
  }

  /** Inactivate a client */
  @Patch(':id/setStatus')
  @Public()
  @ApiQuery({ name: 'status', enum: ClientStatus })
  @ApiOkResponse({ type: ClientDTO })
  async setStatus(
    @Param('id', ParseObjectIdPipe) clientId: string,
    @Body() dto: CreateTerminationDto,
    @Query() status: ClientQueryDTO
  ): Promise<ClientDTO> {
    const staff = await this.clientService.setStatus(
      clientId,
      status.status,
      dto
    );
    return staff;
  }
}
