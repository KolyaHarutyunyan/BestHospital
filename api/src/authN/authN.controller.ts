import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { MailerService } from '../mailer';
import { Public } from 'src/util/decorators';
import {
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
  SignedInDTO,
  AuthDTO,
} from './dto';
import { AuthNGuard, ResetPassGuard, RegistrationGuard } from './guards';

@Controller('authn')
@ApiTags('Authentication')
export class AuthNController {
  constructor(
    private readonly authNService: AuthNService,
    private readonly mailerService: MailerService,
  ) {}

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
  @ApiParam({ name: 'userId' })
  @ApiOperation({ summary: apiSummaries.RESEND_INVITE })
  async resentInvite(@Param('id') userId: string) {
    await this.authNService.resendInvite(userId);
    return;
  }

  /** ChangePassword */
  @Post('changePassword')
  @ApiBody({ type: ChangePassDTO })
  @ApiOkResponse({ type: PassChangedDTO })
  async changePassword(
    @Body() changePassDTO: ChangePassDTO,
  ): Promise<PassChangedDTO> {
    const auth = await this.authNService.changePassword(changePassDTO);
    return new PassChangedDTO(auth.token);
  }

  /** Forgot Password */
  @Get('forgotPassword/:email')
  @ApiOperation({ summary: apiSummaries.FORGOT_PASSWORD })
  async forgotPassword(@Param('email') email: string) {
    const emailOptions = await this.authNService.forgotPassword(email);
    await this.mailerService.sendForgetPasswordMail(emailOptions);
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
}
