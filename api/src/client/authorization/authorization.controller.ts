import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public, ParseObjectIdPipe } from '../../util';
import { AuthorizationService } from './authorization.service';
import { AuthorizationDTO, CreateAuthorizationDTO, UpdateAuthorizationDTO } from './dto';

@Controller('authorization')
@ApiTags('Authorization Endpoints')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  /** Create a new authorization */
  @Post('client/:clientId/funder/:funderId')
  @Public()
  @ApiOkResponse({ type: AuthorizationDTO })
  create(
    @Param('clientId', ParseObjectIdPipe) clientId: string,
    @Param('funderId', ParseObjectIdPipe) funderId: string,
    @Body() createAuthorizationDTO: CreateAuthorizationDTO,
  ) {
    return this.authorizationService.create(clientId, funderId, createAuthorizationDTO);
  }

  @Get(':client/:clientId')
  @ApiOkResponse({ type: AuthorizationDTO })
  @Public()
  findAll(@Param('clientId', ParseObjectIdPipe) clientId: string) {
    return this.authorizationService.findAll(clientId);
  }

  @Patch(':id')
  @Public()
  @ApiOkResponse({ type: AuthorizationDTO })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateAuthorizationserviceDto: UpdateAuthorizationDTO,
  ) {
    return this.authorizationService.update(id, updateAuthorizationserviceDto);
  }
  @Delete(':id')
  @ApiOkResponse({ type: String })
  @Public()
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.authorizationService.remove(id);
  }
}
