import { RegistrationStatus } from '../authN.constants';

export class UserDTO {
  id: string;
  email: string;
  permissions: Set<number>;
  status: RegistrationStatus;
}
