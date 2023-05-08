const mongoose = require('mongoose');
const { Schema } = mongoose;

const expDetailsSchema = new Schema({
    title:{
        type: 'string',
        required: true,
        unique: true
    }, 
    theory:{
        type: ['string'],
        required: true
    },
    objective:{
        type: ['string'],
        required: true
    },
    procedure :{
        type: ['string']
    },
    simulation:{
        type: 'boolean',
        required: true
    },
    eId:{
        type:  mongoose.Schema.Types.ObjectId,
        ref:'experiment'
    }
})

const ExpD = mongoose.model('experimentdetails', expDetailsSchema);
module.exports = ExpD;