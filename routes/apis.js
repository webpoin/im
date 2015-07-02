var router = require('express').Router();
var path = require('path');
var monk = require('monk');
var co = require('co');

// console.log('--------------')
// 模板文件根目录
var root = path.normalize(__dirname+'/../');
var db = monk('localhost:27017/webim');



// 表设计
// 角色以user开头（用户，客服，管理员。。。）
// 交互以runtime开头（聊天，交互，用户行为，客服行为。。。）



// 客户端获取js代码接口（唯一）
router.get('/', function(req, res, next) {


	// 获取cookie的clientid
	req.session.clientid = req.cookies.clientid || (new Date().getTime());

	// 获取 server id
	req.session.serverid = req.query.id || 0;

	// 按用户类型存入 sesstion 中
	req.session.type = 'customer';



	var user_client = null;
	var user_server = null;
	var callback = function(){

		console.log(user_client,user_server)
		if(user_server === null || user_client === null) return;

		// 如果返回客服索引失败 ，则返回空，退出结束访问


		// 如果未找到用户，则新建一个用户，返回用户索引




		// 把用户索引存入 sessioin 中

		// 把客服索引存入 session 中


		// 获取 server id

		// 获取 client id



		res.sendFile(root + '/public/client/geekeim.js');
	}

	// res.send('fuck');

	// 从数据库中读取servier索引
	db.get('user_server').find({},{},function(e, docs) {
		user_server = docs;
		callback();
	});


	// 从数据库中读取 用户索引
	db.get('user_client').find({},{},function(e, docs) {
		user_client = docs;
		callback();
	});







	

	// res.cookie('clientid',req.session.clientid,{ maxAge: 9933864726300 });


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