import mongoose from "mongoose";
import { applySlug } from "../helper/applySlug";
import { applySoftDelete } from "../helper/applySoftDelete";
const { Schema } = mongoose;

const planSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    priceMonthlyCents: {
        type: Number,
        required: true,
        min: 0,
    },
    priceYearlyCents: {
        type: Number,
        min: 0,
    },
    currency: {
        type: String,
        default: 'EUR',
        uppercase: true,
    },
    limits: {
        maxUsers: {
            type: Number,
            default: 1,
        },
        maxTeams: {
            type: Number,
            default: 1,
        },
        maxTeamMembers: {
            type: Number,
            default: 1,
        },
        maxMapPoints: {
            type: Number,
            default: 1000,
        },
        maxCampaigns: {
            type: Number,
            default: 5,
        },
        features: [
            {
                type: String,
                trim: true,

            },
        ],
        isPublic: {
            type: Boolean,
            default: true,
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true,
        },
    }
}, { timestamps: true })

planSchema.plugin(applySoftDelete);
planSchema.plugin(applySlug);

export default mongoose.model('Plan', planSchema);

