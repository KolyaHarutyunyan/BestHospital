import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe, Public } from '../util';
import { ClientService } from './client.service';
import { CreateClientDTO, UpdateClientDto, CreateContactDTO, ContactDTO, EnrollmentDTO,
   CreateEnrollmentDTO, UpdateEnrollmentDto, UpdateContactDto, AuthorizationDTO, CreateAuthorizationDTO, CreateAuthorizationServiceDTO } from './dto';

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
  findAll() {
    return this.clientService.findAll();
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

  /** Delete Client By Id */
  @Delete(':id')
  @Public()
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.clientService.remove(id);
  }

  /** Create a new enrollment */
  @Post(':id/funder/:funderId/enrollment')
  @Public()
  createEnrollment(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('funderId', ParseObjectIdPipe) funderId: string,
    @Body() createEnrollmentDTO: CreateEnrollmentDTO) {
    return this.clientService.createEnrollment(createEnrollmentDTO, id, funderId);
  }

  /**Get All Enrollment */
  @Get(':id/enrollment')
  @Public()
  findAllEnrollment(
    @Param('id', ParseObjectIdPipe) id: string) {
    return this.clientService.findAllEnrollment(id);
  }

  /** Update Enrollment By Id */
  @Patch(':id/enrollment/:enrollmentId')
  @Public()
  updateEnrollment(@Param('id', ParseObjectIdPipe) id: string, @Param('enrollmentId', ParseObjectIdPipe) enrollmentId: string, @Body() updateEnrollmentDto: UpdateEnrollmentDto) {
    return this.clientService.updateEnrollment(id, enrollmentId, updateEnrollmentDto);
  }

  /** Delete Enrollment By Id */
  @Delete('enrollment/:enrollmentId')
  @Public()
  removeEnrollment(@Param('enrollmentId', ParseObjectIdPipe) enrollmentId: string) {
    return this.clientService.removeEnrollment(enrollmentId);
  }

  /** Create a new contact */
  @Post(':id/contact')
  @Public()
  createContact(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() createContactDTO: CreateContactDTO) {
    return this.clientService.createContact(createContactDTO, id);
  }

  /**Get All Contacts */
  @Get(':id/contacts')
  @Public()
  findAllContacts(
    @Param('id', ParseObjectIdPipe) id: string) {
    return this.clientService.findAllContacts(id);
  }
  /**Get Contact By Id */
  @Get('contact/:contactId')
  @Public()
  findContact(
    @Param('contactId', ParseObjectIdPipe) contactId: string) {
    return this.clientService.findContact(contactId);
  }

  /** Update Contact By Id */
  @Patch('contact/:contactId')
  @Public()
  updateContact(@Param('contactId', ParseObjectIdPipe) contactId: string,
    @Body() updateContactDto: UpdateContactDto) {
    return this.clientService.updateContact(contactId, updateContactDto);
  }

  /** Delete Contact By Id */
  @Delete('contact/:contactId')
  @Public()
  removeContact(@Param('contactId', ParseObjectIdPipe) contactId: string) {
    return this.clientService.removeContact(contactId);
  }












    /** Create a new authorization */
    @Post(':id/funder/:funderId/authorization')
    @Public()
    createAuthorization(
      @Param('id', ParseObjectIdPipe) id: string,
      @Param('funderId', ParseObjectIdPipe) funderId: string,
      @Body() createAuthorizationDTO: CreateAuthorizationDTO) {
      return this.clientService.createAuthorization(id, funderId, createAuthorizationDTO);
    }

    /** Create a new authorization service */
    @Post(':id/fundingService/:fundingServiceId/authorization/service')
    @Public()
    createAuthorizationService(
      @Param('id', ParseObjectIdPipe) id: string,
      @Param('fundingServiceId', ParseObjectIdPipe) fundingServiceId: string,
      @Body() createAuthorizationServiceDTO: CreateAuthorizationServiceDTO) {
      return this.clientService.createAuthorizationService(id, fundingServiceId, createAuthorizationServiceDTO);
    }
    // /**Get All Contacts */
    // @Get(':id/contacts')
    // @Public()
    // findAllAuthorization(
    //   @Param('id', ParseObjectIdPipe) id: string) {
    //   return this.clientService.findAllAuthorization(id);
    // }
    // /**Get Contact By Id */
    // @Get('contact/:contactId')
    // @Public()
    // findContact(
    //   @Param('contactId', ParseObjectIdPipe) contactId: string) {
    //   return this.clientService.findContact(contactId);
    // }
  
    // /** Update Contact By Id */
    // @Patch('contact/:contactId')
    // @Public()
    // updateContact(@Param('contactId', ParseObjectIdPipe) contactId: string,
    //   @Body() updateContactDto: UpdateContactDto) {
    //   return this.clientService.updateContact(contactId, updateContactDto);
    // }
  
    // /** Delete Contact By Id */
    // @Delete('contact/:contactId')
    // @Public()
    // removeContact(@Param('contactId', ParseObjectIdPipe) contactId: string) {
    //   return this.clientService.removeContact(contactId);
    // }
}
