import { iso, z } from 'zod';
import { CONTACT_ROLE, CONTACT_SOURCE, CONTACT_STATUS } from '../models/shared/enums';
import { requiredStringSchema, metadataSchema, shortTextSchema, phoneSchema, optionalPhoneSchema, emailSchema } from './common/text.validator';
import { paramsIdSchema, objectIdSchema } from './common/objectId.validator';
import { isoDateTimeSchema } from './common/date.validator';

export const createContactSchema = ({
    body: z.object({
        organization: objectIdSchema,
        owner: objectIdSchema,
        company: objectIdSchema,
        firstName: shortTextSchema,
        lastName: shortTextSchema,
        fullName: shortTextSchema,
        role: z.enum(CONTACT_ROLE).default('other'),
        status: z.enum(CONTACT_STATUS).default('new'),
        source: z.enum(CONTACT_SOURCE).default('manual'),
        email: emailSchema,
        phone: optionalPhoneSchema,
        mobilePhone: phoneSchema,
        address: objectIdSchema,
        mapPoint: objectIdSchema,
        notes: shortTextSchema,
        lastContactAt: isoDateTimeSchema,
        nextFollowUpAt: isoDateTimeSchema,
        metadata: metadataSchema,
    })

})

export const updateContactSchema = ({
    params: paramsIdSchema,
    body: z.object({
        organization: objectIdSchema,
        owner: objectIdSchema,
        company: objectIdSchema,
        firstName: shortTextSchema,
        lastName: shortTextSchema,
        fullName: shortTextSchema,
        role: z.enum(CONTACT_ROLE).default('other'),
        status: z.enum(CONTACT_STATUS).default('new'),
        source: z.enum(CONTACT_SOURCE).default('manual'),
        email: emailSchema,
        phone: optionalPhoneSchema,
        mobilePhone: phoneSchema,
        address: objectIdSchema,
        mapPoint: objectIdSchema,
        notes: shortTextSchema,
        lastContactAt: isoDateTimeSchema,
        nextFollowUpAt: isoDateTimeSchema,
        metadata: metadataSchema
    }).partial()
})

export const prospectIdParamsSchema = ({
    params: paramsIdSchema
})