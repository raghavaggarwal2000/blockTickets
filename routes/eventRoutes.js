const express = require('express');
const routes = express.Router();
const fs = require('fs');
const path = require('path');

const multer = require('multer');
const {requireAuth} = require('../middleware/authMiddleware');
const Event = require('../models/event');
const eventControllers = require('../controllers/eventControllers');

routes.get('/event_details/:id', eventControllers.event_details_get);
routes.get('/event_details/buy/:id', eventControllers.event_buy_get);



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null,'./public/uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().getTime()  + file.originalname);
    }
  });
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 20
    },
    fileFilter: fileFilter
  });
  
routes.get('/add_event', requireAuth,(req,res) =>{
    res.render('add_event',{title : 'Add Event'});
});


routes.post('/add_event', upload.single('img'), async (req, res) =>{
    const { name, date, time, price, tickets, location, description, introduction} = req.body;
    console.log(req.body);
    const img = req.file.filename;
    try{
        const event = await Event.create({name, introduction, date, time, price, tickets, location, description, image_name: img,image:{
            data: fs.readFileSync(path.join(appRoot + '/public/uploads/' + img)),
            contentType: 'image/png'
        }});
        res.redirect('/');
    }
    catch(err){
        console.log(err);
        res.send(err);
    }

});

module.exports = routes;