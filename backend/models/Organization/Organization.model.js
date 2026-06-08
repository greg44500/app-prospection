import mongoose from "mongoose";
import { ORGANIZATION_STATUS } from "../shared/enums";
import { applySoftDelete } from "../helper/applySoftDelete";
import { applySlug } from "../helper/applySlug";
const { Schema } = mongoose;

const organizationSchema = new Schema({
    name: {
        type: string,
        required: true,
        trim: true,
        index: true,
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        index: true,
    },
    status: {
        type: String,
        enum: ORGANIZATION_STATUS,
        default: 'active',
        index: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    billingEmail: {
        type: String,
        lowercase: true,
        trim: true,
    },
    settings: {
        timezone: {
            type: String,
            default: 'Europe/Paris'
        },
        locale: {
            type: String,
            default: 'fr-FR',
        },
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true })

organizationSchema.plugin(applySoftDelete);
companySchema.plugin(applySlug, {
    sourceField: 'name',
    targetField: 'slug',
});

export default mongoose.model('Organization', organizationSchema)