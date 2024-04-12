const express = require('express');
const mongoose = require('mongoose');

const app = express();

// ติดต่อ MongoDB
mongoose.connect('mongodb://localhost:27017/productDB', { useNewUrlParser: true, useUnifiedTopology: true });

// สร้าง Schema และ Model
const productSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    category: String,
    price: Number,
    stock: Number
});

const Product = mongoose.model('Product', productSchema);

// Middleware

// Middleware for validating incoming product data

function validateNumber (res, field, fieldName) {
    if (!field) {
        return res.status(400).send("Bad Request: " + fieldName + " is missing");
    } else {
        if (typeof field != "number") {
            return res.status(400).send("Bad Request: " + fieldName + " must be a number");
        } else {
            if (fieldName == "Stock" && !Number.isInteger(field)) {
                return res.status(400).send("Bad Request: Stock must be an integer");
            }

            if (field < 0) {
                return res.status(400).send("Bad Request: " + fieldName + " can't be less than 0");
            }
        }
    }
}

function validateString (res, field, fieldName) {
    if (!field) {
        return res.status(400).send("Bad Request: " + fieldName + " is missing");
    } else {
        if (typeof field != "string") {
            return res.status(400).send("Bad Request: " + fieldName + " must be a string");
        } else {
            if (field.match(/[\u0E00-\u0E7F\u0E30-\u0E49\u0E4A-\u0E4E\u0E00-\u0E2F\u0E40-\u0E44\u0E47-\u0E4Fa-zA-Z]/)) {
                return
            } else if (field.match(/[0-9]/)) {
                return res.status(400).send("Bad Request: " + fieldName + " can't be only number"); // pending
            } else if (field.match(/['"+-/*@#^?|(){}[\],._=<>%\\]/)) {
                return res.status(400).send("Bad Request: " + fieldName + " can't be only special characters"); // pending
            }
        }
    }
}

const validateProduct = (req, res, next) => {
    const { _id, name, category, price, stock } = req.body;

    if (Object.keys(req.body).length === 0) {
        return res.status(400).send("Bad Request: Request body is empty");
    }

    if (!_id && !name && !category && !price && !stock) {
        return res.status(400).send("Bad Request: All of values are invalid");
    }

    const errId = validateNumber(res, _id, "Id")
    if (errId) {
        return errId
    }

    const errName = validateString(res, name, "Name")
    if (errName) {
        return errName
    }

    const errCategory = validateString(res, category, "Category")
    if (errCategory) {
        return errCategory
    }

    const errPrice = validateNumber(res, price, "Price")
    if (errPrice) {
        return errPrice
    }

    const errStock = validateNumber(res, stock, "Stock")
    if (errStock) {
        return errStock
    }

    next();
};

// Middleware for error handling
const errorHandler = (err, req, res, next) => {
    if (err.code === 11000) {
        res.status(400).send("Bad Request: Duplicated ID");
    } else {
        console.error(err)
        res.status(500).send("Internal Server Error");
    }
    next();
};

// Middleware for logging
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

// Middleware using JSON
app.use(express.json());

// Add product
app.post('/products', validateProduct, async (req, res, next) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).send(savedProduct);
    } catch (error) {
        console.error("Error posting product:", error);
        next(error);
    }
});

// Get Products
app.get('/products', async (req, res, next) => {
    try {
        const products = await Product.find()
        return res.status(200).send(products);
    } catch (error) {
        console.error("Error fetching all products:", error);
        next(error);
    }
});

// Get Product By ID
app.get('/products/:id', async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send("Not Found: Product not found");
        }

        res.status(200).send(product);
    } catch (error) {
        console.error("Error finding product:", error);
        next(error);
    }
});

// Update Product By ID
app.put('/products/:id', validateProduct, async (req, res, next) => {
    const productId = req.params.id;
    const updatedProductData = req.body;

    try {
        const updateResult = await Product.updateOne({ _id: productId }, updatedProductData);

        if (updateResult.modifiedCount === 0 && updateResult.matchedCount === 0) {
            return res.status(404).send("Not Found: Product not found");
        }

        console.log("Updated Successfully");
        return res.status(200).send(updatedProductData);
    } catch (error) {
        console.error("Error updating product:", error);
        next(error)
    }
});

// Delete product
app.delete('/products/:id', async (req, res, next) => {
    const productId = req.params.id;

    try {
        const deletedResult = await Product.deleteOne({ _id: productId });

        if (deletedResult.deletedCount === 0) {
            return res.status(404).send("Not Found: Product not found");
        }

        console.log("Deleted Successfully");
        return res.status(200).send("Deleted successfully");
    } catch (error) {
        console.error("Error deleting product:", error);
        next(error)
    }
});

// Error handling middleware
app.use(errorHandler);

// Run server at port 3000
if (process.env.NODE_ENV !== 'test') {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}

module.exports = app