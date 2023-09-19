import { ApiProperty } from "@nestjs/swagger";
import { vehicle } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateVehicleDto implements Partial<vehicle>{
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    plate_number: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    plate_state: string;
}
