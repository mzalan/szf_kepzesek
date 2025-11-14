const express = require("express");
require("dotenv").config(); // A .env fájlt olvassa
const trainingsRoutes = require('./routes/trainings.routes')
const mongoose = require("mongoose");
const qs = require('qs');
mongoose.set("strictQuery", true);
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", () => {
    console.log(`Database Connected ${database.host}`);
});
const app = express()
app.use(express.json())
app.set('query parser', str => qs.parse(str));

app.use('/api/trainings', trainingsRoutes)

app.listen(3000, ()=>{
    console.log('Server started')
})