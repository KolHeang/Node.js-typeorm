import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsStartDateBeforeEndDate(property: string, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
        name: 'isStartDateBeforeEndDate',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [property],
        validator: {
            validate(value: any, args: ValidationArguments) {
            const [relatedPropertyName] = args.constraints;
            const relatedValue = (args.object as any)[relatedPropertyName];
            if (!value || !relatedValue) return true; // skip if one is undefined/null
            return new Date(value) <= new Date(relatedValue);
            },
            defaultMessage(args: ValidationArguments) {
            return `${args.property} must be before or equal to ${args.constraints[0]}`;
            },
        },
        });
    };
}
