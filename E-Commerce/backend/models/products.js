const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{
        type:String, 
        required:true,
        trim : true
    },
    price:{
        type:Number, 
        required:true,
    },
    image :{
        type :  String,
        required : true,
    },
    description:{
        type:String, 
        required:true
    },
    category:{
        type:String, 
        required:true,
    },
    rating:{
        rate :{
            type:Number, 
            required:true,
        },
        count :{
            type:Number, 
            required:true,
        }
    }
});

module.exports = mongoose.models.Product || mongoose.model("Product",productSchema);