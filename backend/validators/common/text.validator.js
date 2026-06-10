// Centraliser les règles de texte réutilisables :

// nom
// titre
// description
// commentaire
// email
// téléphone
// slug

import { z } from "zod";

export const requiredStringSchema = z
    .string()
    .trim()
    .min(1, "This field is required.");

export const shortTextSchema = z
    .string()
    .trim()
    .min(1, "This field is required.")
    .max(120, "This field must contain at most 120 characters.");

export const longTextSchema = z
    .string()
    .trim()
    .max(2000, "This field must contain at most 2000 characters.")
    .optional();

export const optionalStringSchema = z
    .string()
    .trim()
    .optional();

export const emailSchema = z
    .email("Invalid email address.")
    .trim()
    .toLowerCase();

export const optionalEmailSchema = emailSchema.optional();

export const phoneSchema = z
    .string()
    .trim()
    .min(6, "Phone number is too short.")
    .max(11, "Phone number is too long.");

export const websiteSchema = z
    .url();


export const optionalPhoneSchema = phoneSchema.optional();

export const metadataSchema = z
    .record(z.string(), z.unknown()).optional();

export const slugSchema = z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format.");

export const optionalSlugSchema = slugSchema.optional();