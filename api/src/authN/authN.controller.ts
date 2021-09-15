import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe, Public } from '../util';
import { ACCESS_TOKEN, apiSummaries, REGISTRATION_TOKEN, RESET_TOKEN } from './authN.constants';
import { AuthNService } from './authN.service';
import {
  ChangePassDTO,
  PassChangedDTO,
  ResetPassDTO,
  SigninDTO,
  AuthDTO,
  AuthResponseDTO,
  UserDTO,
} from './dto';
import { ResetPassGuard, RegistrationGuard } from './guards';
// import { AuthZGuard, PermissionList } from '../authZ';

@Controller('authn')
@ApiTags('Authentication')
export class AuthNController {
  constructor(private readonly authNService: AuthNService) {}

  /** Complete Registration */
  @Post()
  @ApiHeader({ name: REGISTRATION_TOKEN })
  @Public()
  @ApiOperation({ summary: apiSummaries.REGISTRATION })
  @ApiBody({ type: ResetPassDTO })
  @ApiOkResponse({ type: AuthDTO })
  @UseGuards(new RegistrationGuard())
  async completeRegistration(@Body() resetPassDTO: ResetPassDTO): Promise<AuthDTO> {
    const auth: AuthDTO = await this.authNService.completeRegistration(resetPassDTO);
    return auth;
  }

  /** Signin User */
  @Post('signin')
  @Public()
  @ApiBody({ type: SigninDTO })
  @ApiOkResponse({ type: AuthDTO })
  async signin(@Body() signinDTO: SigninDTO): Promise<AuthDTO> {
    const auth = await this.authNService.signin(signinDTO);
    return auth;
  }

  /** Resends the invitation link to the user*/
  @Post(':id/resendInvite')
  @Public()
  @ApiOperation({ summary: apiSummaries.RESEND_INVITE })
  async resentInvite(@Param('id') userId: string) {
    await this.authNService.resendInvite(userId);
    return;
  }

  /** ChangePassword */
  @Post('changePassword')
  @ApiBody({ type: ChangePassDTO })
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: PassChangedDTO })
  async changePassword(@Body() changePassDTO: ChangePassDTO): Promise<PassChangedDTO> {
    console.log(changePassDTO);
    const auth = await this.authNService.changePassword(changePassDTO);
    return new PassChangedDTO(auth.token);
  }

  /** Forgot Password */
  @Get('forgotPassword/:email')
  @Public()
  @ApiOperation({ summary: apiSummaries.FORGOT_PASSWORD })
  async forgotPassword(@Param('email') email: string) {
    await this.authNService.forgotPassword(email);
    return;
  }

  /** Reseting the password */
  @Post('resetPassword')
  @ApiBody({ type: ResetPassDTO })
  @ApiHeader({ name: RESET_TOKEN })
  @ApiOkResponse({ type: AuthDTO })
  @UseGuards(new ResetPassGuard())
  async resetPassword(@Body() resetPassDTO: ResetPassDTO): Promise<AuthDTO> {
    const auth = await this.authNService.resetPassword(resetPassDTO);
    return auth;
  }

  /** Add roles to user */
  @Patch(':userId/:roleId/addRole')
  @Public()
  @ApiOkResponse({ type: AuthResponseDTO })
  async addRole(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
    @Body('user') user: UserDTO,
  ): Promise<AuthResponseDTO> {
    const auth = await this.authNService.addRole(userId, roleId, user);
    return auth;
  }

  /** Remove roles to user */
  @Patch(':userId/:roleId/removeRole')
  @Public()
  @ApiOkResponse({ type: AuthResponseDTO })
  async removeRole(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
    @Body('user') user: UserDTO,
  ): Promise<AuthResponseDTO> {
    const auth = await this.authNService.removeRole(userId, roleId, user);
    return auth;
  }

  /** The user can get their own auth with their access-token */
  @Get('myAuth')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: AuthResponseDTO })
  async getMyAuth(@Body('user') user: UserDTO): Promise<AuthResponseDTO> {
    const auth = await this.authNService.getAuth(user.id);
    return auth;
  }

  /** Get User Auth */
  @Get(':userId')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: AuthResponseDTO })
  async getUserAuth(
    @Param('userId', ParseObjectIdPipe) userId: string,
    @Body('user') user: UserDTO,
  ): Promise<AuthResponseDTO> {
    const auth = await this.authNService.getAuth(userId, user);
    return auth;
  }

  /** Logout a user */
  @Post('logout')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: String, description: 'invalidated token' })
  @Public()
  async logout(@Body('userId') userId: string): Promise<string> {
    const invalidatedToken = await this.authNService.logout(userId);
    return invalidatedToken;
  }
}
