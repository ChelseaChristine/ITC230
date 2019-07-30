const mongoose = require('mongoose');
const credentials = require('../lib/credentials');

mongoose.connect(credentials.connectionString, { dbName: 'TestDB', useNewUrlParser: true }); 

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});


// values indicate the data type of each key
const mySchema = mongoose.Schema({
 animal: String,
 name: { type: String, required: true },
 age: String
}, {collection: 'Animals'}); 
mongoose.set('useFindAndModify', false);

module.exports = mongoose.model('Animal', mySchema);