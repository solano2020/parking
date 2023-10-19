import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';

import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

@ValidatorConstraint({ async : true})
export class IsUtcDateConstraint implements ValidatorConstraintInterface{

    validate(date: Date | string, args?: ValidationArguments): boolean | Promise<boolean> {
       const currentDate = dayjs(date);
       return currentDate.isValid() && currentDate.utc().isUTC();
    }

    defaultMessage?(args?: ValidationArguments): string {
        return `${args.property}: Formato de fecha no permitida`;
    }
}

export function IsUtcDate(validationOptions?: ValidationOptions){
    return function (object: Object, propertyName: string) {
        registerDecorator({
          target: object.constructor,
          propertyName: propertyName,
          options: validationOptions,
          constraints: [],
          validator: IsUtcDateConstraint,
        });
      };
}