const router = require('express').Router();
const User = require('../models/User');


const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser'); 
const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    contrasena: Joi.string().min(6).max(1024).required()
})
const schemaRegister = Joi.object({
  nombre: Joi.string().min(2).max(255).required(),
  apellido: Joi.string().min(2).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  contrasena: Joi.string().min(6).max(1024).required()
})
router.use(bodyParser.json()); 

router.post('/register', async (req, res) => {

  res.set('Access-Control-Allow-Origin', 'http://localhost:4200')
// validate user
const { error } = schemaRegister.validate(req.body)
    
if (error) {
  return res.status(400).json(
      {error: error.details[0].message}
  )
}//validar email único

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
    
      
    })


router.post('/login', async (req, res) => {
    
 
  
  // validaciones
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(req.body.contrasena, user.contrasena);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })
    
    

 // create token
 const token = jwt.sign({
  name: user.name,
  id: user._id
}, process.env.TOKEN_SECRET)

res.json({
error: null,
data: 'exito bienvenido',
token: token
})


})

module.exports = router



