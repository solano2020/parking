import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import { VehicleDto } from '../dto/vehicle.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VehicleService {

  constructor(private readonly prismaService: PrismaService, private configService: ConfigService){
  }

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
    console.log("config.name: "+this.configService.get<string>('config.name'));
    try {
      return await this.prismaService.vehicle.findMany();
    } catch (error) {
      throw new BadRequestException('Error finding directions')
    }
  }

  async findOne(id: number): Promise<VehicleDto> {
    try {
      return await this.prismaService.vehicle.findUniqueOrThrow({
        where: {id}
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
      return await this.prismaService.vehicle.delete({
          where: {id}
      });
    } catch (error) {
      throw new BadRequestException(`Error delete vehicle with ${id}`)
    }
  }
}
