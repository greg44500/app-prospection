import mongoose from 'mongoose';
import { AUDIT_ACTION } from '../shared/enums';

const { Schema } = mongoose;

const auditLogSchema = new Schema(
    {
        organization: {
            type: Schema.Types.ObjectId,
            ref: 'Organization',
            index: true,
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            index: true,
        },

        action: {
            type: String,
            enum: AUDIT_ACTION,
            required: true,
            index: true,
        },

        entityType: {
            type: String,
            required: true,
            index: true,
        },

        entityId: {
            type: Schema.Types.ObjectId,
            index: true,
        },

        metadata: {
            type: Map,
            of: Schema.Types.Mixed,
            default: {},
        },

        ipAddress: String,

        userAgent: String,
    },
    {
        timestamps: true,
    }
);

auditLogSchema.index({
    organization: 1,
    createdAt: -1,
});

export default mongoose.model('AuditLog', auditLogSchema);