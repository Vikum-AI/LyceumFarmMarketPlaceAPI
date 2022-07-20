const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const dataSchema = new Schema({

    // _id: {
    //     type: Object, 
    //     required: true
    // },

    product_id: {
        type: Number, 
        required: false
    }, 

    product_name: {
        type: String, 
        required: true
    }, 

    product_price: {
        type: Number, 
        required: true
    }, 

    image_link : {
        type: String, 
        required: true
    }, 

    available: {
        type: Boolean, 
        required: true
    }, 

    keywords: {
        type: Array, 
        required: false
    }    

})

const Data = mongoose.model('data_vegetable', dataSchema)
module.exports = Data; 
