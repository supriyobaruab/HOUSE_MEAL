function errorHandler(err,req,res,next){
    console.log(err.message);
}
module.exports = errorHandler;