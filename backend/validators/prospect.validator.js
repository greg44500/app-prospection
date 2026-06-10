import { z } from "zod";
import { PROSPECT_PRIORITY, PROSPECT_STATUS, PROSPECT_SOURCE } from "../models/shared/enums";
import { objectIdSchema, paramsIdSchema } from "./common/objectId.validator";
import {
    longTextSchema,
    requiredStringSchema,
    shortTextSchema,
} from "./common/text.validator";
import { isoDateTimeSchema } from "./common/date.validator";

export const createProspectSchema = ({
    body: z.object({
        organization: objectIdSchema,
        owner: objectIdSchema,
        assignedTo: objectIdSchema,
        title: requiredStringSchema.max(80),
        status: z.enum(PROSPECT_STATUS).default('new'),
        priority: z.enum(PROSPECT_PRIORITY).default('low'),
        source: z.enum(PROSPECT_SOURCE).default("manual"),
        mapPoint: objectIdSchema,
        hotListContact: objectIdSchema,
        estimatedValue: z.number(),
        probability: z.number(),
        notes: requiredStringSchema(3000),
        lastContactAt: isoDateTimeSchema,
        nextFollow: isoDateTimeSchema,
        convertedAt: isoDateTimeSchema,
        lostAt: isoDateTimeSchema,
        lostReason: requiredStringSchema(1000)
    })
})

export const updateProspectSchema = ({
    params: paramsIdSchema,
    body: z.object({
        organization: objectIdSchema,
        owner: objectIdSchema,
        assignedTo: objectIdSchema,
        title: requiredStringSchema.max(80),
        status: z.enum(PROSPECT_STATUS).default('new'),
        priority: z.enum(PROSPECT_PRIORITY).default('low'),
        source: z.enum(PROSPECT_SOURCE).default("manual"),
        mapPoint: objectIdSchema,
        hotListContact: objectIdSchema,
        estimatedValue: z.number(),
        probability: z.number(),
        notes: longTextSchema,
        lastContactAt: isoDateTimeSchema,
        nextFollowUpAt: isoDateTimeSchema,
        convertedAt: isoDateTimeSchema,
        lostAt: isoDateTimeSchema,
        lostReason: requiredStringSchema(1000)
    }).partial() // Tous les champs facultatifs mais valides si présents
})

// =============================================================
// = SCHEMAS COMPLEMENTAIRES A AJOUTER ET MULTIPLiER SI BESOIN =
// =============================================================

// export const updateProspectStatusSchema = ({
//     params: paramsIdSchema,
//     body:
//         z.object({
//             status: z.enum(PROSPECT_STATUS)
//         })
// })

// export const updateProspectPrioritySchema = ({
//     params: paramsIdSchema,
//     body:
//         z.object({
//             priority: z.enum(PROSPECT_PRIORITY)
//         })
// })

// export const updateProspectSourceSchema = ({
//     params: paramsIdSchema,
//     body:
//         z.object({
//             source: z.enum(PROSPECT_SOURCE)
//         })
// })

export const prospectIdParamsSchema = ({
    params: paramsIdSchema,
})