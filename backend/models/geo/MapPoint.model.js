import mongoose from "mongoose";
import { MAP_POINT_SOURCE, MAP_POINT_TYPE } from "../shared/enums";
import { applySoftDelete } from "../helper/applySoftDelete";

const { Schema } = mongoose;

const mapPointSchema = new Schema({
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
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
    },
    label: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: MAP_POINT_TYPE,
        default: 'manual',
    },
    source: {
        type: String,
        enum: MAP_POINT_SOURCE,
        default: 'manual',
        index: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            required: true,
            validate: {
                validator(value) {
                    return Array.isArray(value) && value.length === 2;
                },
                message: 'Coordinates must contain [longitude, latitude].',
            },
        }
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
}, { timestamps: true })

// Recherche géographique et affichage cartographique
mapPointSchema.index({ location: '2dsphere' });

// Filtrage des points par organisation, propriétaire et type
mapPointSchema.index({ organization: 1, owner: 1, type: 1 })

mapPointSchema.plugin(applySoftDelete);

export default mongoose.model('MapPoint', mapPointSchema)