const mongoose = require('mongoose');

const Product = require('./models/Product');

const products = [
    {
        name:"Iphone",
        img:"https://images.unsplash.com/photo-1726828537956-61ae115d7d7a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXBob25lJTIwMTZ8ZW58MHx8MHx8fDA%3D",
        price:120000,
        desc:"very costly"
    },
    {
        name:"macbook",
        img:"https://images.unsplash.com/photo-1526570207772-784d36084510?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hY2Jvb2t8ZW58MHx8MHx8fDA%3D",
        price:250000,
        desc:"very costly, aukaat ke bahar."
    }

]

async function seedDB(){
    await Product.insertMany(products);
    console.log("data seeded successfully.")
}

module.exports = seedDB;