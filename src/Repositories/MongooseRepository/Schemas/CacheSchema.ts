import { model, Schema } from "mongoose";
import { CacheModel } from "src/Models/CacheModel";


const schema = new Schema<CacheModel>({
    id: { type: String },
    key: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    value: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    ttl: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export const CacheSchema = model<CacheModel>('caches', schema);