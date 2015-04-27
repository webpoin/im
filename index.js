var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('fuck you');
});

app.listen(3000);