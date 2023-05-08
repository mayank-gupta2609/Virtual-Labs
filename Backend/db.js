const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const mongoURI = 'mongodb://localhost:27017/vlabsDB?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'

const connectToMongo = () => {
     mongoose.connect(mongoURI) 
}

module.exports = connectToMongo