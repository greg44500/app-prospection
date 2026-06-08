// Valider les données liées à l’authentification :

// register
// login
// refresh token

import { z } from 'zod';
import { emailSchema, requiredStringSchema } from './common/text.validator';

export const registerSchema = {
    body: z.object({
        firstName: requiredStringSchema.max(80),
        lastName: requiredStringSchema(80),
        email: emailSchema,
        password: z
            .string()
            .min(8, "Password must contain at least 8 characters.")
            .max(128, "Password must contain at most 128 characters."),
    }),
}

export const loginSchema = {
    body: z.object({
        email: emailSchema,
        password: z.string().min(1, "Password is required."),
    }),
};

export const refreshTokenSchema = {
    body: z.object({
        refreshToken: z.string().min(1, 'Refresh Token is required.'),
    }),
};
