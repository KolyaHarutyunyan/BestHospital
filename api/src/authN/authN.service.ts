import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  JWT_SECRET_FORGET_PASS,
  JWT_SECRET_REGISTER,
  JWT_SECRET_SIGNIN,
  RegistrationStatus,
} from './authN.constants';
import { AuthnModel } from './authN.model';
import {
  AuthDTO,
  ChangePassDTO,
  CreateAuthDTO,
  ResetPassDTO,
  SigninDTO,
} from './dto';
import { Sanitizer } from './interceptor';
import { IAuth, IToken } from './interface';
import * as jwt from 'jsonwebtoken';
import { MailerService, MailStatus } from '../mailer';
import { RoleService } from 'src/authZ/role';

@Injectable()
export class AuthNService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly roleService: RoleService,
  ) {
    this.sanitizer = new Sanitizer();
    this.model = AuthnModel;
    this.sessionExpiration = '24h';
  }
  private model: Model<IAuth>;
  private readonly sanitizer: Sanitizer;
  private readonly sessionExpiration: string;

  /** Create a new auth */
  create = async (createAuthDTO: CreateAuthDTO): Promise<MailStatus> => {
    let auth = await this.model.findOne({ email: createAuthDTO.email });
    this.checkNotAuth(auth);
    auth = new this.model({
      _id: createAuthDTO.id,
      email: createAuthDTO.email,
      roles: [createAuthDTO.role],
      status: RegistrationStatus.PENDING,
      session: false,
    });
    auth = await auth.save();
    const regToken = await this.generateToken(auth, JWT_SECRET_REGISTER);
    const result = await this.mailerService.sendInviteMail(
      auth.email,
      regToken,
    );
    return result;
  };

  /** Sends a new invitation email to the user */
  resendInvite = async (userId: string) => {
    const auth = await this.model.findById(userId);
    this.checkAuth(auth);
    const regToken = await this.generateToken(auth, JWT_SECRET_REGISTER);
    await this.mailerService.sendInviteMail(auth.email, regToken);
  };

  /** Complete registration */
  completeRegistration = async (
    resetPassDTO: ResetPassDTO,
  ): Promise<AuthDTO> => {
    let auth = await this.model.findById(resetPassDTO.userId);
    this.canRegister(auth);
    this.confirmPassword(resetPassDTO.newPassword, resetPassDTO.confirmation);
    auth.password = resetPassDTO.newPassword;
    auth.status = RegistrationStatus.ACTIVE;
    auth.session = await this.getSigninToken(auth);
    auth = await auth.save();
    return this.getSigninResponse(auth);
  };

  /** Signing in the user */
  signin = async (signinDTO: SigninDTO): Promise<AuthDTO> => {
    let auth = await this.model.findOne({ email: signinDTO.email });
    this.checkAuth(auth);
    const isPasswordCorrect = await auth.comparePassword(signinDTO.password);
    this.checkPassword(isPasswordCorrect);
    auth.session = await this.getSigninToken(auth);
    auth = await auth.save();
    return this.getSigninResponse(auth);
  };

  /**  Changing the user password **/
  changePassword = async (changePassDTO: ChangePassDTO): Promise<AuthDTO> => {
    let auth = await this.model.findOne({
      _id: changePassDTO.auth._id,
    });
    const isPasswordCorrect = await auth.comparePassword(
      changePassDTO.password,
    );
    this.checkPassword(isPasswordCorrect);
    this.confirmPassword(changePassDTO.newPassword, changePassDTO.confirmation);
    auth.password = changePassDTO.newPassword;
    auth = await auth.save();
    return await this.getSigninResponse(auth);
  };

  /** Forgot password. sends a link with a token to the users email to reset password*/
  forgotPassword = async (email: string) => {
    const auth = await this.model.findOne({ email });
    this.checkAuth(auth);
    const minutesToExpire = Math.floor(Date.now() / 1000) + 60 * 30; // 30 minutes to expire
    const expString = minutesToExpire.toString();
    const token = await this.generateToken(
      auth,
      JWT_SECRET_FORGET_PASS,
      expString,
    );
    return {
      token: token,
      email: auth.email,
    };
  };

  /** Resets users password */
  resetPassword = async (resetPassDTO: ResetPassDTO): Promise<AuthDTO> => {
    let auth = await this.model.findOne({ _id: resetPassDTO.userId });
    this.checkAuth(auth);
    auth.password = resetPassDTO.newPassword;
    auth = await auth.save();
    return this.getSigninResponse(auth);
  };

  /** find the auth object using its id */
  findById = async (id: string): Promise<IAuth> => {
    return this.model.findById(id);
  };

  /** Private methods */

  private canRegister(auth: IAuth) {
    if (!auth) {
      throw new HttpException('profile not found', HttpStatus.NOT_FOUND);
    }
    if (auth.status !== RegistrationStatus.PENDING) {
      throw new HttpException(
        'This profile is not eligable for registration completion at this time',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  /** If the auth exits, throws already exits exception */
  private checkNotAuth(auth: IAuth) {
    if (auth) {
      throw new HttpException(
        'A user with this email exists',
        HttpStatus.FOUND,
      );
    }
  }

  /** If auth does not exits, throws not found exception */
  private checkAuth(auth: IAuth) {
    if (!auth) {
      throw new HttpException(
        'User with this email was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  /** generates the response for signed in users */
  private async getSigninResponse(auth: IAuth): Promise<AuthDTO> {
    const permissionCodeSet = await this.roleService.getUserPermissionSet(
      auth.roles,
    );
    const permissionCodes = Array.from(permissionCodeSet);
    return { token: auth.session, permissions: permissionCodes };
  }

  /** Generates a token using an IAuth object */
  private async generateToken(
    auth: IAuth,
    secret: string,
    expiration?: string,
  ): Promise<string> {
    const tokenEntity: IToken = {
      email: auth.email,
      id: auth.id,
    };
    if (expiration) {
      return await jwt.sign(tokenEntity, secret, { expiresIn: expiration });
    } else {
      return await jwt.sign(tokenEntity, secret);
    }
  }

  /** Check the password and throw http exception if incorrect */
  private checkPassword = (isCorrect) => {
    if (!isCorrect) {
      throw new HttpException(
        'user password does not match',
        HttpStatus.FORBIDDEN,
      );
    }
  };

  /** Confirms whether the newPassword and the confirmation are matching */
  private confirmPassword = (newPass, confirmation) => {
    if (newPass !== confirmation) {
      throw new HttpException(
        'The new password does not match with the confirmation',
        HttpStatus.CONFLICT,
      );
    }
  };

  /** Generate Sign in token */
  private getSigninToken(auth: IAuth): Promise<string> {
    return this.generateToken(auth, JWT_SECRET_SIGNIN);
  }
}
