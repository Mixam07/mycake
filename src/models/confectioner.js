const mongoose = require("mongoose");

const confectionersSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        required: true
    },
    photo: {
        type: Buffer,
    },
    descrtiption: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    delivery: {
        type: String
    },
    payment: {
        type: String
    },
    instagram: {
        type: String
    },
    facebook: {
        type: String
    },
    youtube: {
        type: String
    }
});

confectionersSchema.methods.getPublicData = async function() {
    const confectioner = this
    const readableValues = ["name", "phone", "id"];
    const publicConfectionersData = {};

    for(const key in confectioner){
        if(readableValues.includes(key)){
            publicConfectionersData[key] = confectioner[key]
        }
    }

    if(confectioner.photo){
        const url = process.env.URL;

        publicConfectionersData.photoURL = `${url}/confectioners/${confectioner._id}/photo`
    }

    publicConfectionersData.type = "confectioner";

    return publicConfectionersData
}

const Confectioners = mongoose.model('confectioners', confectionersSchema);

module.exports = Confectioners