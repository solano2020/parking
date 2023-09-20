import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import { LocationDto } from '../dto/location.dto';
import { location } from '@prisma/client';

@Injectable()
export class LocationService {

  constructor(private readonly prismaService: PrismaService){ }

  async create(request: CreateLocationDto): Promise<LocationDto>{
    try {
      return await this.prismaService.location.create({
        data : request
      });
    } catch (error) {
      throw new BadRequestException('Error creating location');
    }
  }

  async findAll():Promise<LocationDto[]> {
    try{
      return await this.prismaService.location.findMany({
        where: {delete_at: null}
      });
    }catch(error){
      throw new BadRequestException('Error finding locations');
    }
  }

  async findOne(id: number): Promise<LocationDto> {
    try {
      return await this.prismaService.location.findUniqueOrThrow({
        where: {id, delete_at: null},
      });
    } catch (error) {
      throw new NotFoundException(`Error location with ${id} not found`);
    }
  }

  async update(id: number, request: UpdateLocationDto): Promise<LocationDto> {
    await this.findOne(id);
    try {
      return await this.prismaService.location.update({
        where : {id},
        data : request
      });
    } catch (error) {
      throw new BadRequestException(`Error update location with ${id}`);
    }
  }

  async remove(id: number):Promise<LocationDto> {
    await this.findOne(id)
    try {
      return await this.prismaService.location.update({
        where: {id}, 
        data: {delete_at: new Date()}
      })
    } catch (error) {
      throw new BadRequestException(`Error delete location with ${id}`)
    }
  }
}
