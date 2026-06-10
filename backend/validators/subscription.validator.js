import { z } from "zod";
import { SUBSCRIPTION_STATUS, BILLING_PROVIDER } from "../models/shared/enums";
import { objectIdSchema, paramsIdSchema } from "./common/objectId.validator";
import {
    optionalSlugSchema,
    requiredStringSchema,
    shortTextSchema,
} from "./common/text.validator";

export const createSubscriptionSchema = ({
    body: z.object({
        organization: objectIdSchema,
        plan: objectIdSchema,
        status: z.enum(SUBSCRIPTION_STATUS).default("trialing"),
        slug: optionalSlugSchema,
    }),
})

export const updateSubscriptionSchema = {
    params: paramsIdSchema,
    body: z.object({
        plan: objectIdSchema,
        status: z.enum(SUBSCRIPTION_STATUS).default("trialing"),
        slug: optionalSlugSchema,
    }),
};

export const updateSunscriptionStatusSchema = {
    params: paramsIdSchema,

    body: z.object({
        status: z.enum(SUBSCRIPTION_STATUS),
    }),
};

export const susbcriptionIdParamSchema = {
    params: paramsIdSchema,
};
