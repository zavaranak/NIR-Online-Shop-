const mongoose = require('mongoose');
async function connect(URI){
  try {mongoose.connect(URI)
   .then(() => console.log('Connected!', URI));}
  catch(err){console.log('Failed to connect to dataBase')}
}

module.exports = {connect}; //Export a class with function connect()