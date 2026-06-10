// Valider les actions liées aux utilisateurs :

// mise à jour profil
// changement de statut
// changement de rôle

import { z } from "zod";
import { USER_STATUS } from "../models/shared/enums";
import { objectIdSchema, paramsIdSchema } from "./common/objectId.validator";
import {
    emailSchema,
    optionalPhoneSchema,
    requiredStringSchema,
    shortTextSchema,
} from "./common/text.validator";

export const userIdParamSchema = {
    params: paramsIdSchema,
};

export const updateUserProfileSchema = {
    body: z.object({
        firstName: shortTextSchema.optional(),
        lastName: shortTextSchema.optional(),
        email: emailSchema.optional(),
        phone: optionalPhoneSchema,
    }),
};

export const updateUserStatusSchema = {
    params: paramsIdSchema,

    body: z.object({
        status: z.enum(USER_STATUS),
    }),
};

export const assignUserRoleSchema = {
    params: paramsIdSchema,

    body: z.object({
        roleId: objectIdSchema,
    }),
};