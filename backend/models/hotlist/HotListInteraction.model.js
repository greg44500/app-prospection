import mongoose from "mongoose";
import { applySoftDelete } from "../helper/applySoftDelete.js";
import { HOTLIST_INTERACTION_TYPE } from "../shared/enums.js";

const { Schema } = mongoose;

const hotListInteractionSchema = new Schema(
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

        performedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        type: {
            type: String,
            enum: HOTLIST_INTERACTION_TYPE,
            required: true,
            index: true,
        },

        content: {
            type: String,
            trim: true,
            maxlength: 3000,
        },

        interactionDate: {
            type: Date,
            default: Date.now,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

// Historique d'un contact
hotListInteractionSchema.index({
    organization: 1,
    contact: 1,
    interactionDate: -1,
});

// Interactions d'un utilisateur
hotListInteractionSchema.index({
    organization: 1,
    performedBy: 1,
    interactionDate: -1,
});

// Interactions par type
hotListInteractionSchema.index({
    organization: 1,
    type: 1,
    interactionDate: -1,
});

hotListInteractionSchema.plugin(applySoftDelete);

export default mongoose.model("HotListInteraction", hotListInteractionSchema);