import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe, Public } from '../../util';
import { SCredentialService } from './scredential.service';
import { SCredentialDTO, SCreateCredentialDTO, SUpdateCredentialDTO } from './dto';

@Controller('scredential')
@ApiTags('Staff Credential Endpoints')
export class SCredentialController {
  constructor(private readonly credentialService: SCredentialService) { }

  /** Create a new staff credential */
  @Post()
  @ApiOkResponse({ type: SCredentialDTO })
  @Public()
  async createStaffCredential(
    @Body() dto: SCreateCredentialDTO,
  ): Promise<SCredentialDTO> {
    const credential = await this.credentialService.create(dto);
    return credential;
  }

  /** Edit a scredential */
  @Patch(':id')
  @Public()
  @ApiOkResponse({ type: SCredentialDTO })
  async edit(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: SUpdateCredentialDTO,
  ): Promise<SCredentialDTO> {
    const credential = await this.credentialService.edit(id, dto);
    return credential;
  }

  //  /** Delete a credential */
  @Delete(':id')
  @Public()
  @ApiOkResponse({ type: 'string' })
  async delete(
    @Param('id', ParseObjectIdPipe) id: string
  ): Promise<string> {
    const credential = await this.credentialService.delete(id);
    return credential;
  }

  /** Get the credential profile */
  @Get('staff/:staffId/credential')
  @ApiOkResponse({ type: [SCredentialDTO] })
  @Public()
  async find(
    @Param('staffId', ParseObjectIdPipe) staffId: string,
  ): Promise<SCredentialDTO[]> {
    return await this.credentialService.find(staffId);
  }

  /** Get the credential profile By Id */
  @Get(':id')
  @ApiOkResponse({ type: SCredentialDTO })
  @Public()
  async findById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<SCredentialDTO> {
    return await this.credentialService.findById(id);
  }
}
