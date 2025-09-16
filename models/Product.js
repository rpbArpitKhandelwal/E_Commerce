const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:{
        type: String ,
        required: true ,
        trim:true
    } ,
    img: {
        type: String ,
        // required: true ,
        trim:true
        //default:
    },
    price:{
        type: Number,
        min:0,
        required: true
    } ,
    desc: {
        type: String, 
        trim: true
    }
})

let Product = mongoose.model('Product' , productSchema);

module.exports =  Product;



