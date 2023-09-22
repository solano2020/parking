import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import {Request, Response} from 'express';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import { CreateReservationDto } from '../../dto/create-reservation.dto';
import { UpdateReservationDto } from '../../dto/update-reservation.dto';
import * as _ from 'lodash';

@Injectable()
export class ReservationValidationMiddleware implements NestMiddleware {

  constructor(private readonly prismaService: PrismaService){}
  async use(req: Request, res: Response, next: () => void) {
    if (req.method === 'POST' || req.method === 'PATCH') {
      const body: CreateReservationDto | UpdateReservationDto = req.body;
      const locationId = _.get(body, 'locationId');
      const vehicleId = _.get(body, 'vehicleId');
      try {
        if (!_.isNil(locationId)) {
          await this.prismaService.location.findUniqueOrThrow({
            where: { id: locationId },
          });
        }

        if (!_.isNil(vehicleId)) {
          await this.prismaService.vehicle.findUniqueOrThrow({
            where: { id: vehicleId },
          });
        }
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    } 
    next();
  }
}
