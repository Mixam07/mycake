const express = require("express");
require("./db/mongoose");
require('dotenv').config();
const cakeRouter = require("./routers/cake");
const postRouter = require("./routers/post");
const categoryRouter = require("./routers/category");
const confectionersRouter = require("./routers/confectioner");
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

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
});