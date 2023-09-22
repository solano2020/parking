import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ReservationController } from './controllers/reservation.controller';
import { ReservationService } from './services/reservation.service';
import { VehicleService } from '../vehicle/services/vehicle.service';
import { LocationService } from '../location/services/location.service';
import { ReservationValidationMiddleware } from './middlewares/reservation-validation/reservation-validation.middleware';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService, VehicleService, LocationService],
})
export class ReservationModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(ReservationValidationMiddleware).forRoutes(ReservationController);
  }
}
