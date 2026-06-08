// Valider les dates reçues depuis l’API.

// Exemples :

// startDate
// endDate
// createdFrom
// createdTo
// nextFollowUpAt

import { z } from "zod";

export const isoDateTimeSchema = z.iso.datetime({
    offset: true,
});

export const optionalIsoDateTimeSchema = isoDateTimeSchema.optional();

export const dateRangeQuerySchema = z
    .object({
        from: optionalIsoDateTimeSchema,
        to: optionalIsoDateTimeSchema,
    })
    .refine((data) => {
        if (!data.from || !data.to) return true;

        return new Date(data.from).getTime() <= new Date(data.to).getTime();
    }, {
        message: "The 'from' date must be before or equal to the 'to' date.",
        path: ["from"],
    });