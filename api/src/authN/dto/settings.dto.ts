import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { SessionDTO } from './session.dto';

class NotificationSettingsDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Boolean)
  allowInApp?: boolean;
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Boolean)
  allowEmail?: boolean;
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Boolean)
  allowText?: boolean;
}

export class SettingsDTO {
  @ApiProperty({ type: NotificationSettingsDTO, required: false })
  @IsOptional()
  notificaionSettings?: NotificationSettingsDTO;

  /** Set by the system */
  user?: SessionDTO;
}
