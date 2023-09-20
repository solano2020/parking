import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservationService } from '../services/reservation.service';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReservationDto } from '../dto/reservation.dto';

@ApiTags('reservation')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiCreatedResponse({type : ReservationDto})
  async create(@Body() createReservationDto: CreateReservationDto):Promise<ReservationDto> {
    return this.reservationService.create(createReservationDto);
  }

  @Get()
  @ApiOkResponse({type : [ReservationDto]})
  async findAll(): Promise<ReservationDto[]> {
    return this.reservationService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({type : ReservationDto})
  async findOne(@Param('id') id: string):Promise<ReservationDto> {
    return this.reservationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  @ApiOkResponse({type : ReservationDto})
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}
