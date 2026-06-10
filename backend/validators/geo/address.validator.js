import { z } from 'zod';
import { requiredStringSchema } from '../common/text.validator';
import { geoPointSchema } from '../common/geoPoint.validator';
import { ADDRESS_SOURCE } from '../../models/shared/enums';
import { objectIdSchema, paramsIdSchema } from '../common/objectId.validator';

export const createAddressSchema = ({
    body: z.object({
        label: requiredStringSchema,
        street: requiredStringSchema,
        postalCode: requiredStringSchema,
        city: requiredStringSchema,
        cityCode: requiredStringSchema,
        inseeCode: requiredStringSchema,
        departmentCode: requiredStringSchema,
        country: requiredStringSchema.default('FR'),
        location: geoPointSchema,
        source: z.enum(ADDRESS_SOURCE).default('manual'),
        sourceId: objectIdSchema,
    })
})

export const upadteAddressSchema = ({
    params: paramsIdSchema,
    body: z.object({
        label: requiredStringSchema,
        street: requiredStringSchema,
        postalCode: requiredStringSchema,
        city: requiredStringSchema,
        cityCode: requiredStringSchema,
        inseeCode: requiredStringSchema,
        departmentCode: requiredStringSchema,
        location: geoPointSchema,
        source: z.enum(ADDRESS_SOURCE).default('manual'),
        sourceId: objectIdSchema,
    }).partial()
})

export const addressIdParamsSchema = ({
    params: paramsIdSchema
})