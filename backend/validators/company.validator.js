import { partialRecord, z } from 'Zod';
import { COMPANY_TYPE, COMPANY_STATUS } from '../models/shared/enums';
import {
    objectIdSchema,
    paramsIdSchema
}
    from './common/objectId.validator';
import {
    shortTextSchema,
    longTextSchema,
    slugSchema,
    emailSchema,
    websiteSchema,
    phoneSchema,
    metadataSchema
}
    from './common/text.validator';


export const createCompanySchema = ({
    body: z.object({
        organization: objectIdSchema,
        owner: objectIdSchema,
        name: shortTextSchema,
        slug: slugSchema,
        type: z.enum(COMPANY_TYPE).default('other'),
        status: z.enum(COMPANY_STATUS).default('active'),
        email: emailSchema,
        phone: phoneSchema,
        website: websiteSchema,
        address: objectIdSchema,
        mapPoint: objectIdSchema,
        notes: longTextSchema,
        metadata: metadataSchema,

    })
})

export const updateCompanySchema = ({
    params: paramsIdSchema,
    body: z.object({
        organization: objectIdSchema,
        owner: objectIdSchema,
        name: shortTextSchema,
        slug: slugSchema,
        type: z.enum(COMPANY_TYPE).default('other'),
        status: z.enum(COMPANY_STATUS).default('active'),
        email: emailSchema,
        phone: phoneSchema,
        website: websiteSchema,
        address: objectIdSchema,
        mapPoint: objectIdSchema,
        notes: longTextSchema,
        metadata: metadataSchema,
    }).partial()
})

export const companyIdParamsSchema = {
    params: paramsIdSchema
}

