import { Global, Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { LocationModule } from './features/location/location.module';
import { VehicleModule } from './features/vehicle/vehicle.module';
import { ReservationModule } from './features/reservation/reservation.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./env/${process.env.ENVIRONMENT}.env`,
      isGlobal: true,
      load: [configuration],
    }), SharedModule, LocationModule, VehicleModule, ReservationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
