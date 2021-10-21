import { ApiProperty } from "@nestjs/swagger";
import { StaffDTO } from "../../staff/dto";
import { ClientDTO } from "../../client/dto";
import { PayCodeDTO } from "../../employment/paycode/dto";

import { EventStatus } from "../appointment.constants";
import { AuthorizationServiceDTO } from "../../client/authorizationservice/dto";

export class AppointmentDto {
    @ApiProperty()
    id: string;
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
    @ApiProperty({ enum: EventStatus })
    status: string;
}
