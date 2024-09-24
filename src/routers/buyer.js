const express = require("express");
const Buyer = require("../models/buyer");
const Confectioner = require("../models/confectioner");
const router = new express.Router();
const { phone } = require('phone');
const sharp = require("sharp");
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
    dest: "buyers",
    fileFilter(req, file, cb){
        const extension = file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/);
        
        if (!extension) {
            return cb(new Error('Please upload an image (jpg, jpeg, png)'));
        }

        cb(undefined, true);
    }
});

//GET

router.get("/buyers", async (req, res) => {
    try{
        const limit = req.query.limit? +req.query.limit: 10;
    
        const buyers = await Buyer.find({}).skip(+req.query.skip).limit(limit);
        const responce = [];

        for(let i = 0; i < buyers.length; i++){
           const buyer = buyers[i]

           responce.push(await buyer.getPublicData())
        }
       
        res.status(200).send(responce);
    }catch(e) {
        res.status(400).send(e)
    }
});

router.get("/buyers/:id", async (req, res) => {
    try{
        const user = await Buyer.findById(req.params.id);

        if(!user){
            res.status.send({ error: "Buyer do not finded" });
        }

        res.status(200).send(await user.getPublicData())
    }catch(e) {
        res.status(400).send(e)
    }
});

router.get("/buyers/:id/photo", async (req, res) => {
    try{
        const user = await Buyer.findById(req.params.id);

        res.set("Content-Type", "image/jpg");
        res.send(user.photo);
    }catch(e) {
        res.send("")
    }
});

//POST

router.post("/buyers/registration", async (req, res) => {
    try{
        if(!phone(req.body.phone,  {country: "UA"}).isValid){
            res.status(400).send({ error: "Enter valid phone" })
        }

        const maybeConfectioner = await Confectioner.findOne({ phone: req.body.phone });
        const maybeBuyer = await Buyer.findOne({ phone: req.body.phone });

        if(maybeBuyer || maybeConfectioner){
            res.status(400).send({ error: "This phone number is already in use" })
        }

        const buyer = new Buyer(req.body)

        await buyer.save();

        res.status(200).send(await buyer.getPublicData());
    }catch(e) {
        res.status(400).status(e);
    }
});

router.post("/buyers/login", async (req, res) => {
    try{
        const user = await Buyer.findOne({ phone: req.body.phone });

        if(!user){
            res.status(400).send({ error: "User do not finded" });
        }

        res.status(200).send(await user.getPublicData());
    }catch(e) {
        res.status(400).send(e);
    }
});

router.post("/buyers/code", async (req, res) => {
    try{   
        const user = await Buyer.findOne({ phone: req.body.phone });

        if(!user){
            res.status(400).send({ error: "User do not finded" });
        }

        if(req.body.code !== "111111"){
            res.status(400).send({ error: "Invalid code" });
        }

        res.cookie('userId', user.id, { httpOnly: true });
        
        res.status(200).send(await user.getPublicData())
    }catch(e){
        res.status(400).send(e)
    }
});

//PATCH

router.patch("/buyers/:id", upload.single('photo'), async (req, res) => {
    try{
        const data = req.body.data ? JSON.parse(req.body.data): {};
        const updates = Object.keys(data);
        const allowedUpdates = ["name", "phone"];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if(!isValidOperation){
            return res.status(400).send({ error: "Invalid updates!" });
        }

        const user = await Buyer.findById(req.params.id);

        if(!user){
            res.status(400).send({ error: "User do not finded" });
        }

        updates.forEach(update => {
            user[update] = data[update]
        });

        if(req.file){
            user.photo = await sharp(req.file.buffer).resize({ width: 200, height: 200 }).toBuffer()
        }

        await user.save();

        res.status(200).send(await user.getPublicData())
    }catch(e){
        res.status(400).send(e);
    }
});

//DELETE

router.delete("/buyers/:id", async (req, res) => {
    try{
        const user = await Buyer.findById(req.params.id);

        await user.deleteOne();

        res.status(200).send(await user.getPublicData());
    }catch(e){
        res.status(400).send(e);
    }
});

module.exports = router