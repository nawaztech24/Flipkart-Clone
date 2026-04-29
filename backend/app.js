const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('./middlewares/error');
const cors = require("cors"); 

const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: 'backend/config/config.env' });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

const user = require('./routes/userRoute');
const product = require('./routes/productRoute');
const order = require('./routes/orderRoute');

app.use('/api/v1', user);
app.use('/api/v1', product);
app.use('/api/v1', order);

app.use(errorMiddleware);

module.exports = app;