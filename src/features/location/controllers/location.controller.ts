import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocationService } from '../services/location.service';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LocationDto } from '../dto/location.dto';

@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiCreatedResponse({type : LocationDto})
  async create(@Body() createLocationDto: CreateLocationDto): Promise<LocationDto> {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  @ApiOkResponse({type : [LocationDto]})
  async findAll():Promise<LocationDto[]> {
    return this.locationService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({type : LocationDto})
  findOne(@Param('id') id: string): Promise<LocationDto> {
    return this.locationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({type : LocationDto})
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto): Promise<LocationDto> {
    return this.locationService.update(+id, updateLocationDto);
  }

  @Delete(':id')
  @ApiOkResponse({type : LocationDto})
  remove(@Param('id') id: string): Promise<LocationDto>  {
    return this.locationService.remove(+id);
  }
}
