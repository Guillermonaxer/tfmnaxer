const router = require('express').Router();
const User = require('../models/User');
const cors = require('cors')




// validation
const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
    nombre: Joi.string().min(2).max(255).required(),
    apellido: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    contrasena: Joi.string().min(6).max(1024).required()
})



// constraseña
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const app = require('../../app');


router.post('/register', async (req, res) => {

  res.set('Access-Control-Allow-Origin', 'http://localhost:4200')
// validate user
const { error } = schemaRegister.validate(req.body)
    
if (error) {
  return res.status(400).json(
      {error: error.details[0].message}
  )
}



//validar email único

const isEmailExist = await User.findOne({ email: req.body.email });
if (isEmailExist) {
    return res.status(400).json(
        {error: 'Email ya registrado'}
    )
}


 // hash contraseña
 const salt = await bcrypt.genSalt(10);
 const contrasena = await bcrypt.hash(req.body.contrasena, salt);


  const user = new User({
    
    nombre : req.body.nombre,
    apellido : req.body.apellido,
    email: req.body.email,
    contrasena : contrasena
    
    
    })
    try{
    
    const saveUser = await user.save();
    
    res.json({
        error: null,
        data: saveUser,
      });
    
    
    }catch (error){
        res.status(400).json(error)
        
    }
    
      
    });


  


  
  








module.exports = router;