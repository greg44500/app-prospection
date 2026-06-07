import mongoose from "mongoose";
const { Schema } = mongoose;
const permissionSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    module: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    action: {
        type: String,
        required: true,
        trim: true,
    },
    description: String,
}, { timestamps: true })

permissionSchema.index({ module: 1, action: 1 }, { unique: true })
export default mongoose.model('Permission', permissionSchema)