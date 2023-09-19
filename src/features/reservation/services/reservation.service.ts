import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import { ReservationDto } from '../dto/reservation.dto';

@Injectable()
export class ReservationService {

  constructor(private readonly prismaService: PrismaService){}

  async create(request: CreateReservationDto):Promise<ReservationDto> {
    const { locationId, vehicleId, ...reservationRequest } = request;

    try {
      return await this.prismaService.reservation.create({
        data: {
          ...reservationRequest, 
          location: {connect : { id: locationId}},
          vehicle: { connect: { id: vehicleId } },
        }
      })
    } catch (error) {
      throw new BadRequestException('Error creating reservation');
    }
  }

  findAll() {
    return `This action returns all reservation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
