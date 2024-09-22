const express = require("express");
const Category = require("../models/category");
const router = new express.Router();

//GET

router.get("/categories", async (req, res) => {
    try{
        const limit = req.query.limit? +req.query.limit: 10;
    
        const categories = await Category.find({}).skip(+req.query.skip).limit(limit);
        const responce = [];

        for(let i = 0; i < categories.length; i++){
           const category = categories[i]

           responce.push(await category.getPublicData())
        }
        
        res.status(200).send(responce);
    }catch(e){
        res.status(400).send(e);
    }
});

//POST 

router.post("/categories", async (req, res) => {
    try{
        const category = new Category(req.body);

        await category.save()
        
        res.status(200).send(await category.getPublicData());
    }catch(e){
        res.status(400).send(e);
    }
});

module.exports = router