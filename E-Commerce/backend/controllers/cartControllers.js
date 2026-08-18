const Cart = require('../models/Cart');
const Product = require('../models/Products');

const addToCart = async (req, res) => {

        console.log(req.user);
    try {

        const { productId } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Product not found"
            });
        };
        console.log("Product Found");

        const existingItem = await Cart.findOne({ productId, userId:req.user.id });

        if (existingItem) {

            existingItem.quantity += 1;

            await existingItem.save();

            return res.status(200).send({
                success: true,
                message: "Cart quantity updated",
                cart: existingItem
            });
        }
        console.log("New Item Creating")
        console.log(productId);
        const cartItem = await Cart.create({
            userId : req.user.id,
            productId,
            quantity: 1
        });
        console.log("New Item Created");

        return res.status(201).send({
            success: true,
            message: "Product added to cart",
            cart: cartItem
        });

    } catch (error) {
        console.log(error.message)

        return res.status(500).send({
            success: false,
            message: error.message
        });

    }
};

const getCartItems = async (req, res) => {

    try{
        
        const cartItems = await Cart.find({userId:req.user.id}).populate('productId');

        res.status(200).send({
            success:true,
            message:"Data found",
            cartItems
        })

    }catch(error){
        res.status(500).send({
            success:false,
            message:error.message,
        })
    }

}

module.exports = {
    addToCart,
    getCartItems
};