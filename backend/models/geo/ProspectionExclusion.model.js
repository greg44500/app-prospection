import mongoose from "mongoose";
import { applySoftDelete } from "../helper/applySoftDelete.js";
import { PROSPECTION_EXCLUSION_REASON } from "../shared/enums.js";

const { Schema } = mongoose;

const prospectionExclusionSchema = new Schema(
    {
        organization: {
            type: Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
            index: true,
        },

        mapPoint: {
            type: Schema.Types.ObjectId,
            ref: "MapPoint",
            required: true,
            index: true,
        },

        reason: {
            type: String,
            enum: PROSPECTION_EXCLUSION_REASON,
            required: true,
            index: true,
        },

        notes: {
            type: String,
            trim: true,
            maxlength: 2000,
        },

        excludedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        excludedAt: {
            type: Date,
            default: Date.now,
            index: true,
        },

        expiresAt: {
            type: Date,
            index: true,
            default: null,
        },

        isActive: {
            type: Boolean,
            default: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

/**
 * INDEX COMPOSÉS
 */

// Vérifier rapidement si un MapPoint est exclu
prospectionExclusionSchema.index({
    organization: 1,
    mapPoint: 1,
    isActive: 1,
});

// Liste des exclusions actives par raison
prospectionExclusionSchema.index({
    organization: 1,
    reason: 1,
    isActive: 1,
});

// Historique des exclusions créées par un utilisateur
prospectionExclusionSchema.index({
    organization: 1,
    excludedBy: 1,
    excludedAt: -1,
});

// Exclusions temporaires à réévaluer
prospectionExclusionSchema.index({
    organization: 1,
    isActive: 1,
    expiresAt: 1,
});

// Empêche plusieurs exclusions actives pour le même MapPoint
prospectionExclusionSchema.index(
    {
        organization: 1,
        mapPoint: 1,
        isActive: 1,
    },
    {
        unique: true,
        partialFilterExpression: {
            isActive: true,
        },
    }
);

prospectionExclusionSchema.plugin(applySoftDelete);

export default mongoose.model("ProspectionExclusion", prospectionExclusionSchema);