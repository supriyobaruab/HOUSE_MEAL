const Meal     = require('./Meal');
const postController = async(req,res)=>{
    try{
        const meal = new Meal(req.body);
        const data = await meal.save();
        res.status(200).json(
            {
                'message' : 'Inserted successfully',
                'data'    : data,
            });
    }catch(err){
        console.log(err.message);
        res.status(500).json({'error' : err.message});
    }
}
module.exports = postController;