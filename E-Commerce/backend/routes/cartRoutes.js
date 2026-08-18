const {addToCart,getCartItems} = require('../controllers/cartControllers')
const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');

const cartRouter = express.Router();
cartRouter.post("/",verifyToken, addToCart);
cartRouter.get("/",verifyToken, getCartItems);
module.exports = cartRouter;