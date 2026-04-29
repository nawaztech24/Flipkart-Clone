const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('./middlewares/error');
const cors = require("cors");

const app = express();


app.set("trust proxy", 1);

// ENV (local dev)
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: 'backend/config/config.env' });
}

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


app.use(cors({
    origin: true,
    credentials: true
}));

// Routes
const user = require('./routes/userRoute');
const product = require('./routes/productRoute');
const order = require('./routes/orderRoute');

app.use('/api/v1', user);
app.use('/api/v1', product);
app.use('/api/v1', order);

// Error Middleware
app.use(errorMiddleware);

module.exports = app;