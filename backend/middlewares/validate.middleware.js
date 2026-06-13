import { ZodError } from 'zod';

import AppError from '../utils/AppError.js';

const validate = (
    schema,
    source = 'body'
) => {
    return async (req, res, next) => {
        try {
            const validatedData =
                await schema.parseAsync(
                    req[source]
                );

            req[source] = validatedData;

            next();

        } catch (error) {

            if (error instanceof ZodError) {

                return next(
                    new AppError(
                        'Validation failed.',
                        400,
                        {
                            errors: error.issues,
                        }
                    )
                );

            }

            next(error);
        }
    };
};

export default validate;