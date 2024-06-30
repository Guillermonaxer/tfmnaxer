const mongoose = require('mongoose');


async function connect() {
await mongoose.connect('mongodb://127.0.0.1/tfm',{
useNewUrlParser: true

})

console.log('Database Connected');


}; 

module.exports = {connect};

