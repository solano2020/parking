import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from '@Reservation/dto/create-reservation.dto';
import { UpdateReservationDto } from '@Reservation/dto/update-reservation.dto';
import { PrismaService } from '@Prisma/prisma.service';
import { ReservationDto } from '@Reservation/dto/reservation.dto';
import { VehicleService } from '@Vehicle/services/vehicle.service';
import { LocationService } from '@Location/services/location.service';

@Injectable()
export class ReservationService {

  constructor(private readonly prismaService: PrismaService, 
    private readonly vehicleService: VehicleService,
    private readonly locationService: LocationService){}

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

  async findAll(): Promise<ReservationDto[]> {
    try {
      return await this.prismaService.reservation.findMany({
        include: {
          location: false,
          vehicle: false
        }
      })
    } catch (error) {
      throw new BadRequestException('Error finding reservations');
    }
  }

  // private async verifyLocationAndVehicle(locationId: number, vehicleId: number){
  //   this.locationService.findOne(locationId);
  //   this.vehicleService.findOne(vehicleId);
  // }

  async findOne(id: number):Promise<ReservationDto>  {
    try {
      return await this.prismaService.reservation.findUniqueOrThrow({
        include: {
          location: false,
          vehicle: false
        },  
        where: {id}
      });
    } catch (error) {
      throw new NotFoundException(`Error reservation with ${id} not found`);
    }
  }

  async update(id: number, request: UpdateReservationDto):Promise<ReservationDto> {
    await this.findOne(id);
    try {
      return await this.prismaService.reservation.update({
        where: {id},
        data: request
      }); 
    } catch (error) {
      throw new BadRequestException(`Error update reservation with ${id}`)
    }
  }

  async remove(id: number):Promise<ReservationDto> {
    await this.findOne(id);
    try {
      return await this.prismaService.reservation.delete({
        where: {id}
      })
    } catch (error) {
      throw new BadRequestException(`Error delete reservation with ${id}`)
    }
  }
}
