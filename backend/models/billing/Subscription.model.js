import mongoose from "mongoose";
import { SUBSCRIPTION_STATUS, BILLING_PROVIDER } from "../shared/enums";

const { Schema } = mongoose;

const subscriptionSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
        unique: true,
        index: true,
    },
    plan: {
        type: Schema.Types.ObjectId,
        ref: 'Plan',
        required: true,
    },
    status: {
        type: String,
        enum: SUBSCRIPTION_STATUS,
        default: 'trialing',
        index: true,
    },
    provider: {
        type: String,
        enum: BILLING_PROVIDER,
        default: 'manual'
    },
    providerCustomerId: String,
    providerSubscriptionId: String,
    trialEndAt: Date,
    currentPeriodStart: Date,
    currentPeriodEnd: Date,
    canceledAt: Date,
    limitOverride: {
        maxUsers: Number,
        maxTeams: Number,
        maxTeamMembers: Number,
        maxMapPoints: Number,
        maxCampaigns: Number,
    },
}, { timestamps: true })

// Abonnements arrivant à échéance
subscriptionSchema.index({ status: 1, currentPeriodEnd: 1 })

export default mongoose.model('Subscription', subscriptionSchema)