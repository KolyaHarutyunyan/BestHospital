import { RegistrationStatus, UserType } from '../authN.constants';

export class UserDTO {
  id: string;
  email: string;
  permissions: Set<number>;
  type: UserType;
  status: RegistrationStatus;
}
