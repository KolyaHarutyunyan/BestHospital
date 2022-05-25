import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public, ParseObjectIdPipe } from '../../util';
import { AuthorizationService } from './auth.service';
import { AuthDTO, CreateAuthDTO, UpdateAuthDTO } from './dto';

@Controller('auth')
@ApiTags('Authorization Endpoints')
export class AuthController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  /** Create a new authorization */
  @Post('client/:clientId/funder/:funderId')
  @Public()
  @ApiOkResponse({ type: AuthDTO })
  create(
    @Param('clientId', ParseObjectIdPipe) clientId: string,
    @Param('funderId', ParseObjectIdPipe) funderId: string,
    @Body() dto: CreateAuthDTO,
  ) {
    return this.authorizationService.create(clientId, funderId, dto);
  }

  @Get(':client/:clientId')
  @ApiOkResponse({ type: AuthDTO })
  @Public()
  findAll(@Param('clientId', ParseObjectIdPipe) clientId: string) {
    return this.authorizationService.findAll(clientId);
  }

  @Patch(':id')
  @Public()
  @ApiOkResponse({ type: AuthDTO })
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() dto: UpdateAuthDTO) {
    return this.authorizationService.update(id, dto);
  }
  @Delete(':id')
  @ApiOkResponse({ type: String })
  @Public()
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.authorizationService.remove(id);
  }
}
