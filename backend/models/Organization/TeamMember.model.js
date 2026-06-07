import mongoose from "mongoose";
import { TEAM_MEMBER_STATUS } from "../shared/enums";
import { applySoftDelete } from "../helper/applySoftDelete";

const { Schema } = mongoose;

const teamMemberSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectID,
        ref: 'Organization',
        required: true,
        index: true,
    },
    team: {
        type: Schema.Types.ObjectID,
        ref: 'Team',
        required: true,
        index: true,
    },
    user: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true,
        index: true,
    },

    status: {
        type: String,
        enum: TEAM_MEMBER_STATUS,
        default: 'active',
        index: true,
    },
    joinedat: Date,
    removedAt: Date,
    createdBy: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    }
}, { timestamps: true })

teamMemberSchema.index({ team: 1, user: 1 }, { unique: true });
teamMemberSchema.plugin(applySoftDelete);
export default mongoose.model('TeamMember', teamMemberSchema)