import { z } from 'zod';
import { maxCampaignSchema, planMapPointLimitSchema, planUserSchema, requiredStringSchema, slugSchema } from './common/text.validator';
import { paramsIdSchema } from './common/objectId.validator';


export const createPlanSchema = ({
    body: z.object({
        name: requiredStringSchema,
        slug: slugSchema,
        priceMonthlyCents: z.number(),
        priceYearlyCents: z.number(),
        currency: requiredStringSchema.default('EUR'),
        limits: z.object({
            maxUsers: planUserSchema,
            maxTeams: planUserSchema,
            maxTeamMembers: planUserSchema,
            maxMapPoints: planMapPointLimitSchema,
            maxCampaigns: maxCampaignSchema,
        }),
        features: z.array(z.string().trim()),
        isPublic: z.boolean(),
        isActive: z.boolean(),
    })
})

export const updatePlanSchema = ({
    params: paramsIdSchema,
    body: z.object({
        priceMonthlyCents: z.number(),
        priceYearlyCents: z.number(),
        currency: requiredStringSchema.default('EUR'),
        limits: z.object({
            maxUsers: planUserSchema,
            maxTeams: planUserSchema,
            maxTeamMembers: planUserSchema,
            maxMapPoints: planMapPointLimitSchema,
            maxCampaigns: maxCampaignSchema,
        }),
        features: z.array(z.string().trim()),
        isPublic: z.boolean(),
        isActive: z.boolean(),
    }).partial()
})

export const planIdParamsSchema = ({
    params: paramsIdSchema
})