import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateTerminationDto } from 'src/termination/dto/create-termination.dto';
import { ParseObjectIdPipe, Public } from '../util';
import { ClientService } from './client.service';
import {
  ClientDTO,
  CreateClientDTO, UpdateClientDto
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
    type: Number
  })
  findAll(
    @Query('skip') skip: number,
    @Query('status') status: number,
    @Query('limit') limit: number,) {
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
  @Patch(':id/inactivate')
  @Public()
  @ApiOkResponse({ type: ClientDTO })
  async inactivate(
    @Param('id', ParseObjectIdPipe) clientId: string,
    @Body() dto: CreateTerminationDto,
  ): Promise<ClientDTO> {
    const staff = await this.clientService.setStatusInactive(
      clientId,
      0,
      dto
    );
    return staff;
  }

  /** Activated a funder */
  @Patch(':id/activate')
  @Public()
  @ApiOkResponse({ type: ClientDTO })
  async activate(
    @Param('id', ParseObjectIdPipe) clientId: string,
  ): Promise<ClientDTO> {
    const client = await this.clientService.setStatusActive(
      clientId,
      1,
    );
    return client;
  }

}
