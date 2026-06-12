import { boolean, z } from 'zod';
import { paramsIdSchema, objectIdSchema } from '../common/objectId.validator';
import {
    metadataSchema, requiredStringSchema, shortTextSchema,
} from "../common/text.validator";
import { slugSchema } from '../common/text.validator';
import { NOTIFICATION_TYPE } from '../../models/shared/enums';

export const createEmailTemplateSchema = ({
    body: z.object({
        organization: objectIdSchema,
        name: shortTextSchema,
        slug: slugSchema,
        type: NOTIFICATION_TYPE,
        subject: shortTextSchema,
        htmlBody: requiredStringSchema,
        textBody: requiredStringSchema,
        variables: z.array[requiredStringSchema],
        isActive: boolean().default('true'),
        isSystem: boolean().default('false'),
        metadata: metadataSchema,
        createdBy: objectIdSchema
    })
})

export const emailTemplateIdParamsSchema = ({
    params: paramsIdSchema
})