import { NotFoundException } from "@nestjs/common";

export class LocationNotFoundException extends NotFoundException{
    constructor(locationId: number){
        super(`Error location with ${locationId}, not found`);
    }
}