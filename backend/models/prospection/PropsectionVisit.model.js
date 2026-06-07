import mongoose from "mongoose";
import { applySoftDelete } from "../helper/applySoftDelete.js";
import { VISIT_STATUS } from "../shared/enums.js";

const { Schema } = mongoose;

const prospectionVisitSchema = new Schema(
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
            required: true,
            index: true,
        },

        visitedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        visitDate: {
            type: Date,
            default: Date.now,
            index: true,
        },

        status: {
            type: String,
            enum: VISIT_STATUS,
            default: "to visit",
            index: true,
        },

        notes: {
            type: String,
            trim: true,
            maxlength: 2000,
        },

        nextFollowUpDate: {
            type: Date,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

// Visites par campagne
prospectionVisitSchema.index({
    organization: 1,
    campaign: 1,
    status: 1,
});

// Visites par affectation
prospectionVisitSchema.index({
    organization: 1,
    assignment: 1,
    status: 1,
});

// Historique des visites d'un point
prospectionVisitSchema.index({
    organization: 1,
    mapPoint: 1,
    visitDate: -1,
});

// Historique des visites d'un utilisateur
prospectionVisitSchema.index({
    organization: 1,
    visitedBy: 1,
    visitDate: -1,
});

// Visites par statut
prospectionVisitSchema.index({
    organization: 1,
    status: 1,
    visitDate: -1,
});

// Relances à venir
prospectionVisitSchema.index({
    organization: 1,
    nextFollowUpDate: 1,
});

prospectionVisitSchema.plugin(applySoftDelete);

export default mongoose.model("ProspectionVisit", prospectionVisitSchema);