import { Module } from '@nestjs/common';
import { ReservationController } from './controllers/reservation.controller';
import { ReservationService } from './services/reservation.service';
import { VehicleService } from '../vehicle/services/vehicle.service';
import { LocationService } from '../location/services/location.service';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService, VehicleService, LocationService],
})
export class ReservationModule {}
