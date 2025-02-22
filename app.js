// Dependencies
const express  = require('express');
const mongoose = require('mongoose');
const dotenv   = require('dotenv');
// Import
const errorHandler = require('./handlers/errorHandler');
const commonRoute  = require('./routes/CommonRoute');
// Creating the app 
const app = express();
// Uses
app.use(express.json());
dotenv.config();
// Database configure
const Database = async()=>{
    try{
    await mongoose.connect(process.env.MONGODB_SERVER);
    console.log("Database connected");
    }catch(err){
        console.log(err.message);
    }
}
Database();
//Routes
app.use('/',commonRoute);
app.set('view engine','ejs');
// Static folder
const path = require('path')
app.use(express.static(path.join(__dirname,"/public")));
//Error handlers
app.use(errorHandler);
//Server start
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
});