// Add Dependices needed
const express = require('express');
const bodyParser = require('body-parser');
var MemeModel = require('../Memedb.js');
const MemeRouter = express.Router();

// Use json and other stuffs
MemeRouter.use(express.json());
MemeRouter.use(bodyParser.json()); 
MemeRouter.use(express.static('../views/frontend')); 
MemeRouter.use(bodyParser.urlencoded({ 
    extended: true
}));


// GET AND POST REQUEST FOR '/'
MemeRouter.route('/')
.get(async (req, res) => {
    //Finding 100 latest memes
    await MemeModel
    .find({ }).sort('-uAt').limit(100)
    .then(doc => {
      if(doc.length==0)
      {
        res.status(404).send('<h1> Meme Not Found</h1>');
      }
      else{
      res.render('frontend/home',{
        mascots: doc
      })
      }
    })
    .catch(err => {
      console.error(err)
      res.end();
    })
  })
  .post( async (req, res) => {
    //Check for Duplicate
    if(await MemeModel.find({Memer : req.body.Memer, caption : req.body.caption,url : req.body.url}).countDocuments()==0){
      // Create a JSON Object contains all things
      let msg = await new MemeModel({
      Memer: req.body.Memer,
      caption: req.body.caption,
      url: req.body.url,
      id: ((await MemeModel.find({}).countDocuments())+1),
      uAt: Date.now()
    });
    // ADD MESSAGE TO DB
    msg.save()
    .then(doc => {
     var toKeep = ['id']; 
 
     console.log(JSON.stringify(
       doc,
       (key, value) => !key || toKeep.indexOf(key) > -1 ? value : undefined,
     ));
    })
    .catch(err => console.log(err))
    return res.redirect('/memes');
   }
   else{
     res.status(409).send('<h1>Duplicate Meme</h1>');
   }
 })
  
// GET AND POST REQUEST FOR '/:id' 
MemeRouter.route('/:id')
.get(async (req,res)=>{
      await MemeModel
      .find({
        id : req.params.id
      })
      .then(doc =>{
        if(doc.length==0)
        {
          res.status(404).send('<h1> Meme Not Found</h1>');
        }
        else{
        res.render('frontend/page',{
          id: req.params.id,
          mascots: doc
        })
        }
      })
      .catch(err => {
        console.log(err);
        res.end();
      })
  })
  .post(async (req, res)=> {
    //update the json object of DB
    await MemeModel
    .findOneAndUpdate(
      {
        id: req.params.id  // search query
      }, 
      {
        caption: req.body.caption ,  // field:values to update
        url: req.body.url,
        uAt: Date.now()
      },
      {
        new: true,                       // return updated doc
      })
    .then(doc => {
      var toKeep = ['caption','url','uAt']; 
  
      console.log(JSON.stringify(
        doc,
        (key, value) => !key || toKeep.indexOf(key) > -1 ? value : undefined,
      ));
    })
    .catch(err => {
      console.error(err)
    })
    return res.redirect('/memes');
  })

  module.exports = MemeRouter;