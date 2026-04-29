require("dotenv").config({ path: "./backend/config/config.env" });

const express = require('express');
const cloudinary = require('cloudinary');
const app = require('./backend/app');
const connectDatabase = require('./backend/config/database');

const PORT = process.env.PORT || 4000;

process.on('uncaughtException', (err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
});

connectDatabase();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get('/', (req, res) => {
    res.send('API is running 🚀');
});

const server = app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});

process.on('unhandledRejection', (err) => {
    console.error(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});