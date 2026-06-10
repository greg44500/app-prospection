import { z } from 'zod';
import { objectIdSchema, paramsIdSchema } from '../common/objectId.validator';
import { metadataSchema, requiredStringSchema } from '../common/text.validator';
import { MAP_POINT_SOURCE, MAP_POINT_TYPE } from '../../models/shared/enums';
import { geoPointSchema } from '../common/geoPoint.validator';

export const createMapPointSchema = ({
    body: ({
        organization: objectIdSchema,
        owner: objectIdSchema,
        address: objectIdSchema,
        label: requiredStringSchema,
        type: z.enum(MAP_POINT_TYPE).default('manual'),
        source: z.enum(MAP_POINT_SOURCE).default('manual'),
        location: geoPointSchema,
        metadata: metadataSchema,
        createdBy: objectIdSchema,
    })
})
export const updateMapPointSchema = ({
    params: paramsIdSchema,
    body: ({
        organization: objectIdSchema,
        owner: objectIdSchema,
        address: objectIdSchema,
        label: requiredStringSchema,
        type: z.enum(MAP_POINT_TYPE).default('manual'),
        source: z.enum(MAP_POINT_SOURCE).default('manual'),
        location: geoPointSchema,
        metadata: metadataSchema,
    }).partial()
})

export const mapPointIdParamsSchema = ({
    params: paramsIdSchema
})
