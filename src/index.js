const express = require("express");
require("./db/mongoose");
const cakeRouter = require("./routers/cake");
const postRouter = require("./routers/post");
const categoryRouter = require("./routers/category");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cakeRouter);
app.use(postRouter);
app.use(categoryRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
});