var router = require('express').Router();
var path = require('path');
var monk = require('monk');
var io = require('socket.io')();


// console.log('--------------')
// 模板文件根目录
var root = path.normalize(__dirname+'/../');
var db = monk('localhost:27017/webim');



// 客户端获取js代码接口（唯一）
router.get('/', function(req, res, next) {


	// 获取 server id
	req.session.serverid = req.query.id || 0;

	// 获取 client id
	req.session.clientid = req.cookies.clientid || (new Date().getTime());
	res.cookie('clientid',req.session.clientid,{ maxAge: 9933864726300 });


	req.session.type = 'customer';
	res.sendFile(root + '/public/client/geekeim.js');
});







// 获取聊天记录
router.post('/recode',function(req, res, next){

	db.get('chart_recode').find({},{},function(e, docs) {

		for(var ret=[],i=0,l=docs.length;i<l;i++){
			ret.push({msg:docs[i].meg,date:docs[i].date});
		}
		res.send(ret);
	});

});



// 添加聊天信息
router.post('/chart', function(req, res, next) {

	db.get('chart_recode').insert({
		date:new Date().getTime(),
		uid:001,
		sid:001,
		meg:req.param('data')
	},function(e,docs){
		res.send({status:200,message:'insert success!'});
	});
	
});



router.get('/api/chart', function(req, res, next) {
	res.send('respond with a /api/chart');
});

router.get('/api/chart/', function(req, res, next) {
	res.send('respond with a /api/chart/');
});





module.exports = router;