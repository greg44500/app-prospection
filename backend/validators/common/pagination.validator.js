// Valider les paramètres de pagination envoyés dans l’URL :

        // ?page=1&limit=20&sortBy=createdAt&sortOrder=desc

import { z } from "zod";

const positiveIntegerFromQuery = z
    .string()
    .trim()
    .regex(/^\d+$/, "Must be a positive integer.")
    .transform((value) => Number(value));

export const paginationQuerySchema = z.object({
    page: positiveIntegerFromQuery
        .default("1")
        .refine((value) => value >= 1, {
            message: "Page must be greater than or equal to 1.",
        }),

    limit: positiveIntegerFromQuery
        .default("20")
        .refine((value) => value >= 1 && value <= 100, {
            message: "Limit must be between 1 and 100.",
        }),

    sortBy: z
        .string()
        .trim()
        .default("createdAt"),

    sortOrder: z
        .enum(["asc", "desc"])
        .default("desc"),
});