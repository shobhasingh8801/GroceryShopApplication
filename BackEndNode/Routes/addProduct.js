const express = require('express');
const router = express.Router();        //This creates a new router object -- It's ideal for large apps to keep routes clean, maintainable, and separated  

const mongoose = require('mongoose');

/* some required node modules*/
const path = require('path');     //To handle paths we needed path module of NODE js
const fs = require('fs');        //File System -- To handle files related operation we are using file module of NOde JS
/*ends*/

const Product = require('../models/Product');       //User define model/schema for products collection 

// Configure storage
const multer = require('multer');   //for File upload -- Multer is a Node.js middleware for handling multipart/form-data, which is primarily used for uploading files (like images, PDFs, etc.) through HTML forms
const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
        const targetDir = path.join(__dirname, '..', 'uploads');
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        cb(null, targetDir); // Make sure this folder exists  --  cb is the callback Multer expects -- null indicates no error
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
    const { category, name, qty, price } = req.body;
    const imageFile = req.file;

    if (!category || !name || qty == null || price == null || !imageFile) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    if (typeof name !== 'string' || typeof category !== 'string') {
        return res.status(400).json({ message: 'Invalid data types for category or name.' });
    }

    try {
        const targetDir = path.join(__dirname, '..', 'uploads', category);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        const oldPath = imageFile.path;
        const newPath = path.join(targetDir, imageFile.filename);
        fs.renameSync(oldPath, newPath);

        const image = imageFile.filename;                //path.join(category, imageFile.filename);                // store relative path
        const product = new Product({ category, name, qty, price, image });
        await product.save();
        res.status(201).json({
            message: 'Product added successfully!',
        });
    } catch (err) {
        console.error('Error saving product:', err);

        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ message: 'Validation Error', errors: messages });
        }

        if (err.code === 11000) {
            return res.status(409).json({ message: 'This Product already exists!' });
        }

        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;