const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: Buffer,
        required: true
    }
});

postSchema.methods.getPublicData = function() {
    const post = this

    const readableValues = ["title", "description", "id"];
    const publicPostData = {};

    for(const key in post){
        if(readableValues.includes(key)){
            publicPostData[key] = post[key]
        }
    }

    const url = process.env.URL;

    publicPostData.photosURL = `${url}/cakes/${post._id}/photo/`

    return publicPostData
}

const Post = mongoose.model('Post', postSchema);

module.exports = Post