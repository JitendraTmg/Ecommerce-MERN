import express from 'express';
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
} from '../controllers/productController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// router.post('/', createProduct);
router.get('/getAllProducts', getAllProducts);
router.get('/:id', getProductById);
// router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);



router.post('/', upload.single('productImage'), createProduct);

router.put('/:id', upload.single('productImage'), updateProduct);



export default router;