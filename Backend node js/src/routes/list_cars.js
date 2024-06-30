const router = require("express").Router();
const Car = require('../models/Cars');
const db = require('../models/Cars');


router.get('/', async (req, res, next) => {
  try {
    const allcars = await Car.find({});
    res.json(allcars);
  } catch (error) {
    next(error);
  }
});

router.get('/flutter', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars.map(car => ({
      marca: car.marca,
      modelo: car.modelo,
      precio: car.precio,
      maletero: car.maletero,
      km: car.km,
      potencia: car.potencia,
      cilindrada: car.cilindrada,
      consumourbano: car.consumourbano,
      consumoextraurbano: car.consumoextraurbano,
      traccion: car.traccion,
      imagen: car.imagen ? car.imagen.data.toString('base64') : null
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/imagen/:id', async (req, res) => {
 
   let id = req.params.id
   
   Car.findById(id).then((rpta) => {
   

  


    res.set('Content-Type', rpta.imagen.contentType);
    return res.send(rpta.imagen.data);


      }).catch((err) => {
        res.json({
          err : err
      });
      });
    })



router.delete('/delete/:id', async (req, res, next) => {
  try {
    console.log(req.params.id);
    const allcars = await Car.deleteOne({_id:req.params.id});
    res.json(allcars);
  } catch (error) {
    next(error);
  }
});




module.exports = router;