var express = require('express');
var hbs = require('hbs');

// 客户端
var api = express();

// 模板引擎
api.set('view engine', 'html');
api.engine('html', hbs.__express);

api.get('/', function(req, res){res.render('client/index');});
api.use('/api', express.static(__dirname + '/public/client/geekeim.js'));
api.use('/css', express.static(__dirname + '/public/client/'));
api.use('/images', express.static(__dirname + '/public/client/images'));


// 服务端
var app = express();
app.set('view engine', 'html');
app.engine('html', hbs.__express);

// 直接输出html
app.get('/', function(req, res){res.sendFile(__dirname +'/views/server/index.html');});


app.use('/public', express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/css', express.static(__dirname + '/public/css'));




api.listen(2000);
app.listen(3000);











