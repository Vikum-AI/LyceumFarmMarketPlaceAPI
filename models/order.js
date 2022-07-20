const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const dataSchema = new Schema({

    token: {
        type: String, 
        required: true
    },

    items: {
        type: Object,
        required: true
    }, 

    isActive: {
        type: Boolean, 
        required: true
    }, 
    
    time: {
        type: String,
        required: true
    }

})

const Orders = mongoose.model('data_orders', dataSchema)
module.exports = Orders; 
