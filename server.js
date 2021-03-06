const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      mongoose = require("mongoose"),
      config = require("./config"),
      PORT = process.env.PORT || 3000,
      connectionUrl = config.database;
      mongoose.connect(connectionUrl , {useMongoClient : true});
const db = mongoose.connection;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(logger('dev'));


app.post('/saveNote' , (req,res) => {
  const date = req.body.date;
  const note = req.body.note;
  db.collection('notes').save({date,note} , (err,result) => {
    if(err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
});

app.post('/getNotes' , (req,res) => {
  db.collection('notes').find().toArray((err,result) => {
    if(err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
});

app.post('/deleteNote' , (req,res) => {

});


app.listen(PORT , () => {
  console.log('App listening on port: ' + PORT);
});
