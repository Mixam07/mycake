const express = require("express");
const Cake = require("../models/cake");
const router = new express.Router();
const sharp = require("sharp");
const multer = require("multer");
const Category = require("../models/category");

const upload = multer({
    storage: multer.memoryStorage(),
    dest: "cakes",
    fileFilter(req, file, cb){
        const extension = file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/);
        
        if (!extension) {
            return cb(new Error('Please upload an image (jpg, jpeg, png)'));
        }

        cb(undefined, true);
    }
});

//GET

router.get("/cakes", async (req, res) => {
    try{   
        const limit = req.query.limit? +req.query.limit: 10;
    
        const cakes = await Cake.find({}).skip(+req.query.skip).limit(limit);
        const responce = [];

        for(let i = 0; i < cakes.length; i++){
           const cake = cakes[i]

           responce.push(await cake.getPublicData())
        }
       
        res.status(200).send(responce);
    }catch(e){
        res.status(400).send(e);
    }
});

router.get("/cakes/:id", async (req, res) => {
    try{
        const cake = await Cake.findById(req.params.id);

        if(!cake){
            return res.status(400).send({ error: "Cake do not finded" });
        }

        res.status(200).send(await cake.getPublicData());
    }catch(e){
        res.status(500).send(e);
    }
});

router.get("/cakes/:id_cake/photos/:id_photo", async (req, res) => {
    try{
        const cake = await Cake.findById(req.params.id_cake);
        const photo = cake.photos[req.params.id_photo]

        res.set("Content-Type", "image/jpg")
        res.send(photo)
    }catch(e){
        res.send("")
    }
});

//POST

router.post("/cakes", upload.array("photos", 10), async  (req, res) => {
    try{
        if(!req.files || req.files.length === 0) {
            return res.status(400).send({ error: "Please upload at least one file" });
        }
    
        const processedFiles = await Promise.all(req.files.map(async (file) => {
            const buffer = await sharp(file.buffer).resize({ width: 500, height: 400 }).toBuffer();
            return buffer;
        }));

        const data = JSON.parse(req.body.data);
        const category = await Category.findOne({ name: data.category });

        if(!category){
            return res.status(400).send({ error: "Categories on found" });
        }

        const cake = await new Cake({
            ...data,
            category: category._id,
            photos: processedFiles
        }).save()

        res.status(200).send(await cake.getPublicData())
    }catch(e){
        res.status(400).send(e)
    }
}, (error, req, res, next) => {
    res.status(400).send(error)
});

//PATCH

router.patch("/cakes/:id", upload.array("photos", 10), async (req, res) => {
    try{
        const data = req.body.data ? JSON.parse(req.body.data): {};
        const updates = Object.keys(data);
        const allowedUpdates = ["name", "description", "status", "price", "tags", "weight", "filling", "additional_services", "min_weight", "max_weight", "categories"];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if(!isValidOperation){
            return res.status(400).send({ error: "Invalid updates!" });
        }

        const cake = await Cake.findById(req.params.id);

        if(!cake){
            return res.status(400).send({ error: "Cake do not finded" })
        }
        
        updates.forEach(update => {
            cake[update] = data[update]
        });

        if(req.files){
            const processedFiles = await Promise.all(req.files.map(async (file) => {
                const buffer = await sharp(file.buffer).resize({ width: 500, height: 400 }).toBuffer();
                return buffer;
            }));

            post.photos = processedFiles
        }
        
        await cake.save();

        res.status(200).send(await cake.getPublicData())
    }catch(e){
        res.status(500).send(e)
    }
});

//DELETE

router.delete("/cake/:id", async (req, res) => {
    try{
        const cake = await Cake.findById(req.params.id) 

        if(!cake){
            return res.status(400).send({ error: "User do not finded" })
        }

        await cake.deleteOne();

        res.status(200).send(await cake.getPublicData())
    }catch(e){
        res.status(500).send(e)
    }
});

module.exports = router