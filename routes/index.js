var router = require('express').Router();
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');


// 模板文件根目录
var views = path.normalize(__dirname + '/../views/');

var db = monk('localhost:27017/webim');



// 首页
router.get('/', function(req, res, next) {
	console.log('setting session in routes/index.js')
	req.session.test = 'fuck';
	res.sendFile(views + '/index.html');
});


// 用户
router.get('/user', function(req, res, next) {
	res.sendFile(views + '/index.html');
});






router.get('/test', function(req, res, next) {

	// res.send(res.session.clientid);
	res.send('-----'+ req.session.test + '----');
});







module.exports = router;