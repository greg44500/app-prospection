import { z } from 'zod';
import { objectIdSchema, paramsIdSchema } from '../common/objectId.validator';
import { isoDateTimeSchema } from '../common/date.validator'
import { PROSPECTION_EXCLUSION_REASON } from '../../models/shared/enums';
import { longTextSchema } from '../common/text.validator';

export const createProspectionExclusionSchema = ({
    body: z.object({
        organization: objectIdSchema,
        mapPoint: objectIdSchema,
        reason: z.enum(PROSPECTION_EXCLUSION_REASON),
        notes: longTextSchema,
        excludedBy: objectIdSchema,
        excludedAt: isoDateTimeSchema,
        expiresAt: isoDateTimeSchema,
        isActive: z.boolean().default(true),

    })
})

export const updateProspectionExclusionSchema = ({
    params: paramsIdSchema,
    body: z.object({
        organization: objectIdSchema,
        mapPoint: objectIdSchema,
        reason: z.enum(PROSPECTION_EXCLUSION_REASON),
        notes: longTextSchema,
        excludedBy: objectIdSchema,
        excludedAt: isoDateTimeSchema,
        expiresAt: isoDateTimeSchema,
        isActive: z.boolean().default(true),
    }).partial
})

export const ProspectionExclusionIdParamsSchema = ({
    params: paramsIdSchema
})