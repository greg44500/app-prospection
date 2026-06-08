// Valider les identifiants MongoDB reçus dans :

    // req.params
    // req.body
    // req.query

import { z } from "zod";
import mongoose from "mongoose";

export const objectIdSchema = z
    .string()
    .trim()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
        message: "Invalid MongoDB ObjectId.",
    });

export const optionalObjectIdSchema = objectIdSchema.optional();

export const paramsIdSchema = z.object({
    id: objectIdSchema,
});