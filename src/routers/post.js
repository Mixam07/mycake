const express = require("express");
const Post = require("../models/post");
const router = new express.Router();
const sharp = require("sharp");
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
    dest: "posts",
    fileFilter(req, file, cb){
        const extension = file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/);
        
        if (!extension) {
            return cb(new Error('Please upload an image (jpg, jpeg, png)'));
        }

        cb(undefined, true);
    }
});

//GET

router.get("/posts", async (req, res) => {
    try{
        const limit = req.query.limit? +req.query.limit: 10;
    
        const posts = await Post.find({}).skip(+req.query.skip).limit(limit);
        const responce = [];

        for(let i = 0; i < posts.length; i++){
           const post = posts[i]

           responce.push(await post.getPublicData())
        }
        
        res.status(200).send(responce);
    }catch(e){
        res.status(400).send(e);
    }
});

router.get("/posts/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        
        if(!post){
            return res.status(400).send({})
        }

        res.status(200).send(await post.getPublicData())
    }catch(e){
        res.status(500).send(e)
    }
});

router.get("/posts/:id/photo", async (req, res) => {
    try{
        const cake = await Post.findById(req.params.id);

        res.set("Content-Type", "image/jpg")
        res.send(cake.photo)
    }catch(e){
        res.send("")
    }
});

//POST

router.post("/posts", upload.single('photo'), async  (req, res) => {
    try{
        if (!req.file) {
            return res.status(400).send({ error: "Please upload file" });
        }
    
        const buffer = await sharp(req.file.buffer).resize({ width: 1000, height: 500 }).toBuffer();
        const data = JSON.parse(req.body.data);
    
        const post = await new Post({
            ...data,
            photo: buffer
        }).save();

        res.status(200).send(await post.getPublicData());
    }catch(e){
        res.status(400).send(e);
    }
});

//PATCH

router.patch("/posts/:id", upload.single('photo'), async (req, res) => {
    try{
        const data = req.body.data ? JSON.parse(req.body.data): {};
        const updates = Object.keys(data);
        const allowedUpdates = ["title", "description"];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));
        
        if(!isValidOperation){
            return res.status(400).send({ error: "Invalid updates!" });
        }

        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(400).send({})
        }
        
        updates.forEach(update => {
            post[update] = data[update]
        });

        if(req.file){
            const buffer = await sharp(req.file.buffer).resize({ width: 1000, height: 500 }).toBuffer();

            post.photo = buffer
        }
        
        await post.save();

        res.status(200).send(await post.getPublicData())
    }catch(e){
        res.status(500).send(e)
    }
});

//DELETE

router.delete("/posts/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(400).send({})
        }

        await post.deleteOne();

        res.status(200).send(await post.getPublicData())
    }catch(e) {
        res.status(500).send(e)
    }
});

module.exports = router