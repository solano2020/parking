import { ApiProperty } from "@nestjs/swagger";
import { location } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateLocationDto implements Partial<location>{
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    state: string;

    @ApiProperty()
    @Transform(({value}) => parseInt(value))
    @IsNumber()
    zip_code: number;
}
