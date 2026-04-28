import Product from '../models/productModel.js';

// Create Product
export const createProduct = async (req, res) => {
    try {
        // const { productName, productImage, productPrice, productDescription, category, rating } = req.body;
        const { productName, productPrice, productDescription, category, rating } = req.body;
        const productImage = req.file ? req.file.path : null;

        if (!productName || !productImage || !productPrice || !productDescription || !category) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const newProduct = new Product({ productName, productImage, productPrice, productDescription, category, rating });
        await newProduct.save();

        return res.status(201).json({ success: true, message: 'Product created successfully', product: newProduct });

    } catch (error) {
        console.error('Error in createProduct:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get All Products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({ success: true, products });

    } catch (error) {
        console.error('Error in getAllProducts:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get Single Product
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        return res.status(200).json({ success: true, product });

    } catch (error) {
        console.error('Error in getProductById:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update Product
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        return res.status(200).json({ success: true, message: 'Product updated successfully', product });

    } catch (error) {
        console.error('Error in updateProduct:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Delete Product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        return res.status(200).json({ success: true, message: 'Product deleted successfully' });

    } catch (error) {
        console.error('Error in deleteProduct:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};