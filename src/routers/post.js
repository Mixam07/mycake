const express = require("express");
const Post = require("../models/post");
const router = new express.Router();
const sharp = require("sharp");
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
    dest: "cakes",
    /*
    limits: {
        fileSize: 1000000
    },
    */
    fileFilter(req, file, cb){
        const extension = file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/);
        
        if (!extension) {
            return cb(new Error('Please upload an image (jpg, jpeg, png)'));
        }

        cb(undefined, true);
    }
});

//GET

router.get("/posts", (req, res) => {
    const limit = req.query.limit? +req.query.limit: 10;
    
    Post.find({})
    .skip(+req.query.skip)
    .limit(limit)
    .then(posts => {
        res.send(posts.map(post => post.getPublicData()))
    })
});

router.get("/posts/:id",(req, res) => {
    Post.findById(req.params.id)
    .then(async post => {
        if(!post){
            return res.status(400).send()
        }

        res.status(200).send(post.getPublicData())
    })
    .catch(e => {
        res.status(500).send(e)
    })
});

router.get("/posts/:id/photo", async (req, res) => {
    const cake = await Post.findById(req.params.id);

    res.set("Content-Type", "image/jpg")
    res.send(cake.photo)
});

//POST

router.post("/posts", upload.single('photo'), async  (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: "Please upload file" });
    }

    const buffer = await sharp(req.file.buffer).resize({ width: 1000, height: 500 }).toBuffer();
    const data = JSON.parse(req.body.data);

    new Post({
        ...data,
        photo: buffer
    }).save()
    .then((post) => {
        res.status(200).send(post.getPublicData())
    })
    .catch(e => {
        res.status(400).send(e)
    })
});

//PATCH

router.patch("/posts/:id", upload.single('photo'), async (req, res) => {
    const data = req.body.data ? JSON.parse(req.body.data): {};
    const updates = Object.keys(data);
    const allowedUpdates = ["title", "description"];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    
    if(!isValidOperation){
        return res.status(400).send({ error: "Invalid updates!" });
    }

    Post.findById(req.params.id)
    .then(async post => {
        if(!post){
            return res.status(400).send()
        }
        
        updates.forEach(update => {
            post[update] = data[update]
        });

        if(req.file){
            const buffer = await sharp(req.file.buffer).resize({ width: 1000, height: 500 }).toBuffer();

            post.photo = buffer
        }
        
        await post.save();

        res.status(200).send(post.getPublicData())
    })
    .catch((e) => {
        res.status(500).send(e)
    })
});

module.exports = router