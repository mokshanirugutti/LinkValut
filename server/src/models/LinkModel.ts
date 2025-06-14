import mongoose, { Schema } from 'mongoose';

const linkSchema = new Schema({
    title: {
        type: String,
        required: true,
        
    },
    url: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export const Link = mongoose.model('Link', linkSchema); 