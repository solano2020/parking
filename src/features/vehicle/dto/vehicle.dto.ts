import { ApiProperty } from "@nestjs/swagger";
import { vehicle } from "@prisma/client";

export class VehicleDto implements vehicle{
    @ApiProperty()
    id: number;
    
    @ApiProperty()
    plate_number: string;

    @ApiProperty()
    plate_state: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    update_at: Date;

    @ApiProperty()
    delete_at: Date;

}