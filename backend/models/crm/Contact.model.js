import mongoose from "mongoose";
import { CONTACT_ROLE, CONTACT_SOURCE, CONTACT_STATUS } from "../shared/enums.js";
import { applySoftDelete } from "../helper/applySoftDelete.js";

const { Schema } = mongoose;

const contactSchema = new Schema({
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

    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        index: true,
    },

    firstName: {
        type: String,
        trim: true,
    },

    lastName: {
        type: String,
        trim: true,
        index: true,
    },

    fullName: {
        type: String,
        trim: true,
        index: true,
    },

    role: {
        type: String,
        enum: CONTACT_ROLE,
        default: 'other',
        index: true,
    },

    status: {
        type: String,
        enum: CONTACT_STATUS,
        default: 'new',
        index: true,
    },

    source: {
        type: String,
        enum: CONTACT_SOURCE,
        default: 'manual',
        index: true,
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

    mobilePhone: {
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

    lastContactAt: {
        type: Date,
    },

    nextFollowUpAt: {
        type: Date,
        index: true,
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

contactSchema.pre('save', function (next) {
    this.fullName = [this.firstName, this.lastName]
        .filter(Boolean)
        .join(' ')
        .trim();

    next();
});

// Recherche fréquente CRM
contactSchema.index({ organization: 1, owner: 1, status: 1, source: 1 });

// Recherche par relance
contactSchema.index({ organization: 1, nextFollowUpAt: 1 });

// Recherche par société
contactSchema.index({ organization: 1, company: 1 });

contactSchema.plugin(applySoftDelete);

export default mongoose.model('Contact', contactSchema);