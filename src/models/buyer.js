const mongoose = require("mongoose");

const buyersSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    photo: {
        type: Buffer,
    }
});

buyersSchema.methods.getPublicData = async function() {
    const buyer = this
    const readableValues = ["name", "phone", "id"];
    const publicBuyersData = {};

    for(const key in buyer){
        if(readableValues.includes(key)){
            publicBuyersData[key] = buyer[key]
        }
    }

    if(buyer.photo){
        const url = process.env.URL;

        publicBuyersData.photoURL = `${url}/buyers/${buyer._id}/photo`
    }

    publicBuyersData.type = "buyer";

    return publicBuyersData
}

const Buyer = mongoose.model('buyers', buyersSchema);

module.exports = Buyer