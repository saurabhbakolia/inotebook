const connectMongo = require('./db');
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

/* ---------------------------- Available Routes ---------------------------- */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));





/* --------------------------------- Server Connect--------------------------------- */
app.listen(port, ()=>{
    console.log("listening on port " + port);
});
connectMongo();