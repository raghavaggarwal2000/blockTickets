const mongoose = require('mongoose');
const Event = require('../models/event');


const event_details_get = (req,res) =>{
    const id = req.params.id;

    Event.findById(id) 
    .then(result =>{
        res.render('event_details',{title: 'Event Details', result})
    })
    .catch(err => res.send(err));
};

const event_buy_get = (req,res) =>{
    const id = req.params.id;

    Event.findById(id) 
    .then(result =>{
        res.render('purchase',{title: 'Purcharse', result})
    })
    .catch(err => res.send(err));
};

module.exports = {
    event_details_get,
    event_buy_get
}