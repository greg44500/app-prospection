import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import { USER_PROVIDER, USER_STATUS } from '../shared/enums.js'
import { applySoftDelete } from "../helper/applySoftDelete.js";
const { Schema } = mongoose;

const userSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        index: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        index: true,
    },
    phone: {
        type: Number,
        maxlength: 10,
        trim: true,
    },
    password: {
        type: String,
        select: false,
        minlength: 8,
    },
    firstName: {
        type: String,
        trim: true,
        maxlength: 80,
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 80,
    },
    fullname: {
        type: String,
        trim: true,
        index: true,
    },
    avatarUrl: {
        type: String,
        trim: true,
    },
    provider: {
        type: String,
        enum: USER_PROVIDER,
        default: 'local',
    },
    status: {
        type: String,
        enum: USER_STATUS,
        default: 'pending',
        index: true,
    },
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Role',
        },
    ],
    lastLogin: Date,
    lastActivityAt: Date,
    emailVerifiedAt: Date,
    passwordChangedAt: Date,
    createdy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

}, { timestamps: true })

userSchema.pre('save', async function hashPassword(next) {
    // Hash password only when it is created or modified
    if (!this.isModified('password') || !this.password) return next();

    this.password = await bcrypt.hash(this.password, 12);

    // Track password changes only for existing users
    if (!this.isNew) {
        this.passwordChangedAt = new Date();
    }

    next();
});

userSchema.pre('save', function setFullName(next) {
    // Build fullName from available identity fields
    this.fullName = [this.firstName, this.lastName].filter(Boolean).join(' ');

    next();
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
    // Compare plain candidate password with hashed password
    return bcrypt.compare(candidatePassword, this.password);
};

applySoftDelete(userSchema);
export default mongoose.model('User', userSchema)