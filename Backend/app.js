const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const userRoutes = require('./modules/routes/user.routes')

connectDB();


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {res.send('Hello World!')});
app.use('/users',userRoutes)

module.exports = app;

