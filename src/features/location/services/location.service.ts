import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from '@Location/dto/create-location.dto';
import { UpdateLocationDto } from '@Location/dto/update-location.dto';
import { LocationDto } from '@Location/dto/location.dto';
import { PrismaService } from '@Prisma/prisma.service';
import { LocationNotFoundException } from '../exceptions/LocationNotFoundException';

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
      return await this.prismaService.location.findMany();
    }catch(error){
      throw new BadRequestException('Error finding locations');
    }
  }

  async findOne(id: number): Promise<LocationDto> {
    try {
      return await this.prismaService.location.findUniqueOrThrow({
        where: {id},
      });
    } catch (error) {
      throw new LocationNotFoundException(id);
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
      return await this.prismaService.location.delete({
        where: {id}
      })
    } catch (error) {
      throw new BadRequestException(`Error delete location with ${id}`)
    }
  }
}
