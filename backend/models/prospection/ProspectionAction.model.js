import mongoose from "mongoose";
import { applySoftDelete } from "../helper/applySoftDelete.js";
import {
    PROSPECTING_ACTION_TYPE,
    PROSPECTING_ACTION_STATUS,
} from "../shared/enums.js";

const { Schema } = mongoose;

const prospectionActionSchema = new Schema(
    {
        organization: {
            type: Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
            index: true,
        },

        campaign: {
            type: Schema.Types.ObjectId,
            ref: "ProspectionCampaign",
            required: true,
            index: true,
        },

        assignment: {
            type: Schema.Types.ObjectId,
            ref: "ProspectionAssignment",
            required: true,
            index: true,
        },

        mapPoint: {
            type: Schema.Types.ObjectId,
            ref: "MapPoint",
            index: true,
        },

        visit: {
            type: Schema.Types.ObjectId,
            ref: "ProspectionVisit",
            index: true,
        },

        performedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        type: {
            type: String,
            enum: PROSPECTING_ACTION_TYPE,
            required: true,
            index: true,
        },

        status: {
            type: String,
            enum: PROSPECTING_ACTION_STATUS,
            default: "planned",
            index: true,
        },

        content: {
            type: String,
            trim: true,
            maxlength: 2000,
        },

        scheduledAt: {
            type: Date,
            index: true,
        },

        completedAt: {
            type: Date,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

// Actions par campagne
prospectionActionSchema.index({
    organization: 1,
    campaign: 1,
    status: 1,
});

// Actions par affectation
prospectionActionSchema.index({
    organization: 1,
    assignment: 1,
    status: 1,
});

// Actions planifiées sur un point
prospectionActionSchema.index({
    organization: 1,
    mapPoint: 1,
    scheduledAt: 1,
});

// Actions liées à une visite
prospectionActionSchema.index({
    organization: 1,
    visit: 1,
    scheduledAt: 1,
});

// Actions d'un utilisateur
prospectionActionSchema.index({
    organization: 1,
    performedBy: 1,
    status: 1,
});

// Actions par type
prospectionActionSchema.index({
    organization: 1,
    type: 1,
    status: 1,
});

// Actions planifiées à venir
prospectionActionSchema.index({
    organization: 1,
    status: 1,
    scheduledAt: 1,
});

// Historique des actions réalisées
prospectionActionSchema.index({
    organization: 1,
    completedAt: -1,
});

prospectionActionSchema.plugin(applySoftDelete);

export default mongoose.model("ProspectionAction", prospectionActionSchema);