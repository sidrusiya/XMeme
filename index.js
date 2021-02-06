// load the things we need
var express = require('express');
var mongoose = require('mongoose');
var app = express();

//set view engine ejs
app.set('view engine', 'ejs');

// Database connection through mongoose
mongoose.connect('mongodb+srv://sidrusiya:Sidrusiya1@sid.nve8f.mongodb.net/Meme?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

//import memerouter
const MemeRouter = require('./routes/MemeRouter');

//use that route
app.use('/memes', MemeRouter);

app.get('/',(req, res)=>{
    res.redirect('/memes');
})

app.listen(8080);
console.log('8080 is the magic port');