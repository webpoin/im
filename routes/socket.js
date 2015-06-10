

module.exports = function (io,sessionStore,cookieParser) {

	// 启动socket	
	io.on('connection', function(socket){


  		// cookie demo '%3A' url解码为 ':'
  		// 'session=s%3A-Yoha4Wj16yLQu4sAMx1JlceDkxA50GW.cZiQOV4%2FFYEHk1noZsOevoiWNXlsK0sMMZLGU75CiYk'

  		// sessions demo 
		// sessions: {
		// 	'-Yoha4Wj16yLQu4sAMx1JlceDkxA50GW': '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"test":"fuck"}'
		// }

		var session = {};
		var sessionkey = /session\=([\w\W])*;?/i.exec(socket.handshake.headers.cookie)[0] || '';
			sessionkey = sessionkey.replace('session=s%3A','').split('.')[0];

		sessionStore.get(sessionkey, function(err, ss){session = ss;});

		console.log('++++++++++++++++a user connected++++++++++++++++');

		// 退出
		socket.on('disconnect', function(){
			console.log('user disconnected');
		});



		// 客服
		socket.on('server messages',function(msg){

			// 获取 client id
			// 把数据插入数据库
			// 把信息发送给 client
			// 返回发送结果


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