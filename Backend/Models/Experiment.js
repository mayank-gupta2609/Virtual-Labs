const mongoose = require('mongoose');
const { Schema } = mongoose;

const expSchema = new Schema({
    title:{
        type: 'string',
        required: true,
        unique: true
    }, 
    description:{
        type: 'string',
        required: true
    },
    section:{
        type: 'string',
        required: true
    },
    redirectURL:{
        type: 'string',
        required: true
    }
})

const Exp = mongoose.model('experiment', expSchema);
module.exports = Exp;