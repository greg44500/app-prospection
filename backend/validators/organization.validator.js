// Valider la création et la modification d’une organisation.

// Une Organization représente la structure principale du SaaS : agence, entreprise, réseau, compte client, etc.

import { z } from "zod";
import { ORGANIZATION_STATUS } from "../models/shared/enums";
import { paramsIdSchema } from "./common/objectId.validator";
import {
    optionalSlugSchema,
    requiredStringSchema,
    shortTextSchema,
} from "./common/text.validator";

export const createOrganizationSchema = {
    body: z.object({
        name: requiredStringSchema.max(120),
        displayName: shortTextSchema.optional(),
        slug: optionalSlugSchema,
    }),
};

export const updateOrganizationSchema = {
    params: paramsIdSchema,

    body: z.object({
        name: requiredStringSchema.max(120).optional(),
        displayName: shortTextSchema.optional(),
        slug: optionalSlugSchema,
        status: z.enum(ORGANIZATION_STATUS).optional(),
    }),
};

export const organizationIdParamSchema = {
    params: paramsIdSchema,
};