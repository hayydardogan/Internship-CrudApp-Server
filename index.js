require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL
var bodyParser = require('body-parser');
var cors = require('cors')
const port = 3000;
const app = express();

const routes = require('./Routes/route');

mongoose.connect(mongoString);
const database = mongoose.connection;


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

database.on('error', (error) => {
    console.log(error)
})
    ;
database.once('connected', () => {
    console.log('Database Connected');
});

app.listen(port, () => {
    console.log(`Server Started at port`, port)
});

app.options('*', cors());
app.use('/api', routes); 
app.use(cors());