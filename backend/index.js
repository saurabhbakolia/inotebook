const connectMongo = require('./db');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Hello John, this is my first mern stack application!");
});

app.listen(port, ()=>{
    console.log("listening on port " + port);
});
connectMongo();