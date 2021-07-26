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
  AuthResponseDTO,
  ChangePassDTO,
  ResetPassDTO,
  SigninDTO,
} from './dto';
import { AuthNSanitizer } from './interceptor';
import { IAuth, IToken } from './interface';
import * as jwt from 'jsonwebtoken';
import { MailerService, MailStatus } from '../mailer';
import { IRole, RoleDTO, RoleService } from '../authZ/role';
import { MongooseUtil } from 'src/util';

@Injectable()
export class AuthNService {
  constructor(
    private readonly roleService: RoleService,
    private readonly mailerService: MailerService,
    private readonly sanitizer: AuthNSanitizer,
  ) {
    this.model = AuthnModel;
    this.mongooseUtil = new MongooseUtil();
    this.sessionExpiration = '24h';
  }
  private model: Model<IAuth>;
  private mongooseUtil: MongooseUtil;
  private readonly sessionExpiration: string;

  /** Create a new auth */
  create = async (id: string, email: string): Promise<MailStatus> => {
    try {
      const auth = await new this.model({
        _id: id,
        email: email,
        roles: [],
        status: RegistrationStatus.PENDING,
        session: false,
      }).save();
      const regToken = await this.generateToken(auth, JWT_SECRET_REGISTER);
      this.mailerService.sendInviteMail(auth.email, regToken);
      return;
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'User already exists');
      throw e;
    }
  };

  /** Sends a new invitation email to the user */
  resendInvite = async (userId: string) => {
    const auth = await this.model.findById(userId);
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
    this.checkActive(auth);
    const isPasswordCorrect = await auth.comparePassword(signinDTO.password);
    this.checkPassword(isPasswordCorrect);
    auth.session = await this.getSigninToken(auth);
    auth = await auth.save();
    return this.getSigninResponse(auth);
  };

  /** Verify session */
  getSession = async (authId: string, token: string): Promise<IAuth> => {
    const auth = await this.model.findById(authId);
    this.checkAuth(auth);
    this.checkActive(auth);
    this.verifySession(auth, token);
    return auth;
  };

  /**  Changing the user password **/
  changePassword = async (changePassDTO: ChangePassDTO): Promise<AuthDTO> => {
    let auth = await this.model.findOne({
      _id: changePassDTO.userId,
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
    return await this.mailerService.sendForgetPasswordMail({
      token: token,
      email: auth.email,
    });
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

  /** Get the auth in a sanitized version */
  getAuth = async (id: string): Promise<AuthResponseDTO> => {
    const auth = await this.model.findById(id).populate('roles');
    return this.sanitizer.sanitize(auth);
  };

  /** Inactivate user */
  inactivate = async (id: string): Promise<string> => {
    const auth = await this.model.findOneAndUpdate(
      { _id: id },
      { $set: { status: RegistrationStatus.INACTIVE } },
      { new: true },
    );
    this.checkAuth(auth);
    return auth._id;
  };

  /** Activate user */
  activate = async (id: string): Promise<string> => {
    const auth = await this.model.findOneAndUpdate(
      { _id: id },
      { $set: { status: RegistrationStatus.ACTIVE } },
      { new: true },
    );
    this.checkAuth(auth);
    return auth._id;
  };

  /** Add Role to user */
  addRole = async (id: string, roleId: string): Promise<AuthResponseDTO> => {
    // eslint-disable-next-line prefer-const
    let [auth, role] = await Promise.all([
      this.model.findById(id),
      this.roleService.getRole(roleId),
    ]);
    this.checkDuplicatRole(auth, role);
    auth.roles.push(roleId);
    auth = await auth.save();
    return this.sanitizer.sanitize(auth);
  };

  /** Remove Role from user */
  removeRole = async (id: string, roleId: string): Promise<AuthResponseDTO> => {
    let auth = await this.model.findById(id);
    this.checkAuth(auth);
    auth.roles = this.getNewRoles(auth, roleId);
    auth = await auth.save();
    return this.sanitizer.sanitize(auth);
  };

  /** Change the email of the auth */
  changeEmail = async (id: string, email: string): Promise<AuthResponseDTO> => {
    try {
      const auth = await this.model.findOneAndUpdate(
        { _id: id },
        { $set: { email: email } },
        { new: true },
      );
      this.checkAuth(auth);
      return this.sanitizer.sanitize(auth);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'User already exists');
      throw e;
    }
  };

  /** Removes the user token from the auth, clearing the user session */
  logout = async (id: string): Promise<string> => {
    const auth = await this.model.findOneAndUpdate(
      { _id: id },
      { $set: { session: null } },
    );
    return auth.session;
  };

  /** Private methods */
  /** Checks if the user can register or not */
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

  /** Check if the user is in an active status. if not, throw an exception */
  private checkActive(auth: IAuth) {
    if (auth.status === RegistrationStatus.PENDING) {
      throw new HttpException(
        'Check your email to activate your account',
        HttpStatus.FORBIDDEN,
      );
    }
    if (auth.status === RegistrationStatus.INACTIVE) {
      throw new HttpException(
        'Your account has been inactivated, contact an administrator.',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  /** Checks if the token is the same as the session in the auth object */
  private verifySession(auth: IAuth, token: string) {
    if (auth.session != token) {
      throw new HttpException(
        'session is invalid, sign in again',
        HttpStatus.UNAUTHORIZED,
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

  /** checkDuplicateRole */
  private checkDuplicatRole(auth: IAuth, role: RoleDTO) {
    if (!role) {
      throw new HttpException(
        'Such role does not exist',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const roles = auth.roles;
    const roleId = role.id;
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].toString() == roleId) {
        console.log(roles[i], roleId);
        throw new HttpException(
          'This user already has this role',
          HttpStatus.CONFLICT,
        );
      }
    }
  }

  /** Creates new roles based on the provided one, but excludes the one matching the second parameter */
  private getNewRoles(auth: IAuth, roleId: string): string[] {
    if (auth.roles) {
      const roles = auth.roles;
      const newRoles: string[] = [];
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].toString() != roleId) {
          newRoles.push(roles[i]);
        }
      }
      return newRoles;
    }
    throw new HttpException(
      'This user does not have roles',
      HttpStatus.NO_CONTENT,
    );
  }
}