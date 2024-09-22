const express = require("express");
const Cake = require("../models/cake");
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

router.get("/cakes", (req, res) => {
    const limit = req.query.limit? +req.query.limit: 10;
    
    Cake.find({})
    .skip(+req.query.skip)
    .limit(limit)
    .then(cakes => {
        res.send(cakes.map(cake => cake.getPublicData()))
    })
});

router.get("/cakes/:id",(req, res) => {
    Cake.findById(req.params.id)
    .then(async cake => {
        if(!cake){
            return res.status(400).send()
        }

        res.status(200).send(cake.getPublicData())
    })
    .catch(e => {
        res.status(500).send(e)
    })
});

router.get("/cakes/:id_cake/photos/:id_photo", async (req, res) => {
    const cake = await Cake.findById(req.params.id_cake);
    const photo = cake.photos[req.params.id_photo]

    res.set("Content-Type", "image/jpg")
    res.send(photo)
});

//POST

router.post("/cakes", upload.array("photos", 10), async  (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send({ error: "Please upload at least one file" });
    }

    const processedFiles = await Promise.all(req.files.map(async (file) => {
        const buffer = await sharp(file.buffer).resize({ width: 500, height: 400 }).toBuffer();
        return buffer;
    }));

    const data = JSON.parse(req.body.data);

    new Cake({
        ...data,
        photos: processedFiles
    }).save()
    .then((cake) => {
        res.status(200).send(cake.getPublicData())
    })
    .catch(e => {
        res.status(400).send(e)
    })
}, (error, req, res, next) => {
    res.status(400).send(error)
});

//PATCH

router.patch("/cakes/:id", upload.array("photos", 10), async (req, res) => {
    const data = req.body.data ? JSON.parse(req.body.data): {};
    const updates = Object.keys(data);
    const allowedUpdates = ["name", "description", "status", "price", "tags", "weight", "filling", "additional_services", "min_weight", "max_weight", "categories"];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send({ error: "Invalid updates!" });
    }

    Cake.findById(req.params.id)
    .then(async cake => {
        if(!cake){
            return res.status(400).send()
        }
        
        updates.forEach(update => {
            cake[update] = data[update]
        });
        
        await cake.save();

        res.status(200).send(cake.getPublicData())
    })
    .catch((e) => {
        res.status(500).send(e)
    })
});

//DELETE

router.delete("/cake/:id", async (req, res) => {
    Cake.findById(req.params.id)
    .then(async cake => {
        if(!cake){
            return res.status(400).send()
        }

        await cake.deleteOne();

        res.status(200).send(cake.getPublicData())
    })
    .catch(e => {
        res.status(500).send(e)
    })
});

module.exports = router