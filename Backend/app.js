const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const connectDB = require('./db');
const userRoutes = require('./modules/routes/user.routes')
const driverRoutes = require('./modules/routes/driver.routes')

connectDB();


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.get('/', (req, res) => {res.send('Hello World!')});
app.use('/users',userRoutes)
app.use('/drivers',driverRoutes)

module.exports = app;

