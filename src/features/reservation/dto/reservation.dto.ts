import { ApiProperty } from "@nestjs/swagger";
import { reservation } from "@prisma/client";

export class ReservationDto implements reservation{
    @ApiProperty()
    id: number;

    @ApiProperty()
    external_key: string;

    @ApiProperty()
    start_time: Date;

    @ApiProperty()
    end_time: Date;

    @ApiProperty()
    space_number: string;

    @ApiProperty()
    active: boolean;

    @ApiProperty()
    locationId: number;

    @ApiProperty()
    vehicleId: number;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    update_at: Date;

    @ApiProperty()
    delete_at: Date;

}