import mongoose from "mongoose";
import { applySoftDelete } from "../helper/applySoftDelete";
import { ADDRESS_SOURCE } from "../shared/enums";

const { Schema } = mongoose;

const addressSchema = new Schema({
    label: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    street: String,
    postalCode: String,
    city: {
        type: String,
        index: true,
    },
    cityCode: String,
    inseeCode: {
        type: String,
        index: true,
    },
    departmentCode: String,
    regionCode: String,
    country: {
        type: String,
        default: 'FR',
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
    source: {
        type: String,
        enum: ADDRESS_SOURCE,
        default: 'manual'
    },
    sourceId: String,

}, { timestamps: true })

// Requêtes géographiques et affichage cartographique
addressSchema.index({ location: '2dsphere' })
addressSchema.plugin(applySoftDelete)

export default mongoose.model('Address', addressSchema)