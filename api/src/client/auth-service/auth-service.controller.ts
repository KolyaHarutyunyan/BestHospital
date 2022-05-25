import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../../authN/authN.constants';
import { ParseObjectIdPipe } from '../../util';
import { AuthService } from './auth-service.service';
import { AuthServiceDTO, CreateAuthServiceDTO, UpdateAuthServiceDTO } from './dto';

@Controller('authservice')
@ApiTags('Authorization Service Endpoints')
export class AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/:authId/fundingService/:fundingServiceId')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: AuthServiceDTO })
  create(
    @Param('authId', ParseObjectIdPipe) authId: string,
    @Param('fundingServiceId', ParseObjectIdPipe) fundingServiceId: string,
    @Body() createAuthserviceDto: CreateAuthServiceDTO,
  ) {
    return this.authService.create(authId, fundingServiceId, createAuthserviceDto);
  }

  @Post('auth/:authId/fundingService/:fundingServiceId/checkModifiers')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: AuthServiceDTO })
  checkModifiers(
    @Param('authId', ParseObjectIdPipe) authId: string,
    @Param('fundingServiceId', ParseObjectIdPipe) fundingServiceId: string,
  ) {
    return this.authService.checkModifiers(authId, fundingServiceId);
  }

  @Get('auth/:authId')
  @ApiOkResponse({ type: AuthServiceDTO })
  @ApiHeader({ name: ACCESS_TOKEN })
  findAll(@Param('authId', ParseObjectIdPipe) authId: string) {
    return this.authService.findAll(authId);
  }

  @Get('auth/:authIds')
  @ApiOkResponse({ type: AuthServiceDTO })
  @ApiHeader({ name: ACCESS_TOKEN })
  findAllByAuthorizations(@Param('authIds') authIds: Array<string>) {
    return this.authService.findAllByAuthorizations(authIds);
  }

  @Patch(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: AuthServiceDTO })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateAuthServiceDto: UpdateAuthServiceDTO,
  ) {
    return this.authService.update(id, updateAuthServiceDto);
  }

  @Delete(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: String })
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.authService.remove(id);
  }
}
