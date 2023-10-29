import { NotFoundException } from "@nestjs/common";

export class VehicleNotFoundException extends NotFoundException{
    constructor(vehicleId: number){
        super(`Error vehicle with ${vehicleId}, not found`);
    }
}