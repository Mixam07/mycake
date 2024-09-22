const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

categorySchema.virtual('cakes', {
    ref: 'Cake',
    localField: '_id',
    foreignField: 'category'
})

categorySchema.methods.getPublicData = async function() {
    const category = this
    const readableValues = ["name", "id"];
    const publicCategoryData = {};

    for(const key in category){
        if(readableValues.includes(key)){
            publicCategoryData[key] = category[key]
        }
    }

    return publicCategoryData
}

const Category = mongoose.model('Category', categorySchema);

module.exports = Category