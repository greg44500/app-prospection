import mongoose from "mongoose";
import { PROSPECTION_STATUS } from "../shared/enums";
import { applySoftDelete } from "../helper/applySoftDelete";


const { Schema } = mongoose;

const prospectionCampaignSchema = new Schema(
    {
        organization: {
            type: Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
            index: true,
        },

        team: {
            type: Schema.Types.ObjectId,
            ref: "Team",
            index: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        status: {
            type: String,
            enum: PROSPECTION_STATUS,
            default: "draft",
            index: true,
        },

        startDate: {
            type: Date,
        },

        endDate: {
            type: Date,
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        isDeleted: {
            type: Boolean,
            default: false,
            index: true,
        },

        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);
// Campagnes par statut
prospectionCampaignSchema.index({
    organization: 1,
    status: 1,
    startDate: -1,
});

// Campagnes d'une équipe
prospectionCampaignSchema.index({
    organization: 1,
    team: 1,
    status: 1,
});

// Campagnes créées par un utilisateur
prospectionCampaignSchema.index({
    organization: 1,
    createdBy: 1,
    createdAt: -1,
});

prospectionCampaignSchema.plugin(applySoftDelete)
export default mongoose.model("ProspectionCampaign", prospectionCampaignSchema);