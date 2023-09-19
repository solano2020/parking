import { Global, Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { LocationModule } from './features/location/location.module';
import { VehicleModule } from './features/vehicle/vehicle.module';

@Module({
  imports: [SharedModule, LocationModule, VehicleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}