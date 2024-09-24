const mongoose = require("mongoose");

const cakeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: true,
        validate(value) {
            if(value < 0 || value > 100000){
                throw new Error("Weight must be a positive number and not exceed 100000")
            }
        }
    },
    tags: {
        type: [String],
        //required: true
    },
    weight: {
        type: Number,
        required: true,
        validate(value) {
            if(value < 0 || value > 1000){
                throw new Error("Weight must be a positive number and not exceed 1000 kg")
            }
        }
    },
    filling: {
        type: [String],
        required: true
    },
    additional_services: {
        type: [String],
        required: true
    },
    min_weight: {
        type: Number,
        required: true,
        validate(value) {
            if(value < 0 || value > 1000){
                throw new Error("Weight must be a positive number and not exceed 1000 kg")
            }
        }
    },
    max_weight: {
        type: Number,
        required: true,
        validate(value) {
            if(value < 0 || value > 1000){
                throw new Error("Weight must be a positive number and not exceed 1000 kg")
            }
        }
    },
    photos: {
        type: [Buffer],
        require: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    }
    /*
    rewievs: {

    },
    */
});

cakeSchema.methods.getPublicData = async function() {
    const cake = this;
    const readableValues = ["name", "description", "status", "price", "tags", "weight", "filling", "additional_services", "min_weight", "max_weight", "id"];
    const publicCakeData = {};

    for(const key in cake){
        if(readableValues.includes(key)){
            publicCakeData[key] = cake[key]
        }
    }

    publicCakeData.photosURL = cake.photos.map((item, i) => {
        const url = process.env.URL;
        
        return `${url}/cakes/${cake._id}/photos/${i}`
    });
    
    return publicCakeData
}

const Cake = mongoose.model('Cake', cakeSchema);

module.exports = Cake