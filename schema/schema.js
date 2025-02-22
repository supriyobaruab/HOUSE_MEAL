const mongoose = require('mongoose');
const schema   = new mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    daily_count :{
        type : Number,
        required : true,
    },
    total_count :{
        type : Number,
        required : true,
    },
    date : {
        type : String,
        default : Date.now(),
    }
});
module.exports = schema;