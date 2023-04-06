const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    introduction:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },  
    time:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    tickets:{
        type: Number,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image_name:{
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    }

});

const Event = mongoose.model('events',eventSchema);

module.exports = Event;