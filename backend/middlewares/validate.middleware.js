import AppError from '../utils/AppError.js';

export const validate = (schema) => (req, res, next) => {
    const validatedData = {};

    for (const key of ['body', 'params', 'query']) {
        if (!schema[key]) continue;

        const result = schema[key].safeParse(req[key]);

        if (!result.success) {
            const errors = result.error.issues.map((issue) => ({
                field: `${key}.${issue.path.join('.')}`,
                message: issue.message,
            }));

            return next(new AppError('Validation error.', 400, errors));
        }

        validatedData[key] = result.data;
    }

    req.validated = validatedData;

    return next();
};