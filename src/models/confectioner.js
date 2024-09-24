const mongoose = require("mongoose");
var jwt = require('jsonwebtoken');

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
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
});

confectionersSchema.methods.generateAuthToken = async function() {
    const confectioner = this;
    const key = process.env.KEY;
    const token = jwt.sign({ id: confectioner.toString() }, key);
    
    confectioner.tokens = confectioner.tokens.concat({ token })

    await confectioner.save();

    return token
}

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

    return publicConfectionersData
}

const Confectioners = mongoose.model('confectioners', confectionersSchema);

module.exports = Confectioners