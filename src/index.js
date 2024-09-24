const express = require("express");
require("./db/mongoose");
require('dotenv').config();
const cakeRouter = require("./routers/cake");
const postRouter = require("./routers/post");
const categoryRouter = require("./routers/category");
const confectionersRouter = require("./routers/confectioner");
const buyersRouter = require("./routers/buyer");
const Confectioner = require("./models/confectioner");
const Buyer = require("./models/buyer");
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use(cakeRouter);
app.use(postRouter);
app.use(categoryRouter);
app.use(confectionersRouter);
app.use(buyersRouter);

app.get("/getAuth", async (req, res) => {
    try{
        if(!req.cookies.userId){
            res.status(400).send({})
        }

        const maybeConfectioner = await Confectioner.findById(req.cookies.userId);
        const maybeBuyer = await Buyer.findById(req.cookies.userId);
        const user = maybeConfectioner || maybeBuyer;

        if(!user){
            res.status(400).send({})
        }

        res.status(200).send(await user.getPublicData())
    }catch(e) {
        res.status(400).send(e)
    }
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
});