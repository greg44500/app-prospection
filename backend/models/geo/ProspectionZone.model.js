import mongoose from "mongoose";
import { applySoftDelete } from "../helper/applySoftDelete";

const { Schema } = mongoose;

const prospectionZoneSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
        index: true,
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        index: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    geometry: {
        type: {
            type: String,
            enum: ['Polygon', 'MultiPolygon'],
            required: true,
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
    city: String,
    inseeCode: String,
    color: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true })

// Recherche géographique et affichage cartographique
prospectionZoneSchema.index({ geometry: '2dsphere' });

// Filtrage de la zone par organisation, et équipe
prospectionZoneSchema.index({ organization: 1, team: 1 })

prospectionZoneSchema.plugin(applySoftDelete);

export default mongoose.model('ProspectionZone', prospectionZoneSchema)