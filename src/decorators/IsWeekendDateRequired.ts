import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import moment from 'moment';

export function IsWeekendDateRequired(property: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
        name: 'isWeekendDateRequired',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
            validate(value: any, args: ValidationArguments) {
            if (!value) return false; // required
            const date = moment(value, 'YYYY-MM-DD');
            const isWeekend = date.day() === 0 || date.day() === 6;
            return !isWeekend; // fail validation if weekend
            },
            defaultMessage(args: ValidationArguments) {
            return `${args.property} is required when the date is a weekend (Saturday or Sunday).`;
            },
        },
        });
    };
}
