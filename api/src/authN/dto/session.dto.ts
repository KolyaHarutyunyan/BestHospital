import { RegistrationStatus, UserType } from '../authN.constants';
import { SettingsDTO } from './settings.dto';

export class SessionDTO {
  id: string;
  email: string;
  permissions: Set<number>;
  type: UserType;
  status: RegistrationStatus;
  settings?: SettingsDTO;
  phoneNumber?: string;
}
