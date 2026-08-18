const express = require('express')
const {importProducts,addProduct, updateProduct, deleteProduct} = require('../controllers/adminControllers');
const { getAllProducts, getProductsById } = require('../controllers/productController');
const { verifyToken } = require('../middleware/verifyToken');
const { isAdmin } = require('../middleware/isAdmin');

const adminRoutes = express.Router()

adminRoutes.post('/import', importProducts)
adminRoutes.post('/add',
    verifyToken,
    isAdmin, 
    addProduct);
adminRoutes.put('/update/:id', 
    verifyToken,
    isAdmin, 
    updateProduct);
adminRoutes.delete('/delete/:id', 
    verifyToken,
    isAdmin, 
    deleteProduct);
adminRoutes.get('/fetch', getAllProducts);
adminRoutes.get('/fetch/:id', getProductsById);

module.exports = adminRoutes;