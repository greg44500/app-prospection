// Valider les équipes et les membres d’équipe.

// Dans l' architecture, Team permet de gérer plusieurs utilisateurs dans une même organisation.
//  TeamMember permet de gérer l’appartenance d’un utilisateur à une équipe.

import { z } from "zod";
import { TEAM_MEMBER_STATUS } from "../models/shared/enums";
import { objectIdSchema, paramsIdSchema } from "./common/objectId.validator";
import {
    optionalSlugSchema,
    requiredStringSchema,
    shortTextSchema,
} from "./common/text.validator";

export const createTeamSchema = {
    body: z.object({
        organization: objectIdSchema,
        name: shortTextSchema,
        description: shortTextSchema.optional(),
        slug: optionalSlugSchema,
    }),
};

export const updateTeamSchema = {
    params: paramsIdSchema,

    body: z.object({
        name: shortTextSchema,
        description: shortTextSchema.optional(),
        slug: optionalSlugSchema,
    }),
};

export const addTeamMemberSchema = {
    params: paramsIdSchema,

    body: z.object({
        user: objectIdSchema,
        role: objectIdSchema.optional(),
        status: z.enum(TEAM_MEMBER_STATUS).default("invited"),
    }),
};

export const updateTeamMemberStatusSchema = {
    params: paramsIdSchema,

    body: z.object({
        status: z.enum(TEAM_MEMBER_STATUS),
    }),
};

export const teamIdParamSchema = {
    params: paramsIdSchema,
};