import mongoose from "mongoose";
import { applySoftDelete } from "../helper/applySoftDelete";
import { applySlug } from "../helper/applySlug";
const { Schema } = mongoose;
const roleSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        default: null,
        index: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 80,
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    description: String,

    permissions: {
        type: Schema.Types.ObjectId,
        ref: 'Permission',
    },
    isSystem: {
        type: Boolean,
        default: false,
        index: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true })

roleSchema.index({ organization: 1, slug: 1 }, { unique: true });
roleSchema.plugin(applySoftDelete);
companySchema.plugin(applySlug, {
    sourceField: 'name',
    targetField: 'slug',
});

export default mongoose.model('Role', roleSchema)

