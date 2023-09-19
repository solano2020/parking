import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehicleService } from '../services/vehicle.service';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { VehicleDto } from '../dto/vehicle.dto';

@ApiTags('vehicle')
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @ApiCreatedResponse({type : VehicleDto})
  async create(@Body() createVehicleDto: CreateVehicleDto): Promise<VehicleDto> {
    return this.vehicleService.create(createVehicleDto);
  }

  @Get()
  @ApiOkResponse({type: [VehicleDto]})
  async findAll():Promise<VehicleDto[]> {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({type : VehicleDto})
  async findOne(@Param('id') id: string): Promise<VehicleDto> {
    return this.vehicleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({type : VehicleDto})
  async update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto): Promise<VehicleDto> {
    return this.vehicleService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  @ApiOkResponse({type : VehicleDto})
 remove(@Param('id') id: string): Promise<VehicleDto> {
    return this.vehicleService.remove(+id);
  }
}
