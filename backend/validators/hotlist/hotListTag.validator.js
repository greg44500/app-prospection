import { z } from 'zod';
import { objectIdSchema, paramsIdSchema } from '../common/objectId.validator';
import { shortTextSchema } from '../common/text.validator';

export const createHotListTagSchema = ({
    body: z.object({
        organization: objectIdSchema,
        owner: objectIdSchema,
        name: shortTextSchema,
        color: shortTextSchema,
    })
})

export const updateeHotListTagSchema = ({
    params: paramsIdSchema,
    body: z.object({
        name: shortTextSchema,
        color: shortTextSchema,
    })
})

export const hotListTagIdParamsSchema = ({
    params: paramsIdSchema
})



