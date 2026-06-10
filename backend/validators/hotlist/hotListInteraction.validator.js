import { z } from 'zod';
import { objectIdSchema, paramsIdSchema } from '../common/objectId.validator'
import { HOTLIST_INTERACTION_TYPE } from '../../models/shared/enums';
import { longTextSchema } from '../common/text.validator';
import { isoDateTimeSchema } from '../common/date.validator';


export const createHotListInteractionSchema = ({
    body: z.object({
        organization: objectIdSchema,
        contact: objectIdSchema,
        performedBy: objectIdSchema,
        type: z.enum(HOTLIST_INTERACTION_TYPE),
        content: longTextSchema,
        interactionDate: isoDateTimeSchema,
    })
})

export const updateHotListInteractionSchema = ({
    params: paramsIdSchema,
    body: z.object({
        organization: objectIdSchema,
        contact: objectIdSchema,
        performedBy: objectIdSchema,
        type: z.enum(HOTLIST_INTERACTION_TYPE),
        content: longTextSchema,
        interactionDate: isoDateTimeSchema,
    }).partial
})

export const updateHotListInteractionTypeSchema = ({
    params: paramsIdSchema,
    body: z.object({
        type: z.enum(HOTLIST_INTERACTION_TYPE)
    })
})

export const hotListInteractionIdParamsSchema = ({
    params: paramsIdSchema
})

