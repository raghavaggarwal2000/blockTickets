const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Event = require('./models/event');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const {checkUser, requireAuth} = require('./middleware/authMiddleware');
const eventRoutes = require('./routes/eventRoutes');
var path = require('path');
global.appRoot = path.resolve(__dirname);


const app = express();
const port = process.env.PORT || 5000;
const dbURL = 'mongodb+srv://clg-project:test1234@clg-project.xksl3.mongodb.net/blockTickets?retryWrites=true&w=majority';

// used to connect to database, and objects are written to remove depreciation warnings
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology:true})
.then(() => {
    console.log("connected to db");
    // localhost link is: localhost:3000/
    app.listen(port);

})
.catch((err)=> console.log("Error at connecting to DB " + err));

app.set('view engine','ejs');
// This is used so that front end can access images or css files from public folder
app.use(express.static("public"));

app.use(bodyParser.json()); // to support JSON bodies
app.use(express.urlencoded({extended: true}));

//middleware(create cookies)
app.use(cookieParser());

app.get('*', checkUser);

app.get('/', (req,res) =>{
    Event.find()
    .then(result =>{
        res.render('index', {title: 'Home', events: result, count : 0});
    })
    .catch(err=> console.log('home page err' + err));
});

app.use(userRoutes);
app.use(eventRoutes);