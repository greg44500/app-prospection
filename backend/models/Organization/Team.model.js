import mongoose from "mongoose";
import { applySoftDelete } from "../helper/applySoftDelete";
import { applySlug } from "../helper/applySlug";
const { Schema } = mongoose;

const teamSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectID,
        ref: 'Organization',
        required: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    manager: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        index: true,
    },
    maxMembersOverride: {
        type: Number,
        min: 1,
        default: null,
    },
    createdBy: {
        type: Schema.Types.ObjectID,
        ref: 'User',
    },
}, { timestamps: true })

teamSchema.index({ organization: 1, slug: 1 }, { unique: true });
teamSchema.plugin(applySoftDelete);
teamSchema.plugin(applySlug);

export default mongoose.model('Team', teamSchema)