import { Module } from '@nestjs/common';
import { LocationController } from './controllers/location.controller';
import { LocationService } from './services/location.service';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
