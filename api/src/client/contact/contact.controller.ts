import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe, Public } from '../../util';
import { ContactService } from './contact.service';
import { CreateContactDTO, UpdateContactDTO, ContactDTO } from './dto';

@Controller('contact')
@ApiTags('Contact Endpoints')
export class ContactController {
  constructor(private readonly contactService: ContactService) { }

  /** Create a new contact */
  @Post('client/:clientId')
  @Public()
  @ApiOkResponse({type: ContactDTO})
  createContact(
    @Param('clientId', ParseObjectIdPipe) clientId: string,
    @Body() createContactDTO: CreateContactDTO) {
    return this.contactService.create(createContactDTO, clientId);
  }
  /**Get All Contacts */
  @Get('client/:clientId')
  @Public()
  @ApiOkResponse({type: [ContactDTO]})
  findAllContacts(
    @Param('clientId', ParseObjectIdPipe) clientId: string) {
    return this.contactService.findAllContacts(clientId);
  }
  /**Get Contact By Id */
  @Get(':id')
  @Public()
  @ApiOkResponse({type: ContactDTO})
  findContact(
    @Param('id', ParseObjectIdPipe) id: string) {
    return this.contactService.findContact(id);
  }

  /** Update Contact By Id */
  @Patch(':id')
  @Public()
  @ApiOkResponse({type: ContactDTO})
  updateContact(@Param('id', ParseObjectIdPipe) id: string,
    @Body() updateContactDto: UpdateContactDTO) {
    return this.contactService.updateContact(id, updateContactDto);
  }

  /** Delete Contact By Id */
  @Delete(':id')
  @Public()
  @ApiOkResponse({type: String})
  removeContact(@Param('id', ParseObjectIdPipe) id: string) {
    return this.contactService.removeContact(id);
  }

}
