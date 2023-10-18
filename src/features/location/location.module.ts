import { Module } from '@nestjs/common';
import { LocationController } from '@Location/controllers/location.controller';
import { LocationService } from '@Location/services/location.service';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService]
})
export class LocationModule {}
