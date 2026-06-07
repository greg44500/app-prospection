import mongoose from "mongoose";
import { applySoftDelete } from "../helper/applySoftDelete";
const { Schema } = mongoose;

const assignmentGroupSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectID,
        ref: 'Organization',
        required: true,
        index: true,
    },
    team: {
        type: Schema.Types.ObjectID,
        ref: 'Team',
        index: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },

    description: String,
    users: [
        {
            type: Schema.Types.ObjectID,
            ref: 'User'
        },
    ],
    createdBy: {
        type: Schema.Types.ObjectID,
        ref: 'User',
    }
}, { timestamps: true })

assignmentGroupSchema.index({ prganization: 1, name: 1 });
assignmentGroupSchema.plugin(applySoftDelete);

export default mongoose.model('AssignmentGroup', assignmentGroupSchema)