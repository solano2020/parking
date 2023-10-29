import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { VehicleNotFoundException }  from '@Vehicle/exceptions/VehicleNotFoundException';
import {Request, Response} from "express";

@Catch(VehicleNotFoundException)
export class VehicleNotFoundFilter implements ExceptionFilter {
   
    catch(exception: VehicleNotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        
        response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        customCode: 'VEHICLE_NOT_FOUND',
        message: exception.message,
        path: request.url,
      });
    }

}