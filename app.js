const express =require ("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const productRoutes = require('./routes/product');
const mongoURL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/ShoppingArpitApp';

mongoose.connect(mongoURL)
.then(()=>{
    console.log("DB connected");
})
.catch((err)=>{
    console.log("DB error");
    console.log(err);
});


app.set('view engine' , 'ejs')  
app.set('views', path.join(__dirname, 'views'))

//public folder
app.use(express.static(path.join(__dirname , 'public')));

//seeding databse
seedDB();

app.use(productRoutes);//so that har incoming request ke saath chalna chaiye.


app.listen(8080 , ()=> {
    console.log("Server is connected at port 8080")
});


