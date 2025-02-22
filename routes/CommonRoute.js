const express = require('express');
const Meal    = require('./controllers/Meal');
const router  = express.Router();
//Imported controllers
const getc       = require('./controllers/getController');
const postc      = require('./controllers/postController');
const supriyo    = require('./controllers/supriyo');
const debongshi  = require('./controllers/debongshi');
const walyvai    = require('./controllers/walyvai');
const mahmudvai  = require('./controllers/mahmudvai');
//
router.get('/',getc);
router.get('/info',async(req,res)=>{
    const data = await Meal.find();
    res.json({data : data});
})
// puts
router.put('/supriyo',supriyo);
router.put('/debongshi',debongshi);
router.put('/mahmudvai',mahmudvai);
router.put('/walyvai',walyvai);
router.post('/',postc);
module.exports = router;