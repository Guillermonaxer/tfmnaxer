const{ Schema, model} = require('mongoose');

const userSchema = new Schema({
nombre: String,
apellido: String,
email: String,
contrasena: String,
date: {
    type: Date,
    default: Date.now
}

});

module.exports = model('User', userSchema)