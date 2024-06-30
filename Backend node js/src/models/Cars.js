const{ Schema, model} = require('mongoose');

const carSchema = new Schema({
marca: String,
modelo: String,
precio: Number,
maletero: Number,
km: Number,
potencia: Number,
cilindrada: Number,
consumourbano: Number,
consumoextraurbano : Number,
traccion: String,

imagen:{
    data:Buffer,
    contentType: String,
},

date: {
    type: Date,
    default: Date.now
}

});




module.exports = model('Car', carSchema)