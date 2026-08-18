const Product = require('../models/products');

const getAllProducts = async(req,res)=>{
    const {category,title} = req.query;
    let query = {};
    try {
        let products = []

        if(category){
            query.category = category
        }if(title){
                query.title = {
                    $regex:title,
                    $options:'i'
                }
        }
        products = await Product.find(query)

       if(products.length ===0){
        return res.status(404).send({
            success : false,
            message:"No Products Found , To Show"
        })
       }

       res.send({
            success:true,
            no_of_Products : products.length,
            products
       })

    } catch (err) {
        res.send({ success : false, message : err.message})
    }
};


const getProductsById = async(req,res)=>{
    try {
        const id = req.params.id;

        const product = await Product.findById(id);
        console.log(product);
        
        
        res.status(200).send({
            success:true,
            product
        })
    } catch (error) {
        res.status(500).send({
            success : false,
            message:error.message
        })
    }
}
module.exports= {
    getAllProducts,
    getProductsById
};