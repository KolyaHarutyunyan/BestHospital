import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AvailableTypeDTO {
    @ApiProperty()
    @IsNotEmpty()
    from: number;
    @ApiProperty()
    to: number;
    @ApiProperty()
    available: boolean;
}

export class AvailabilityDTO {
    @ApiProperty({ type: [AvailableTypeDTO] })
    monday: Array<AvailableTypeDTO>
    @ApiProperty({ type: [AvailableTypeDTO] })
    tuesday: Array<AvailableTypeDTO>
    @ApiProperty({ type: [AvailableTypeDTO] })
    wednesday: Array<AvailableTypeDTO>
    @ApiProperty({ type: [AvailableTypeDTO] })
    thursday: Array<AvailableTypeDTO>
    @ApiProperty({ type: [AvailableTypeDTO] })
    friday: Array<AvailableTypeDTO>
    @ApiProperty({ type: [AvailableTypeDTO] })
    saturday: Array<AvailableTypeDTO>
    @ApiProperty({ type: [AvailableTypeDTO] })
    sunday: Array<AvailableTypeDTO>
}