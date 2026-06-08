import mongoose from "mongoose";
import { COMPANY_STATUS, COMPANY_TYPE } from "../shared/enums";
import { applySoftDelete } from "../helper/applySoftDelete";
import { applySlug } from "../helper/applySlug";

const { Schema } = mongoose;

const companySchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        index: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    slug: {
        type: String,
        trim: true,
        lowercase: true,
        index: true,
    },
    type: {
        type: String,
        enum: COMPANY_TYPE,
        default: 'other',
        index: true,
    },
    status: {
        type: String,
        enum: COMPANY_STATUS,
        default: 'active',
        index: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: Number,
        trim: true,
    },
    website: {
        type: String,
        trim: true,
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
    },

    mapPoint: {
        type: Schema.Types.ObjectId,
        ref: 'MapPoint',
    },

    notes: {
        type: String,
        trim: true,
    },

    metadata: {
        type: Map,
        of: Schema.Types.Mixed,
        default: {},
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

// Recherche fréquente par organisation, propriétaire, type et statut
companySchema.index({ organization: 1, owner: 1, type: 1, status: 1 });

// Évite les doublons de nom dans une même organisation
companySchema.index({ organization: 1, slug: 1 });

// Plugin de slug si ton helper fonctionne bien à partir du champ "name"
companySchema.plugin(applySlug, {
    sourceField: 'name',
    targetField: 'slug',
});

companySchema.plugin(applySoftDelete);

export default mongoose.model('Company', companySchema);
