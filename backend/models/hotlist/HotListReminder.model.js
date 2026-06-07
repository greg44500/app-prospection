import mongoose from "mongoose";
import { applySoftDelete } from "../helper/applySoftDelete.js";
import { HOTLIST_REMINDER_STATUS } from "../shared/enums.js";

const { Schema } = mongoose;

const hotListReminderSchema = new Schema(
    {
        organization: {
            type: Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
            index: true,
        },

        contact: {
            type: Schema.Types.ObjectId,
            ref: "HotListContact",
            required: true,
            index: true,
        },

        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 160,
        },

        description: {
            type: String,
            trim: true,
            maxlength: 2000,
        },

        dueDate: {
            type: Date,
            required: true,
            index: true,
        },

        status: {
            type: String,
            enum: HOTLIST_REMINDER_STATUS,
            default: "planned",
            index: true,
        },

        completedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

// Rappels à venir
hotListReminderSchema.index({
    organization: 1,
    assignedTo: 1,
    status: 1,
    dueDate: 1,
});

// Rappels d'un contact
hotListReminderSchema.index({
    organization: 1,
    contact: 1,
    dueDate: -1,
});

hotListReminderSchema.plugin(applySoftDelete);

export default mongoose.model("HotListReminder", hotListReminderSchema);