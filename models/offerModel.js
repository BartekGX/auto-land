import mongoose, { Schema } from "mongoose";


const offerSchema= new mongoose.Schema({
        reference: String,
        name: String,
        info: {
            price: { type: Number, default: 0 },
            year: { type: Number, default: 0 },
            process: { type: Number, default: 0 },
            power: { type: Number, default: 0 },
            capacity: { type: Number, default: 0 },
            fuel: { type: String, default: "brak" },
            drive: { type: String, default: "brak" }
        },
        moreInfo: [{
            name: String,
            value: String
        }],
        description: String,
        photos: [String],
        isPublic: { type: Boolean, default: false },
        isSold: { type: Boolean, default: false },
    },
    {
        timestamps: true
    })
offerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Offer = mongoose.models.Offer || mongoose.model('Offer', offerSchema)

export default Offer;