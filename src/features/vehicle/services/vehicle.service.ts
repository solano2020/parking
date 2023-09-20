import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import { VehicleDto } from '../dto/vehicle.dto';

@Injectable()
export class VehicleService {

  constructor(private readonly prismaService: PrismaService){}

  async create(request: CreateVehicleDto):Promise<VehicleDto> {
    try{
      return await this.prismaService.vehicle.create({
        data : request
      });
    }catch(error){
      throw new BadRequestException('Error creating vehicle');
    }
  }

  async findAll():Promise<VehicleDto[]> {
    try {
      return await this.prismaService.vehicle.findMany({
        where: {delete_at: null}
      });
    } catch (error) {
      throw new BadRequestException('Error finding directions')
    }
  }

  async findOne(id: number): Promise<VehicleDto> {
    try {
      return await this.prismaService.vehicle.findUniqueOrThrow({
        where: {id, delete_at: null}
      });
    } catch (error) {
      throw new NotFoundException(`Error vehicle with ${id} not found`);
    }
  }

  async update(id: number, request: UpdateVehicleDto):Promise<VehicleDto> {
    await this.findOne(id);
    try {
      return await this.prismaService.vehicle.update({
        where : {id},
        data: request
      });
    } catch (error) {
      throw new BadRequestException(`Error update vehicle with ${id}`);
    }
  }

  async remove(id: number):Promise<VehicleDto> {
    await this.findOne(id)
    try {
      return await this.prismaService.vehicle.update({
          where: {id},
          data: {delete_at: new Date()}
      });
    } catch (error) {
      throw new BadRequestException(`Error delete vehicle with ${id}`)
    }
  }
}
