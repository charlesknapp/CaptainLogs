// ENVIRONMENT INITIALIZATION INFO //
const PORT = 3000;
require('dotenv').config();
const mongoose = require('mongoose');
const express = require("express")
const app = express()
const Logs  = require("./models/logs")
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
    //find all logs
    Logs.find({}, (error, allLogs)=>{
      res.render('Index', {
        Logs: allLogs
      })
    }) 
  });

// NEW ROUTING //
app.get("/new", (req, res) => {
    res.render('New')
});

// POST ROUTING //
app.post('/logs', (req, res) => {
    Logs.create(req.body, (error, createdLogs) => {
        res.redirect("/");
    });
})

// SHOW ROUTING //
app.get( '/logs/:id', (req, res) => {
    Logs.findById(req.params.id, (err, foundLogs) => {
        res.render('Show', {
            Logs: foundLogs
        })
    })
});

// EDITING ROUTING //
app.get('/logs/:id/edit', (req, res)=> {
    // finding Logs by ID
    // render an edit form
    // pass in the Logs data "payload"
    Logs.findById(req.params.id, (err, foundLogs) => {
        res.render('Edit', {
            Logs: foundLogs
        })
    })
})
// UPDATE ROUTING //
app.put('/logs/:id', (req, res) => {
    // find the Logs by ID and update
    // redirect to the Logs's show page
    Logs.findByIdAndUpdate(req.params.id, req.body, (err, updatedLogs) => {
        console.log(updatedLogs)
        res.redirect(`/logs/${req.params.id}`)
    })
})

// DELETE ROUTING //
app.delete('/logs/:id', (req, res)=>{
    Logs.findByIdAndRemove(req.params.id, (err, deletedLogs) => {
        res.redirect('/')
    })
});

// APP LISTENING PORT //
app.listen( 3000, () => {
    console.log("listening")
});