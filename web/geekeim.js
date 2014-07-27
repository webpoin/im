

////////////////////////test/////////////////////////////

function html_encode(str)   {   
  var s = "";   
  if (str.length == 0) return "";   
  s = str.replace(/&/g, "&gt;");   
  s = s.replace(/</g, "&lt;");   
  s = s.replace(/>/g, "&gt;");   
  s = s.replace(/ /g, "&nbsp;");   
  s = s.replace(/\'/g, "&#39;");   
  s = s.replace(/\"/g, "&quot;");   
  s = s.replace(/\n/g, "<br>");   
  return s;   
} 




(function(window, document, undefined) {

	
	// var host = 'http://www.im.com';
	var host = 'http://192.168.1.88/webim/web';
	var name = 'geekeim'; 



	// 工具函数 添加事件
	var addEvent= (function() {
		if (document.addEventListener) {
			return function(node, e, fun){node.addEventListener(e, fun, false);}
		} else if (document.attachEvent) {
			return function(node, e, fun){node.attachEvent("on" + e, fun);}
		} else {
			return function(node, e, fun){node["on" + e] = fun;}
		}
	})();


	// // 写入im布局
	var box = (function(opts){

		var iframe = '<iframe src="" frameborder="0" style="display:none;border:none;width:100%;height:100%;"></iframe>';
		var html = '<!DOCTYPE HTML><html><head>%head</head><body>%body</body></html>';
		var head = ['<link rel="stylesheet" href="' + opts.host + '/css/style.css" />'];

		var body = ['<div id="resize"><i id="resize_max"></i><i id="resize_max"></i><i id="resize_min"></i><i id="resize_old"></i><i id="resize_clo"></i></div>']; //窗口放大、缩小、还原、关闭
		body.push('<div id="infor">fuck</div>'); //对方信息
		body.push('<div id="other"></div>'); //其他功能
		body.push('<div id="tools"><button id="tools_face"></button><button id="tools_cut"></button><button id="tools_pop"></button><button id="tools_pic"></button><button id="tools_hist"></button></div>'); //工具
		body.push('<div class="chart_box"><div id="chart"></div></div>'); //聊天内容窗
		body.push('<div id="enter" contentEditable="true" spellcheck="false" ></div>'); //输入内容
		

		body.push('<div id="tools_face_cnt"><img src="images/1.gif" /><img src="images/2.gif" /><img src="images/3.gif" /><img src="images/4.gif" /><img src="images/5.gif" /><img src="images/6.gif" /><img src="images/7.gif" /><img src="images/8.gif" /><img src="images/9.gif" /><img src="images/10.gif" /><img src="images/11.gif" /><img src="images/12.gif" /><img src="images/13.gif" /><img src="images/14.gif" /><img src="images/15.gif" /><img src="images/16.gif" /><img src="images/17.gif" /><img src="images/18.gif" /><img src="images/19.gif" /><img src="images/20.gif" /><img src="images/21.gif" /><img src="images/22.gif" /><img src="images/23.gif" /><img src="images/24.gif" /><img src="images/25.gif" /><img src="images/26.gif" /><img src="images/27.gif" /><img src="images/28.gif" /><img src="images/29.gif" /><img src="images/30.gif" /><img src="images/31.gif" /><img src="images/32.gif" /><img src="images/33.gif" /><img src="images/34.gif" /><img src="images/35.gif" /><img src="images/36.gif" /><img src="images/37.gif" /><img src="images/38.gif" /><img src="images/39.gif" /><img src="images/40.gif" /><img src="images/41.gif" /><img src="images/42.gif" /><img src="images/43.gif" /><img src="images/44.gif" /><img src="images/45.gif" /><img src="images/46.gif" /><img src="images/47.gif" /><img src="images/48.gif" /><img src="images/49.gif" /><img src="images/50.gif" /><img src="images/51.gif" /><img src="images/52.gif" /><img src="images/53.gif" /><img src="images/54.gif" /><img src="images/55.gif" /><img src="images/56.gif" /><img src="images/57.gif" /><img src="images/58.gif" /><img src="images/59.gif" /><img src="images/60.gif" /><img src="images/61.gif" /><img src="images/62.gif" /><img src="images/63.gif" /><img src="images/64.gif" /><img src="images/65.gif" /><img src="images/66.gif" /><img src="images/67.gif" /><img src="images/68.gif" /><img src="images/69.gif" /><img src="images/70.gif" /><img src="images/71.gif" /><img src="images/72.gif" /><img src="images/73.gif" /><img src="images/74.gif" /><img src="images/75.gif" /></div>');

	
		html = html.replace(/%head/, head.join(''));
		html = html.replace(/%body/, body.join(''));

		var div = document.createElement('div');
			div.className = opts.name;
			div.innerHTML = iframe;
			document.body.appendChild(div);

		var box = document.getElementsByTagName('iframe');
		box = box[box.length-1];

		var win =  box.contentWindow;
		var doc = win.document;

		doc.open();
		doc.writeln(html);
		doc.close();


		box.style.display = 'block';
		var $ = function(id) {return doc.getElementById(id);}

		var chart = $('chart');
		var enter = $('enter');
		return {window:win,
			document:doc,
			enter:enter,
			chart:chart,
			tools_face : $('tools_face'),
			tools_face_cnt:$('tools_face_cnt')
		};
	})({name:name,host:host});


	// 编辑器
	var enter = (function(elem,dom){

		var insert;
		var dom = dom || document;

		// 标准浏览器
		if(!/(rv:[\d.]+\) like gecko)|(msie [\d.]+)/.test(navigator.userAgent.toLowerCase())){
			// 获取焦点位置
			insert = function(html){
				elem.focus();
				dom.execCommand('insertHtml',false,html);
			}
		}else if(dom.selection){// 低版本ie<=ie10

			insert = function(html){
				elem.focus();
				var range = dom.selection.createRange();
				range.pasteHTML(html);
				range.select();
				range.collapse(false);
			}
			
		// 高版本ie
		}else{
			insert = function(html){
				elem.focus();
				var range = window.getSelection().getRangeAt(0);
				range.collapse(false);
				var hasR = range.createContextualFragment(html);
				var hasR_lastChild = hasR.lastChild;
				while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild.previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {
					var e = hasR_lastChild;
					hasR_lastChild = hasR_lastChild.previousSibling;
					hasR.removeChild(e)
				}
				range.insertNode(hasR);
				if (hasR_lastChild) {
					range.setEndAfter(hasR_lastChild);
					range.setStartAfter(hasR_lastChild)
				}
			}
		}





		return {
			insert: insert,
			getHtml: function() {
				return elem.innerHTML;
			},
			setHtml: function(html) {
				elem.innerHTML = html;
				setTimeout(function() {
					elem.scrollTop = elem.scrollHeight;
				}, 30);
			}
		}
	})(box.enter,box.document);


	// 聊天窗
	var chart = (function(elem,dom){

		dom = dom || document;
		var insertEvent = function(){};
		
		// insert 之前，假设所有的数据已经检验好了！！！！！
		var insert =  function(json){

			var div = dom.createElement('div');
			if(json.type) div.className = json.type;
			div.innerHTML = '<div>'+json.cont+'</div><i></i>';
			elem.appendChild(div);

			// elem.scrollTop = elem.scrollHeight;
			elem.parentNode.scrollTop = elem.parentNode.scrollHeight;
			insertEvent(json);
		}

		return{
			insert: insert,
			insertEvent: function(fun) {
				if (fun && typeof(fun) === 'function') {
					insertEvent = fun;
				}
			},
			getHtml: function() {
				return elem.innerHTML;
			},
			setHtml: function(html) {
				elem.innerHTML = html;
				setTimeout(function() {
					elem.scrollTop = elem.scrollHeight;
				}, 30);
			}
		}
	})(box.chart,box.document);

	


	// 消息处理器
	var msg = (function(chart){

		// 待发送内容
		var pending = [];
		var speed = 1000; //间隔时间
		var interval;
		var script;
		var body = document.getElementsByTagName('body')[0];
		var script = document.createElement('script');

		// 初次链接
		script.src = host+'/autochart.php';
		body.appendChild(script);

		// 轮询
		var poll = function(){

			body.removeChild(script);
			script = document.createElement('script');
			script.src =  host+'/autochart.php?callback=geekeim&time='+(new Date()).getTime()+pending.join('');
		
			pending = [];
			body.appendChild(script);
		}

		// 内容格式化并压入chart
		var format = function(json){


			// 解压缩
			json.cont = json.cont.replace(/\[\/n\]/gi,'<br/>');
			json.cont = json.cont.replace(/\[\/p:(\d+?)\]/gi,'<img src="images/$1.gif"/>');

			json.time = json.time || (new Date).getTime();

			// 把压缩的数据解析

			chart.insert(json);
			return msg;
		}


		// 轮询
		interval = setInterval(poll,speed);

		return {
			chart:function(json){
				format(json);
			},
			send: function(msg) {
				var res = msg;



				// 输入的内容格式化
				res = res.replace(/^<p>/i,'');
				res = res.replace(/((?:<div>|<p>)(?:<br>|\s)?|<br>)/gi,'[/n]'); //修改换行为/n

				// res = res.replace(/<br>/gi,'<br>'); //修改换行为/n
				res = res.replace(/<img.+?(\d+).gif">/gi,'[/p:$1]');
				res = res.replace(/<\/?.+?>/g,''); //去除<*>标签

				
				pending.push('&msg=' + res);
				format({type:'user',cont:res});

			},
			stop: function() {
				clearInterval(interval);
				interval = false;
			},
			start: function() {
				if (!interval) {
					interval = setInterval(poll, speed);
				}
			}
		}
	})(chart);




	// 页面跟踪
	var track = (function(){

		var page_id 	= name+'_pageId';
		var enter_value = name+'_enterValue';
		var chart_value = name+'_chartValue';
		var time = '';  //操作日志
		var log;
		


		// 本地存储
		var localdata = (function() {
			
			var set, get, remove,data,name = window.location.hostname,usedata;


			if (window.localStorage) {
				set = function(key, val) {
					if (this.get(key) !== null) {
						this.remove(key);
					}
					window.localStorage.setItem(key, val);
				}
				get = function(key) {
					return window.localStorage.getItem(key) || '';
				}
				remove = function(key) {
					window.localStorage.removeItem(key);
				}
			} else {

				usedata = (function(){
					data = document.createElement('span');
					data.style.cssText = 'position:absolute;top:-1000em;behavior:url("#default#userData")';
					document.body.appendChild(data);
					data.load(name);
					return arguments.callee;
				})();

				set = function(key, val) {
					data.parentNode.removeChild(data);
					usedata();
					data.setAttribute(key, val);
					data.save(name);
				}

				get = function(key) {
					data.parentNode.removeChild(data);
					usedata();
					return data.getAttribute(key) || '';
				}
				remove = function(key) {
					data.removeAttribute(key);
					data.save(name);
				}
			}

			return {
				set: set,
				get: get,
				remove: remove
			}
		})();



		// test 重置本地存储为空///////////////////////////////////////////////////////////
		localdata.set(chart_value,'');
		/////////////////////////////////////////////////////////

		var listenUpdata = function(data){
			time = data.time;
		}

		var listenCommit = function(data){
			time = data.time;
			var append = '{'+data.time+','+data.type+','+data.cont+'}';
			log += append;
			localdata.set(chart_value,log);
		}


		// 更新数据
		var updata = (function(){

			var str = log = localdata.get(chart_value),t = time,split,res;

			// 监听更新;
			chart.insertEvent(listenUpdata);

			// 聊天内容没有更新
			if( t && !(str = str.split(t)[1])){
				chart.insertEvent(listenCommit);
				return ;
			}

			if(res = str.match(/\{.+?\}/gi)){
				for(var i=0,l=res.length;i<l;i++){
					split = res[i].replace(/[\{\}]/g,'').split(',');
					msg.chart({time:split[0],type:split[1],cont:split[2]});
				}	
			}

			chart.insertEvent(listenCommit);
			return arguments.callee;
		})();

		
		var visible = function(){

			msg.start();
			localdata.set(page_id,'0');
			enter.setHtml(unescape(localdata.get(enter_value)));
			updata();
		}

		var hidden = function(){
			
			msg.stop();
			localdata.set(page_id,'1');
			localdata.set(enter_value,escape(enter.getHtml()));

			// 全部失去焦点前最后一个页面; 保持有且只有一个轮询
			setTimeout(function(){
				if(parseInt(localdata.get(page_id)) === 1){
					msg.start();
				}
			},300);
		}

		
		var hide, visi;
		if (typeof document.hidden !== "undefined") {
			hide = "hidden";
			visi = "visibilitychange";
		} else if (typeof document.mozHidden !== "undefined") {
			hide = "mozHidden";
			visi = "mozvisibilitychange";
		} else if (typeof document.msHidden !== "undefined") {
			hide = "msHidden";
			visi = "msvisibilitychange";
		} else if (typeof document.webkitHidden !== "undefined") {
			hide = "webkitHidden";
			visi = "webkitvisibilitychange";
		}

		if(hide){
			addEvent(document,visi,function(){
				if(!document[hide])
					visible();
				else
					hidden();
			});
		}else{

			var focus_time = 0;
			var isin = false;

			document.onfocusin = function(){
				var time = (new Date).getTime();
				if((time - focus_time) <5){
					isin = true;
				}else{
					setTimeout(function(){visible();},8);
				}
			}
			document.onfocusout = function(){

				focus_time = (new Date).getTime();
				setTimeout(function(){
					if(isin){isin = false;}
					else{hidden();}
				},8);
			}
		}

	})();



		// 根节点事件点击代理
	var domclick = (function(){

		var loop = [];
		var once = [];
		var event = function(e){
			var i,k;
			if(loop.length>0){
				for(i=loop.length-1;i>=0;i--){
					if(typeof(loop[i]) === 'function') loop[i](e);
				}
			}
			if(once.length>0){
				for(i=once.length-1;i>=0;i--){
					if(typeof(once[i]) === 'function') once[i](e);
				}
				once = [];
			}
		}

		addEvent(box.document,'click',event);

		return {
			once:function(fun){once.push(fun)},
			add:function(fun){loop.push(fun);},
			move:function(fun){/*实现相对复杂*/}
		}
	})();




	// ctrl +enter 发送消息
	// 回车的浏览器兼容问题～～杀很大
	addEvent(box.enter,'keypress',function(e){
		if (e.ctrlKey && (e.keyCode==13||e.keyCode==10)) {
			var html = enter.getHtml();
			if(html){
				msg.send(html);
				enter.setHtml('');
			}
		}
		
	});


	// 表情
	addEvent(box.tools_face,'click',function(e){
		// 阻止默认冒泡
		if(!e.stopPropagation){ //ie
			box.window.event.cancelBubble = true;
		}else{ //标准浏览器
			e.stopPropagation();
		}
		
		box.tools_face_cnt.style.display = (box.tools_face_cnt.offsetHeight>0) ? 'none' :'block';
		// 注册事件
		domclick.once(function(e){ box.tools_face_cnt.style.display = 'none';});

	});


	// 表情内容点击
	addEvent(box.tools_face_cnt,'click',function(e){
		e = e||window.event;
		var tar = e.target || e.srcElement;
		if(tar.src){
			enter.insert('<img src="'+tar.src+'"/>');
		}
	});



	// msg.stop();
	setTimeout(function(){msg.stop()},3000);

	window[name] = function(json){
		// console.log(json);
		// 返回空
		if(json && json.type && json.type!=='emp'){
			msg.chart(json);
			// chart.insert(msg.format(json.cont),'server');
		}

		// if(json.type === 'msg'){
			
		// }
	}

	
})(window, document);

