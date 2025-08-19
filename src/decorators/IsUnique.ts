import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from "class-validator";
import { AppDataSource } from "../config/database"; 


@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    async validate(value: any, args: ValidationArguments) {
        const [entity, column] = args.constraints;
        const repo = AppDataSource.getRepository(entity);
        const exists = await repo.findOne({ where: { [column]: value } });

        return !exists; // Return false if the email already exists
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} already exists`;
    }
}

export function IsUnique(entity: any, column: string, validationOptions?: ValidationOptions) {
        return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [entity, column],
            validator: IsUniqueConstraint,
        });
        };
}
