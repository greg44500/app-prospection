import mongoose from "mongoose";
import { applySoftDelete } from "../helper/applySoftDelete.js";
import {
    PROSPECT_STATUS,
    PROSPECT_PRIORITY,
    PROSPECT_SOURCE,
} from "../shared/enums.js";

const { Schema } = mongoose;

const prospectSchema = new Schema(
    {
        organization: {
            type: Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
            index: true,
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: "User",
            index: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 160,
        },

        status: {
            type: String,
            enum: PROSPECT_STATUS,
            default: "new",
            index: true,
        },

        priority: {
            type: String,
            enum: PROSPECT_PRIORITY,
            default: "medium",
            index: true,
        },

        source: {
            type: String,
            enum: PROSPECT_SOURCE,
            default: "manual",
            index: true,
        },

        mapPoint: {
            type: Schema.Types.ObjectId,
            ref: "MapPoint",
            index: true,
        },

        hotListContact: {
            type: Schema.Types.ObjectId,
            ref: "HotListContact",
            index: true,
        },

        estimatedValue: {
            type: Number,
            min: 0,
        },

        probability: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
        },

        notes: {
            type: String,
            trim: true,
            maxlength: 3000,
        },

        lastContactAt: {
            type: Date,
            index: true,
        },

        nextFollowUpAt: {
            type: Date,
            index: true,
        },

        convertedAt: {
            type: Date,
            index: true,
        },

        lostAt: {
            type: Date,
            index: true,
        },

        lostReason: {
            type: String,
            trim: true,
            maxlength: 1000,
        },
    },
    {
        timestamps: true,
    }
);

// Prospects par propriétaire
prospectSchema.index({
    organization: 1,
    owner: 1,
    status: 1,
});

// Prospects assignés à un utilisateur
prospectSchema.index({
    organization: 1,
    assignedTo: 1,
    status: 1,
});

// Prospects par priorité
prospectSchema.index({
    organization: 1,
    priority: 1,
    status: 1,
});

// Prospects par source
prospectSchema.index({
    organization: 1,
    source: 1,
    status: 1,
});

// Relances commerciales à venir
prospectSchema.index({
    organization: 1,
    nextFollowUpAt: 1,
    status: 1,
});

// Opportunités liées à un point carte
prospectSchema.index({
    organization: 1,
    mapPoint: 1,
});

// Opportunités liées à un contact HotList
prospectSchema.index({
    organization: 1,
    hotListContact: 1,
});

// Historique des prospects convertis
prospectSchema.index({
    organization: 1,
    convertedAt: -1,
});

// Historique des prospects perdus
prospectSchema.index({
    organization: 1,
    lostAt: -1,
});

prospectSchema.plugin(applySoftDelete);

export default mongoose.model("Prospect", prospectSchema);