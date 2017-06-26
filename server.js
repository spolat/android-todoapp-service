const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      db = require('mongoose').connect(require('./config').database , {useMongoClient : true}).connection,
      PORT = process.env.PORT || 3000;


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
  db.collection('notes').find({} , (err,result) => {
    if(err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
});

app.post('/deleteNote' , (req,res) => {
  
});


app.listen(PORT , () => {
  console.log('App listening on port: ' + PORT);
});
