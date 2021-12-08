import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../../authN/authN.constants';
import { ParseObjectIdPipe, Public } from '../../util';
import { AuthorizationserviceService } from './authorizationservice.service';
import { AuthorizationModifiersDTO, AuthorizationServiceDTO, CreateAuthorizationServiceDTO, UpdateAuthorizationserviceDTO } from './dto';

@Controller('authorizationservice')
@ApiTags('Authorization Service Endpoints')
export class AuthorizationserviceController {
  constructor(private readonly authorizationserviceService: AuthorizationserviceService) {}

  @Post('authorization/:authorizationId/fundingService/:fundingServiceId')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({type: AuthorizationServiceDTO})
  create(
    @Param('authorizationId', ParseObjectIdPipe) authorizationId: string,
    @Param('fundingServiceId', ParseObjectIdPipe) fundingServiceId: string,
    @Body() createAuthorizationserviceDto: CreateAuthorizationServiceDTO) {
    return this.authorizationserviceService.create(authorizationId, fundingServiceId, createAuthorizationserviceDto);
  }
  
  @Post('authorization/:authorizationId/fundingService/:fundingServiceId/checkModifiers')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({type: AuthorizationServiceDTO})
  checkModifiers(
    @Param('authorizationId', ParseObjectIdPipe) authorizationId: string,
    @Param('fundingServiceId', ParseObjectIdPipe) fundingServiceId: string,
    @Body() createAuthorizationserviceDto: AuthorizationModifiersDTO) {
    return this.authorizationserviceService.checkModifiers(authorizationId, fundingServiceId, createAuthorizationserviceDto);
  }

  @Get('authorization/:authorizationId')
  @ApiOkResponse({type: AuthorizationServiceDTO})
  @ApiHeader({ name: ACCESS_TOKEN })
  findAll(@Param('authorizationId', ParseObjectIdPipe) authorizationId: string) {
    return this.authorizationserviceService.findAll(authorizationId);
  }

  @Get('authorization/:authorizationIds')
  @ApiOkResponse({type: AuthorizationServiceDTO})
  @ApiHeader({ name: ACCESS_TOKEN })
  findAllByAuthorizations(@Param('authorizationIds') authorizationIds: Array<string>) {
    return this.authorizationserviceService.findAllByAuthorizations(authorizationIds);
  }
  
  @Patch(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({type: AuthorizationServiceDTO})
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateAuthorizationserviceDto: UpdateAuthorizationserviceDTO) {
    return this.authorizationserviceService.update(id, updateAuthorizationserviceDto);
  }

  @Delete(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({type: String})
  remove(@Param('id',ParseObjectIdPipe) id: string) {
    return this.authorizationserviceService.remove(id);
  }
}
