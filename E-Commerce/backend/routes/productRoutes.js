const express = require('express')
const {getAllProducts, getProductsById} = require('../controllers/productController');

const productsRoute = express.Router();
productsRoute.get('/',getAllProducts);
productsRoute.get('/:id' , getProductsById)

module.exports= productsRoute;