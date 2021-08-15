import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe, Public } from '../../util';
import { AuthorizationserviceService } from './authorizationservice.service';
import { AuthorizationServiceDTO, CreateAuthorizationServiceDTO, UpdateAuthorizationserviceDTO } from './dto';

@Controller('authorizationservice')
@ApiTags('Authorization Service Endpoints')
export class AuthorizationserviceController {
  constructor(private readonly authorizationserviceService: AuthorizationserviceService) {}

  @Post('authorization/:authorizationId/fundingService/:fundingServiceId')
  @Public()
  @ApiOkResponse({type: AuthorizationServiceDTO})
  create(
    @Param('authorizationId', ParseObjectIdPipe) authorizationId: string,
    @Param('fundingServiceId', ParseObjectIdPipe) fundingServiceId: string,
    @Body() createAuthorizationserviceDto: CreateAuthorizationServiceDTO) {
    return this.authorizationserviceService.create(authorizationId, fundingServiceId, createAuthorizationserviceDto);
  }
  /** Create a new authorization service */
  // @Post(':id/fundingService/:fundingServiceId/authorization/service')
  // @Public()
  // createAuthorizationService(
  //   @Param('id', ParseObjectIdPipe) id: string,
  //   @Param('fundingServiceId', ParseObjectIdPipe) fundingServiceId: string,
  //   @Body() createAuthorizationServiceDTO: CreateAuthorizationServiceDTO) {
  //   return this.clientService.createAuthorizationService(id, fundingServiceId, createAuthorizationServiceDTO);
  // }
  @Get('authorization/:authorizationId')
  @ApiOkResponse({type: AuthorizationServiceDTO})
  @Public()
  findAll(@Param('authorizationId', ParseObjectIdPipe) authorizationId: string) {
    return this.authorizationserviceService.findAll(authorizationId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authorizationserviceService.findOne(+id);
  // }

  @Patch(':id')
  @Public()
  @ApiOkResponse({type: AuthorizationServiceDTO})
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateAuthorizationserviceDto: UpdateAuthorizationserviceDTO) {
    return this.authorizationserviceService.update(id, updateAuthorizationserviceDto);
  }

  @Delete(':id')
  @Public()
  @ApiOkResponse({type: String})
  remove(@Param('id',ParseObjectIdPipe) id: string) {
    return this.authorizationserviceService.remove(id);
  }
}
