import mongoose from "mongoose";
import {
    NOTIFICATION_CHANNEL,
    NOTIFICATION_STATUS,
    NOTIFICATION_TYPE,
} from "../shared/enums";
import { applySoftDelete } from "../helper/applySoftDelete";

const { Schema } = mongoose;

const notificationSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: "Organization",
        index: true,
    },

    recipient: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },

    actor: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    type: {
        type: String,
        enum: NOTIFICATION_TYPE,
        required: true,
        index: true,
    },

    channel: {
        type: String,
        enum: NOTIFICATION_CHANNEL,
        default: "in_app",
        index: true,
    },

    status: {
        type: String,
        enum: NOTIFICATION_STATUS,
        default: "unread",
        index: true,
    },

    title: {
        type: String,
        required: true,
        trim: true,
    },

    message: {
        type: String,
        required: true,
        trim: true,
    },

    link: {
        type: String,
        trim: true,
    },

    payload: {
        type: Map,
        of: Schema.Types.Mixed,
        default: {},
    },

    readAt: {
        type: Date,
    },

    sentAt: {
        type: Date,
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

// Liste des notifications d'un utilisateur
notificationSchema.index({
    recipient: 1,
    status: 1,
    createdAt: -1,
});

// Notifications par organisation
notificationSchema.index({
    organization: 1,
    type: 1,
    channel: 1,
    createdAt: -1,
});

notificationSchema.plugin(applySoftDelete);

export default mongoose.model("Notification", notificationSchema);