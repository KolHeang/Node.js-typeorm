import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

/**
 * Custom decorator to validate DTOs before executing the controller function.
 * @param dtoClass The DTO class to validate
 */
export function ValidatorDTO(dtoClass: any) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                const dtoInstance = Object.assign(new dtoClass(), req.body);
                const errors = await validate(dtoInstance);

                if (errors.length > 0) {
                    return res.status(400).json({
                        status:false,
                        errors: errors.map(error => ({
                            field: error.property,
                            message: Object.values(error.constraints || {}).join(", ")
                        }))
                    });
                }

                // Pass the validated DTO to the next function
                req.body = dtoInstance;
                return originalMethod.apply(this, [req, res, next]);
            } catch (error) {
                return res.status(500).json({ 
                    status:false,
                    message: "Internal server error",
                    error: error.message,
                });
            }
        };
    };
}
