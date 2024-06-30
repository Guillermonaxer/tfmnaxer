const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()

const app = express();
const cors = require('cors')
// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

// Conexión a Base de datos

const uri = `mongodb://127.0.0.1/tfm`;
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))
// import routes

const authRoutes = require('./src/routes/auth');
const dashboadRoutes = require('./src/routes/dashboard');
const newcarRoutes = require('./src/routes/new_car');
const list_carsRoutes = require('./src/routes/list_cars');
const loginRoutes = require('./src/routes/login');
const verifyToken = require('./src/routes/validate-token');


// route middlewares
app.use('/api/dashboard', verifyToken, dashboadRoutes);

app.use('/api/user',verifyToken, authRoutes);
app.use('/api/newcar', newcarRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/list_cars', list_carsRoutes);


  
// iniciar server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})