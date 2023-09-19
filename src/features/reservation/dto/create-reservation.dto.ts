import { ApiProperty } from "@nestjs/swagger";
import { reservation } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReservationDto implements Partial<reservation>{
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    external_key: string;
    
    @ApiProperty()
    @IsDate()
    @Transform(({value}) => new Date(value))
    start_time: Date;

    @ApiProperty()
    @IsDate()
    @Transform(({value}) => new Date(value))
    end_time: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    space_number: string;

    @ApiProperty()
    @IsBoolean()
    @Transform(({ value }) => {
        if (["true", "1"].includes(value)) return true;
        if (["false", "0"].includes(value)) return false;
        return value;
    })
    active: boolean;

    @ApiProperty()
    @Transform(({value}) => parseInt(value))
    @IsNotEmpty()
    @IsNumber()
    locationId: number;

    @ApiProperty()
    @Transform(({value}) => parseInt(value))
    @IsNotEmpty()
    @IsNumber()
    vehicleId: number;
}
