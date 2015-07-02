var monk = require('monk');
var db = monk('localhost:27017/webim');

var socketid = {};
var session = {};




module.exports = function (io,sessionStore,cookieParser) {

	// 启动socket	
	io.on('connection', function(socket){

		console.log('++++++++++++++++a user connected++++++++++++++++');


  		// cookie demo '%3A' url解码为 ':'
  		// 'session=s%3A-Yoha4Wj16yLQu4sAMx1JlceDkxA50GW.cZiQOV4%2FFYEHk1noZsOevoiWNXlsK0sMMZLGU75CiYk'

  		// sessions demo 
		// sessions: {
		// 	'-Yoha4Wj16yLQu4sAMx1JlceDkxA50GW': '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"test":"fuck"}'
		// }

		// 获取session 在cookie中的值
		var sessionkey = /session\=([\w\W])*;?/i.exec(socket.handshake.headers.cookie)[0] || '';
			sessionkey = sessionkey.replace('session=s%3A','').split('.')[0];

		// 获取session
		sessionStore.get(sessionkey, function(err, ss){
			if(err) return ;
			session = ss;


			// 取用户的id
			


			// 保存socketid , 做信息定点推送
			socketid.username = socket.id;


		});






		// 退出
		socket.on('disconnect', function(){
			console.log('user disconnected');
		});



		// 客服
		socket.on('messages',function(msg){

			// 获取 client id
			// 把数据插入数据库
			// 把信息发送给 client
			// 返回发送结果

			// db.get('chart_recode').insert({
			// 	date:new Date().getTime(),
			// 	uid:001,
			// 	sid:001,
			// 	meg:req.param('data')
			// },function(e,docs){
			// 	res.send({status:200,message:'insert success!'});
			// });




			io.emit('an event sent to all connected clients');

			console.log(msg)
		});


		






		// 用户聊天
		socket.on('client messages',function(msg){

			// 把数据插入数据库
			// 把信息发送给 server
			// 返回发送结果



			console.log(msg)
		});


	});



	
};