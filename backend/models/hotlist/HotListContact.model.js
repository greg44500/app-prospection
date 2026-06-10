import mongoose from "mongoose";
import { applySoftDelete } from "../helper/applySoftDelete.js";
import {
    CONTACT_SOURCE,
    PROSPECT_PRIORITY,
    HOTLIST_CONTACT_STATUS,
    HOTLIST_CONTACT_TYPE,
} from "../shared/enums.js";

const { Schema } = mongoose;

const hotListContactSchema = new Schema(
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

        firstName: {
            type: String,
            trim: true,
        },

        lastName: {
            type: String,
            trim: true,
        },

        fullName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 160,
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
        },

        phone: {
            type: String,
            trim: true,
        },
        mobile: {
            type: String,
            trim: true,
        },

        type: {
            type: String,
            enum: HOTLIST_CONTACT_TYPE,
            default: "other",
            index: true,
        },

        status: {
            type: String,
            enum: HOTLIST_CONTACT_STATUS,
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
            enum: CONTACT_SOURCE,
            default: "manual",
            index: true,
        },

        address: {
            type: Schema.Types.ObjectId,
            ref: "Address",
            index: true,
        },

        mapPoint: {
            type: Schema.Types.ObjectId,
            ref: "MapPoint",
            index: true,
        },

        notes: {
            type: String,
            trim: true,
            maxlength: 3000,
        },

        lastInteractionAt: {
            type: Date,
            index: true,
        },

        nextReminderAt: {
            type: Date,
            index: true,
        },

        tags: [
            {
                type: Schema.Types.ObjectId,
                ref: "HotListTag",
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Contacts par propriétaire
hotListContactSchema.index({
    organization: 1,
    owner: 1,
    status: 1,
});

// Contacts par priorité
hotListContactSchema.index({
    organization: 1,
    owner: 1,
    priority: 1,
});

// Contacts à relancer
hotListContactSchema.index({
    organization: 1,
    owner: 1,
    nextReminderAt: 1,
});

// Recherche par email
hotListContactSchema.index({
    organization: 1,
    email: 1,
});

hotListContactSchema.plugin(applySoftDelete);

export default mongoose.model("HotListContact", hotListContactSchema);