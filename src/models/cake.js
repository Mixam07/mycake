const mongoose = require("mongoose");
require('dotenv').config();

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
    categories: {
        type: [String],
        require: true
    }
    /*
    owner: {

    },
    rewievs: {

    },
    */
});

cakeSchema.methods.getPublicData = function() {
    const cake = this;
    const readableValues = ["name", "description", "status", "price", "tags", "weight", "filling", "additional_services", "min_weight", "max_weight", "categories", "id"];
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

/*
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.getTocken = function() {
    //console.log(this)
}


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if(!user){
        throw new Error("Unable to login")
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error("Unable to login")
    }

    return user
}

userSchema.pre("save", async function(next) {
    const user = this;

    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next();
})

userSchema.pre('deleteOne', { document: true }, async function(next) {
    const user = this;

    await Task.deleteMany({ owner: user._id })

    next();
})
*/

const Cake = mongoose.model('Cake', cakeSchema);

module.exports = Cake