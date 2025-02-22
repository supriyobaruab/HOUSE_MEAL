const Meal     = require('./Meal');
const getController = async(req,res)=>{
    try{
        const data = await Meal.find();
        res.render("index");
        // res.status(200).json(
        //     {
        //         'message' : 'Found',
        //         'data'    : data,
        //     });
    }catch(err){
        console.log(err.message);
        res.status(500).json({'error' : err.message});
    }
}
module.exports = getController;