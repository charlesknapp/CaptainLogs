// ENVIRONMENT INITIALIZATION INFO //
const PORT = 3000;
require('dotenv').config();
const mongoose = require('mongoose');
const express = require("express")
const app = express()
const logs  = require("./models/logs")
const bodyParser = require('body-parser')

//include the method-override package place this where you instructor places it
const methodOverride = require('method-override');
//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'));

app.engine('jsx', require('express-react-views').createEngine())
app.set('view engine', 'jsx')
app.use(express.static('styles'))

// Needed to use req.body
app.use(express.urlencoded({ extended: false }))

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
})

// INDEX ROUTING //
app.get("/", (req, res) => {
    res.send('Index Route')
  });

// NEW ROUTING //
app.get("/logs/new", (req, res) => {
    res.render('New')
});

// CREATE ROUTING //
app.post('/logs', (req, res) => {
    logs.create(req.body, (error, createdLogs) => {
        res.send(req.body)
    });
})

// APP LISTENING PORT //
app.listen( 3000, () => {
    console.log("listening")
});