import { ApiProperty } from "@nestjs/swagger";
import { StaffDTO } from "../../staff/dto";
import { ClientDTO } from "../../client/dto";
import { PayCodeDTO } from "../../employment/paycode/dto";

import { AppointmentType, EventStatus } from "../appointment.constants";
import { AuthorizationServiceDTO } from "../../client/authorizationservice/dto";
import { IsEnum } from "class-validator";

export class AppointmentDto {
    @ApiProperty()
    id: string;
    @ApiProperty({ enum: AppointmentType })
    type: string;
    @ApiProperty()
    client: ClientDTO;
    @ApiProperty()
    authorizedService: AuthorizationServiceDTO;
    @ApiProperty()
    staff: StaffDTO;
    @ApiProperty()
    staffPayCode: PayCodeDTO;
    @ApiProperty()
    startDate: Date;
    @ApiProperty()
    startTime: Date;
    @ApiProperty()
    endTime: Date;
    @ApiProperty({ type: Boolean })
    require: boolean;
    @ApiProperty({ enum: EventStatus })
    status: string;
    @ApiProperty({ required: false })
    miles?: number;
}

export class AppointmentQueryDTO {
    @ApiProperty({ enum: EventStatus })
    @IsEnum(EventStatus)
    status: string;
    @ApiProperty({ enum: AppointmentType })
    @IsEnum(AppointmentType)
    type: string;
}