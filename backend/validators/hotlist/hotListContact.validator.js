import { z } from 'Zod';
import { objectIdSchema, paramsIdSchema } from '../common/objectId.validator';
import { emailSchema, longTextSchema, optionalPhoneSchema, phoneSchema, shortTextSchema } from '../common/text.validator';
import { HOTLIST_CONTACT_SOURCE, HOTLIST_CONTACT_STATUS, HOTLIST_CONTACT_TYPE, HOTLIST_PRIORITY } from '../../models/shared/enums';
import { isoDateTimeSchema } from '../common/date.validator';


export const createHotListContactSchema = ({
    body: z.object({
        organization: objectIdSchema,
        owner: objectIdSchema,
        firstName: shortTextSchema,
        lastName: shortTextSchema,
        fullName: shortTextSchema,
        email: emailSchema,
        phone: optionalPhoneSchema,
        mobile: phoneSchema,
        type: z.enum(HOTLIST_CONTACT_TYPE).default('other'),
        status: z.enum(HOTLIST_CONTACT_STATUS).default('new'),
        priority: z.enum(HOTLIST_PRIORITY).default('medium'),
        source: z.enum(HOTLIST_CONTACT_SOURCE).default('manual'),
        address: objectIdSchema,
        mapPoint: objectIdSchema,
        notes: longTextSchema,
        lastInteractionAt: isoDateTimeSchema,
        nextReminderAt: isoDateTimeSchema,
        tags: objectIdSchema,
    })
})

export const updateHotListContactSchema = ({
    params: paramsIdSchema,
    body: z.object({
        organization: objectIdSchema,
        owner: objectIdSchema,
        firstName: shortTextSchema,
        lastName: shortTextSchema,
        fullName: shortTextSchema,
        email: emailSchema,
        phone: optionalPhoneSchema,
        mobile: phoneSchema,
        type: z.enum(HOTLIST_CONTACT_TYPE).default('other'),
        status: z.enum(HOTLIST_CONTACT_STATUS).default('new'),
        priority: z.enum(HOTLIST_PRIORITY).default('medium'),
        source: z.enum(HOTLIST_CONTACT_SOURCE).default('manual'),
        address: objectIdSchema,
        mapPoint: objectIdSchema,
        notes: longTextSchema,
        lastInteractionAt: isoDateTimeSchema,
        nextReminderAt: isoDateTimeSchema,
    }).partial()
})

export const editTagToHotListContactSchema = ({
    params: paramsIdSchema,
    body: z.object({
        tags: objectIdSchema
    })
})



export const hotListIdParamsSchema = ({
    params: paramsIdSchema
})
