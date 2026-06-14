import mongoose from "mongoose";
const { Schema } = mongoose;
const refreshTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true,
        index: true,
    },
    tokenHash: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    familyId: {
        type: String,
        required: true,
        index: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: true,
    },
    revokeAt: Date,
    replacedByTokenHash: String,
    ipAddress: String,
    userAgent: String,
    isCompromised: {
        type: Boolean,
        default: false,
    }
},
    { timestamps: true })

refreshTokenSchema.index({ user: 1, familyId: 1 })
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export default mongoose.model('RefreshToken', refreshTokenSchema)