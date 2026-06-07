import mongoose from "mongoose";
import { applySoftDelete } from "../helper/applySoftDelete.js";

const { Schema } = mongoose;

const hotListTagSchema = new Schema(
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
            index: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 80,
        },

        color: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// Tags par utilisateur
hotListTagSchema.index({
    organization: 1,
    owner: 1,
    name: 1,
});

// Évite les doublons de tags
hotListTagSchema.index(
    {
        organization: 1,
        owner: 1,
        name: 1,
    },
    {
        unique: true,
    }
);

hotListTagSchema.plugin(applySoftDelete);

export default mongoose.model("HotListTag", hotListTagSchema);