import { z } from 'zod';
import { objectIdSchema, paramsIdSchema } from '../common/objectId.validator';
import { longTextSchema, shortTextSchema } from '../common/text.validator';
import { isoDateTimeSchema } from '../common/date.validator';
import { HOTLIST_REMINDER_STATUS } from '../../models/shared/enums';

export const createHotListReminderSchema = ({
    body: z.object({
        organization: objectIdSchema,
        contact: objectIdSchema,
        assignedTo: objectIdSchema,
        title: shortTextSchema,
        description: longTextSchema,
        dueDate: isoDateTimeSchema,
        status: z.enum(HOTLIST_REMINDER_STATUS).default('planned'),
        completedAt: isoDateTimeSchema
    })
})

export const updateHotListReminderSchema = ({
    params: paramsIdSchema,
    body: z.object({
        dueDate: isoDateTimeSchema,
        status: z.enum(HOTLIST_REMINDER_STATUS).default('planned'),
    })
})

export const hotListIdParamsSchema = ({
    params: paramsIdSchema
})

