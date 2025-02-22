const Meal     = require('./Meal');
const fs       = require('fs');
const path = require('path');
const supriyo = async(req,res)=>{
    try{
    //save in the local storage
    const logEntry = `Name : "Supriyo",   Date: ${req.body.date}, Daily Meals: ${req.body.daily_count}, Total Meals: ${req.body.total_count}\n`;
    const logFilePath = path.resolve(__dirname, '../../public/logs/logs.txt');
    fs.appendFileSync(logFilePath,logEntry);
    //
    await Meal.updateOne(
        {name : "Supriyo"},
        {$set :{
            total_count : req.body.total_count,
            date : req.body.date,
            }},
    res.status(200).json({'message' : 'Updated'}));
    }catch(err){
        res.status(500).json({'error' : err.message});
    }
}
module.exports = supriyo;