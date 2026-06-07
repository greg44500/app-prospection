import mongoose from "mongoose";
import { PROSPECTION_STATUS } from "../shared/enums";
import { applySoftDelete } from "../helper/applySoftDelete";


const { Schema } = mongoose;

const prospectionAssignmentSchema = new Schema(
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

        assignedToUser: {
            type: Schema.Types.ObjectId,
            ref: "User",
            index: true,
        },

        assignedToTeam: {
            type: Schema.Types.ObjectId,
            ref: "Team",
            index: true,
        },

        zone: {
            type: Schema.Types.ObjectId,
            ref: "ProspectionZone",
            index: true,
        },

        status: {
            type: String,
            enum: PROSPECTION_STATUS,
            default: "todo",
            index: true,
        },

        dueDate: {
            type: Date,
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },

        notes: {
            type: String,
            trim: true,
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

// Affectations par campagne
prospectionAssignmentSchema.index({
    organization: 1,
    campaign: 1,
    status: 1,
});

// Affectations d'un utilisateur
prospectionAssignmentSchema.index({
    organization: 1,
    assignedToUser: 1,
    status: 1,
});

// Affectations d'une équipe
prospectionAssignmentSchema.index({
    organization: 1,
    assignedToTeam: 1,
    status: 1,
});

// Affectations à échéance
prospectionAssignmentSchema.index({
    organization: 1,
    dueDate: 1,
    status: 1,
});

// Affectations par zone
prospectionAssignmentSchema.index({
    organization: 1,
    zone: 1,
});

prospectionAssignmentSchema.plugin(applySoftDelete)
export default mongoose.model("ProspectionAssignment", prospectionAssignmentSchema);
