import { ApiProperty } from "@nestjs/swagger";
import { location } from "@prisma/client";

export class LocationDto implements location{
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    state: string;

    @ApiProperty()
    zip_code: number;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    update_at: Date;

    @ApiProperty()
    delete_at: Date;

}