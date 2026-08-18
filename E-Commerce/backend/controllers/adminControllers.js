const axios = require('axios')
const Product = require('../models/products');
const products = require('../models/products');


const importProducts = async ( req, res) => {
    try {
        
        const response = await axios.get('https://fakestoreapi.com/products');
        const products = response.data;

        const productCount = await Product.countDocuments();
        console.log(productCount);

        if(productCount>0){
            return res.status(201).send({
                 success:true,
                message:`Products Already Exists`
                })
        };

        await Product.insertMany(products);
        res.status(201).send({
            success:true,
            message:`${products.length} products inserted`
        })

    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Data not inserted"
        })
    }
};

const addProduct = async(req,res)=>{
    const {title , price , description , category , rate , count , image} = req.body;
    console.log(title, price , description,category, rate,count, image);
    
    try {
        if(!title || !price || !description || !category || !rate || !count || !image){
            return res.send({
                success:false ,
                message : "All Fields Are Required"
            })
        };

        const product = await products.create({
            title ,
            price,
            description, 
            category,
            image, 
            rating:{
                rate , 
                count
            }
        });
        
        return res.status(201).send({
            success : true,
            message : "New Product Added"
        })

    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            success:false,
            message : err.message
        })
        
    }
};

const updateProduct = async(req,res)=>{
      try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).send({
                success:false,
                message : "Product Not Found"
            })
        }

        const {title , price , description , category , rate , count , image} = req.body;

        product.title = title ;
        product.price = price ;
        product.description = description ;
        product.category = category ;
        product.rating.rate = rate ;
        product.rating.count = count ;
        product.image = image ;

        await product.save();

        return res.status(200).send({
                success:true,
                message : "Product Updated"
            })
      } catch (err) {
         res.status(500).send({
            success:false,
            message : err.message
        })
      }
};


const deleteProduct = async(req,res)=>{
    try {
        const id = req.params.id;
        console.log(id);
        
        const product = await Product.findByIdAndDelete(id);
        console.log(product);

        if(!product){
            return res.status(404).send({
                success:false,
                message : "Product Not Found"
            })
        };

        return res.status(200).send({
            success:true,
            message : "Product Deleted SuccessFully",
         })


        
    } catch (err) {
        res.status(500).send({
            success:false,
            message : err.message
        })
    }
}


module.exports = {
    importProducts,
    addProduct,
    updateProduct,
    deleteProduct,
}