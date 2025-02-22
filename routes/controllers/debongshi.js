const Meal     = require('./Meal');
const fs       = require('fs');
const path = require('path');
const debonghsi = async(req,res)=>{
    try{
    // Save in local file
    const logEntry = `Name : "Debongshi", Date: ${req.body.date}, Daily Meals: ${req.body.daily_count}, Total Meals: ${req.body.total_count}\n`;
    const logFilePath = path.resolve(__dirname, '../../public/logs/logs.txt');
    fs.appendFileSync(logFilePath,logEntry);
    //
    await Meal.updateOne(
        {name : "Debongshi"},
        {$set :{
            total_count : req.body.total_count,
            date : req.body.date,
            }},
    res.status(200).json({'message' : 'Updated'}),
    )
    }catch(err){
        res.status(500).json({'error' : 'err.message' });
    }
}
module.exports = debonghsi;