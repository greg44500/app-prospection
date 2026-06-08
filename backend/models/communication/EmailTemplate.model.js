import mongoose from "mongoose";
import {
    NOTIFICATION_TYPE,
} from "../shared/enums";
import { applySoftDelete } from "../helper/applySoftDelete";
import { applySlug } from "../helper/applySlug";

const { Schema } = mongoose;

const emailTemplateSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: "Organization",
        index: true,
    },

    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },

    slug: {
        type: String,
        trim: true,
        lowercase: true,
        index: true,
    },

    type: {
        type: String,
        enum: NOTIFICATION_TYPE,
        required: true,
        index: true,
    },

    subject: {
        type: String,
        required: true,
        trim: true,
    },

    htmlBody: {
        type: String,
        required: true,
    },

    textBody: {
        type: String,
        trim: true,
    },

    variables: [{
        type: String,
        trim: true,
    }],

    isActive: {
        type: Boolean,
        default: true,
        index: true,
    },

    isSystem: {
        type: Boolean,
        default: false,
        index: true,
    },

    metadata: {
        type: Map,
        of: Schema.Types.Mixed,
        default: {},
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

// Recherche des templates disponibles
emailTemplateSchema.index({
    organization: 1,
    type: 1,
    isActive: 1,
});

// Évite les doublons logiques par organisation
emailTemplateSchema.index({
    organization: 1,
    slug: 1,
});

emailTemplateSchema.plugin(applySlug, {
    sourceField: "name",
    targetField: "slug",
});

emailTemplateSchema.plugin(applySoftDelete);

export default mongoose.model("EmailTemplate", emailTemplateSchema);