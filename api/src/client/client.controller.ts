import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParseObjectIdPipe, Public } from '../util';
import { ClientService } from './client.service';
import { CreateClientDTO, UpdateClientDto, CreateContactDTO, ContactDTO, EnrollmentDTO, CreateEnrollmentDTO, UpdateEnrollmentDto } from './dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  /** Create a new client */
  @Post()
  @Public()
  create(@Body() createClientDto: CreateClientDTO) {
    return this.clientService.create(createClientDto);
  }

  /** Create a new contact */
  @Post(':id/contact')
  @Public()
  createContact(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() createContactDTO: CreateContactDTO) {
    return this.clientService.createContact(createContactDTO, id);
  }

  /** Create a new contact */
  @Post(':id/funder/:funderId/enrollment')
  @Public()
  createEnrollment(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('funderId', ParseObjectIdPipe) funderId: string,
    @Body() createEnrollmentDTO: CreateEnrollmentDTO) {
    return this.clientService.createEnrollment(createEnrollmentDTO, id, funderId);
  }
  /**Get All Clients */
  @Get()
  @Public()
  findAll() {
    return this.clientService.findAll();
  }
  /**Get All Enrollment */
  @Get(':id/enrollment')
  @Public()
  findAllEnrollment(
    @Param('id', ParseObjectIdPipe) id: string) {
    return this.clientService.findAllEnrollment(id);
  }
  /** Get Client By Id */
  @Get(':id')
  @Public()
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.clientService.findOne(id);
  }

  /** Update Client By Id */
  @Patch(':id')
  @Public()
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }
  /** Update Enrollment By Id */
  @Patch(':id/enrollment/:enrollmentId')
  @Public()
  updateEnrollment(@Param('id', ParseObjectIdPipe) id: string, @Param('enrollmentId', ParseObjectIdPipe) enrollmentId: string, @Body() updateEnrollmentDto: UpdateEnrollmentDto) {
    return this.clientService.updateEnrollment(id, enrollmentId, updateEnrollmentDto);
  }
  
  /** Delete Client By Id */
  @Delete(':id')
  @Public()
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.clientService.remove(id);
  }
}
