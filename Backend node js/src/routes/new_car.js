const router = require("express").Router();
const app = require("../../app");
const Car = require("../models/Cars");
const User = require('../models/User');
var multer = require('multer');
//var upload = multer();

//router.use(upload.array()

//validation
const Joi = require('@hapi/joi');


const schemaCar = Joi.object({
    marca: Joi.string().min(1).max(255).required(),
    modelo: Joi.string().min(1).max(255).required(),
    precio: Joi.number().required(),
    maletero: Joi.number().required(),
    km: Joi.number().required(),
    potencia: Joi.number().required(),
    cilindrada: Joi.number().required(),
    consumourbano: Joi.number().required(),
    consumoextraurbano: Joi.number().required(),
    traccion: Joi.string().min(1).max(255).required(),
    
  
})


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('imagen'), async (req, res)  => {

// validate user
const { error } = schemaCar.validate(req.body)
    
if (error) {
  return res.status(400).json(
      {error: error.details[0].message}
  )
}
  

  const car = new Car({
    
    marca: req.body.marca,
    modelo: req.body.modelo,
    precio: req.body.precio,
    maletero: req.body.maletero,
    km: req.body.km,
    potencia: req.body.potencia,
    cilindrada: req.body.cilindrada,
    consumourbano: req.body.consumourbano,
    consumoextraurbano: req.body.consumoextraurbano,
    traccion: req.body.traccion,
    imagen: {
      data: req.file.buffer,
      contentType: req.file.mimetype
    }
    

  });




  try {
    const saveCar = await car.save();

    res.json({
      error: null,
      data: saveCar,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});


module.exports = router;
