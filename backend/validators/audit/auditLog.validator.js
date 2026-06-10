import { z } from 'Zod';
import { objectIdSchema, paramsIdSchema } from '../common/objectId.validator';
import { metadataSchema, requiredStringSchema, } from '../common/text.validator';
import { AUDIT_ACTION } from '../../models/shared/enums';

export const createAuditLogSchema = ({
    body: z.object({
        organization: objectIdSchema,
        user: objectIdSchema,
        action: z.enum(AUDIT_ACTION),
        entityType: requiredStringSchema,
        entityId: objectIdSchema,
        metadata: metadataSchema,
        ipAddress: requiredStringSchema,
        userAgent: requiredStringSchema,
    })
})

export const auditLogIdParamsSchema = ({
    params: paramsIdSchema
})

