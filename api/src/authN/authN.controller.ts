import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Headers,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ParseObjectIdPipe, Public } from '../util';
import {
  ACCESS_TOKEN,
  apiSummaries,
  REGISTRATION_TOKEN,
  RESET_TOKEN,
} from './authN.constants';
import { AuthNService } from './authN.service';
import {
  ChangePassDTO,
  PassChangedDTO,
  ResetPassDTO,
  SigninDTO,
  AuthDTO,
  AuthResponseDTO,
} from './dto';
import { ResetPassGuard, RegistrationGuard } from './guards';
import { AuthZGuard, PermissionList } from '../authZ';

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
  async completeRegistration(
    @Body() resetPassDTO: ResetPassDTO,
  ): Promise<AuthDTO> {
    const auth: AuthDTO = await this.authNService.completeRegistration(
      resetPassDTO,
    );
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
  async changePassword(
    @Body() changePassDTO: ChangePassDTO,
  ): Promise<PassChangedDTO> {
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

  /** Inactivate the user */
  @Patch(':userId/inactivate')
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: String, description: 'Id of the user inactivated' })
  @UseGuards(new AuthZGuard([PermissionList.MANAGE_ADMINS.code]))
  async inactivateUser(@Param('userId') userId: string): Promise<string> {
    const id = await this.authNService.inactivate(userId);
    return id;
  }

  /** Inactivate the user */
  @Patch(':userId/activate')
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: String, description: 'Id of the user activated' })
  async activateUser(@Param('userId') userId: string): Promise<string> {
    const id = await this.authNService.activate(userId);
    return id;
  }

  /** Add roles to user */
  @Patch(':userId/addRole')
  @Public()
  async addRole(
    @Param('userId') userId: string,
    @Body('roleId') roleId: string,
  ): Promise<AuthResponseDTO> {
    const auth = await this.authNService.addRole(userId, roleId);
    return auth;
  }

  /** Remove roles to user */
  @Patch(':userId/removeRole')
  @Public()
  async removeRole(
    @Param('userId') userId: string,
    @Body('roleId') roleId: string,
  ): Promise<AuthResponseDTO> {
    const auth = await this.authNService.removeRole(userId, roleId);
    return auth;
  }

  /** Get User Auth */
  @Get(':userId')
  @Public()
  async getUserAuth(
    @Param('userId', ParseObjectIdPipe) userId: string,
    // @Body('userId') userId: string, //TURN ON WHEN TOKENS ARE CONNECTED
  ): Promise<AuthResponseDTO> {
    const auth = await this.authNService.getAuth(userId);
    return auth;
  }

  /** Logout a user */
  @Post('logout')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: String, description: 'invalidated token' })
  async logout(@Body('userId') userId: string): Promise<string> {
    const invalidatedToken = await this.authNService.logout(userId);
    return invalidatedToken;
  }
}
