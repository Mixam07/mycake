const express = require("express");
const Confectioner = require("../models/confectioner");
const router = new express.Router();
const { phone } = require('phone');
const sharp = require("sharp");
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
    dest: "confectioners",
    fileFilter(req, file, cb){
        const extension = file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/);
        
        if (!extension) {
            return cb(new Error('Please upload an image (jpg, jpeg, png)'));
        }

        cb(undefined, true);
    }
});

//GET

router.get("/confectioners", async (req, res) => {
    try{
        const limit = req.query.limit? +req.query.limit: 10;
    
        const confectioners = await Confectioner.find({}).skip(+req.query.skip).limit(limit);
        const responce = [];

        for(let i = 0; i < confectioners.length; i++){
           const confectioner = confectioners[i]

           responce.push(await confectioner.getPublicData())
        }
        
        res.status(200).send(responce);
    }catch(e){
        res.status(400).send(e);
    }
});

router.get("/confectioners/:id", async (req, res) => {
    try{
        const user = await Confectioner.findById(req.params.id);

        if(!user){
            res.status(400).send({ error: "User do not finded" })
        }

        res.status(200).send(await user.getPublicData())
    }catch(e) {
        res.status(400).send(e)
    }
});

router.get("/confectioners/:id/photo", async (req, res) => {
    try{
        const confectioner = await Confectioner.findById(req.params.id);

        res.set("Content-Type", "image/jpg")
        res.send(confectioner.photo)
    }catch(e) {
        res.send(e)
    }
});

router.get("/getAuth", async (req, res) => {
    try{
        if(!req.cookies.userId){
            res.status(400).send({})
        }

        const user = await Confectioner.findById(req.cookies.userId)

        if(!user){
            res.status(400).send({})
        }

        res.status(200).send(await user.getPublicData())
    }catch(e) {
        res.status(400).send(e)
    }
});

//POST

router.post("/confectioners/registration", async (req, res) => {
    try{
        if(!phone(req.body.phone,  {country: "UA"}).isValid){
            res.status(400).send({ error: "Enter valid phone" })
        }

        const maybeUser = await Confectioner.findOne({ phone: req.body.phone });

        if(maybeUser){
            res.status(400).send({ error: "This phone number is already in use" })
        }

        const confectioner = new Confectioner(req.body)

        await confectioner.save();

        res.status(200).send(confectioner);
    }catch(e) {
        res.status(400).status(e);
    }
});

router.post("/confectioners/login", async (req, res) => {
    try{
        const user = await Confectioner.findOne({ phone: req.body.phone });

        if(!user){
            res.status(400).send({ error: "User do not finded" });
        }

        res.cookie('userId', user.id, { httpOnly: true });

        res.status(200).send({...await user.getPublicData(), token: await user.generateAuthToken()});
    }catch(e) {
        res.status(400).send(e);
    }
});

router.post("/confectioners/code", async (req, res) => {
    try{   
        const user = await Confectioner.findOne({ phone: req.body.phone });

        if(!user){
            res.status(400).send({ error: "User do not finded" });
        }

        if(req.body.code !== "111111"){
            res.status(400).send({ error: "Invalid code" });
        }
        
        res.status(200).send(await user.getPublicData())
    }catch(e){
        res.status(400).send(e)
    }
});

//PATCH

router.patch("/confectioners/:id", upload.single('photo'), async (req, res) => {
    try{
        const data = req.body.data ? JSON.parse(req.body.data): {};
        const updates = Object.keys(data);
        const allowedUpdates = ["name", "phone", "description", "address", "email", "delivery", "payment", "instagram", "facebook", "youtube"];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if(!isValidOperation){
            return res.status(400).send({ error: "Invalid updates!" });
        }

        const user = await Confectioner.findById(req.params.id);

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
    }catch(e) {
        res.status(400).send(e)
    }
});

//DELETE

router.delete("/confectioners/:id", async (req, res) => {
    try{
        const confectioner = await Confectioner.findById(req.params.id);

        if(!confectioner){
            res.status(400).send({ error: "Confectioner do not finded" });
        }

        await confectioner.deleteOne();

        res.status(200).send(await confectioner.getPublicData())
    }catch(e) {
        res.status(400).send(e)
    }
});

module.exports = router