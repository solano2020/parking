import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { LocationNotFoundException }  from '@Location/exceptions/LocationNotFoundException';
import {Request, Response} from "express";

@Catch(LocationNotFoundException)
export class LocationNotFoundFilter implements ExceptionFilter {
   
    catch(exception: LocationNotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        
        response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        customCode: 'LOCATION_NOT_FOUND',
        message: exception.message,
        path: request.url,
      });
    }

}