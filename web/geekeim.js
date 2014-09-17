var test = document.createElement('div');
	test.style.cssText = 'position:absolute;left:0;top:0;background:#f00;width:300px;height:30px;'
	document.body.appendChild(test);


(function(window, document, undefined){




	// 根据url解析配置信息 
	var config = (function(document) {

		// javascript url
		var host = (function(document){
			var doc = document,
			a = {},
			stack,
			expose = +new Date();
		
			// FF,Chrome
			if (doc.currentScript) {
				return doc.currentScript.src;
			}

			try {
				a.b();
			} catch (e) {
				stack = e.fileName || e.sourceURL || e.stack || e.stacktrace;
			}

			// IE10
			if (stack && (absPath = /((?:http|https|file):\/\/.*?\/[^:]+)(?::\d+)?:\d+/.exec(stack)) && absPath[1] ) {
				return absPath[1];
			}

			// IE5-9
			for (var scripts = doc.scripts,i = scripts.length - 1,script; script = scripts[i--];) {
				if (script.className !== expose && script.readyState === 'interactive') {
					script.className = expose;
					// if less than ie 8, must get abs path by getAttribute(src, 4)
					return ('' + doc.querySelector).indexOf('[native code]') === -1 ? script.getAttribute('src', 4) : script.src;
				}
			}
			return scripts[scripts.length-1].src;
		})(document);

		// console.log(host)

		//域名
		var domain =  host.match(/^https?:\/\/(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3}|(?:[0-9a-z_!~*'()@-]+\.)*\w*)/)[0] || '';

		return {
			name:'geekeim',
			host:host,
			domain:domain,
			submitkey:'enter',
			status:'original',
			minimize:{
				size:[100,30],
				position:[null,0,0,null], //为空时不能为undifine
				margin:[0,0,10,0],
				removable:true,
				resizable:false
			},
			maximize:{
				size:['100%','100%'],
				position:[0,0,0,0],
				margin:[0,0,0,0],
				removable:false,
				resizable:false
			},
			original:{
				size:[300,370],
				position:['30%','40%',0,null],
				margin:[0,0,0,0],
				removable:true,
				resizable:true
			},
			closed:{
				size:[0,0],
				position:[-1,-1,0,0],
				margin:[0,0,0,0],
				removable:false,
				resizable:false
			}

		}
	}(document));
	

	// 创建窗口文档与交互
	var box = (function(window,document, config) {

		// 创建document
		var head = [],
			body = [],
			html = '<!DOCTYPE HTML><html><head>%head</head><body style="background-color:transparent">%body</body></html>',
			dom = document.createElement('iframe'),
			win, doc;

		head.push('<base href="' + config.domain + '">');
		head.push('<link rel="stylesheet" href="css/style.css" />');


		
		// 头部信息
		body.push('<div id="header"><img src="images/header.jpg" /><a>前端工程师</a><b>买了我的瓜，忘了那个他</b></div>'); 
		// 窗口放大、缩小、还原、关闭
		body.push('<div id="view"><i class="minimize" title="最小化"></i><i class="original" title="还原"></i><i class="maximize" title="最大化"></i><i class="closed" title="关闭"></i></div>');

		//其他功能
		body.push('<div id="other"></div>'); 
		 //工具
		body.push('<div id="tools"><button id="tools_face"></button><button id="tools_cut"></button><button id="tools_pop"></button><button id="tools_pic"></button><button id="tools_hist"></button></div>');
		//聊天内容窗
		body.push('<div id="chart"></div>'); 
		//输入内容
		body.push('<div id="enter" contentEditable="true" spellcheck="false" ></div>');
		// 表情内容
		body.push('<div id="tools_face_cnt"><img src="images/1.gif" /><img src="images/2.gif" /><img src="images/3.gif" /><img src="images/4.gif" /><img src="images/5.gif" /><img src="images/6.gif" /><img src="images/7.gif" /><img src="images/8.gif" /><img src="images/9.gif" /><img src="images/10.gif" /><img src="images/11.gif" /><img src="images/12.gif" /><img src="images/13.gif" /><img src="images/14.gif" /><img src="images/15.gif" /><img src="images/16.gif" /><img src="images/17.gif" /><img src="images/18.gif" /><img src="images/19.gif" /><img src="images/20.gif" /><img src="images/21.gif" /><img src="images/22.gif" /><img src="images/23.gif" /><img src="images/24.gif" /><img src="images/25.gif" /><img src="images/26.gif" /><img src="images/27.gif" /><img src="images/28.gif" /><img src="images/29.gif" /><img src="images/30.gif" /><img src="images/31.gif" /><img src="images/32.gif" /><img src="images/33.gif" /><img src="images/34.gif" /><img src="images/35.gif" /><img src="images/36.gif" /><img src="images/37.gif" /><img src="images/38.gif" /><img src="images/39.gif" /><img src="images/40.gif" /><img src="images/41.gif" /><img src="images/42.gif" /><img src="images/43.gif" /><img src="images/44.gif" /><img src="images/45.gif" /><img src="images/46.gif" /><img src="images/47.gif" /><img src="images/48.gif" /><img src="images/49.gif" /><img src="images/50.gif" /><img src="images/51.gif" /><img src="images/52.gif" /><img src="images/53.gif" /><img src="images/54.gif" /><img src="images/55.gif" /><img src="images/56.gif" /><img src="images/57.gif" /><img src="images/58.gif" /><img src="images/59.gif" /><img src="images/60.gif" /><img src="images/61.gif" /><img src="images/62.gif" /><img src="images/63.gif" /><img src="images/64.gif" /><img src="images/65.gif" /><img src="images/66.gif" /><img src="images/67.gif" /><img src="images/68.gif" /><img src="images/69.gif" /><img src="images/70.gif" /><img src="images/71.gif" /><img src="images/72.gif" /><img src="images/73.gif" /><img src="images/74.gif" /><img src="images/75.gif" /></div>');
		// 窗口缩放
		body.push('<div id="resize"><b class="t"></b><b class="r"></b><b class="b"></b><b class="l"></b><b class="lt"></b><b class="tr"></b><b class="rb"></b><b class="bl"></b></div>');



		html = html.replace(/%head/,head.join(''));
		html = html.replace(/%body/, body.join(''));
		dom.style.cssText = 'display:none;position:fixed;_position:absolute;z-index:99;overflow:hidden;';

		dom.setAttribute('frameBorder', 0);
		dom.setAttribute('scrolling','no');
		// dom.setAttribute('allowtransparency','true');
		

		document.body.appendChild(dom);
		win = dom.contentWindow;
		doc = win.document;

		doc.open();
		doc.writeln(html);
		doc.close();


		// 提交事件
		var commit = function(val){}

		// 设置|获取 窗口状态
		var status = function (sta) {
			
			if(!sta) return config.status;

			config.status = sta;
			doc.body.className = sta;

			var status = config[sta],
				style = status.position.concat(status.size),
				name  = ['top','right','bottom','left','width','height'];

			// 定位 和大小
			for(var i=0,x;i<6;i++){
				x = style[i];
				dom.style[name[i]] = typeof(x) === 'string' && x[x.length-1] === '%' ? x : typeof(x) === 'number' ?  x+'px' :null ;
			}

			// 边距
			dom.style.margin = status.margin.join('px ')+ 'px';
		}

		// 编辑器插入
		var insertEnter = (function(win,doc){

			var enter = doc.getElementById('enter');

			// 标准浏览器
			if (!/(rv:[\d.]+\) like gecko)|(msie [\d.]+)/.test(navigator.userAgent.toLowerCase())) {
				// 获取焦点位置
				return function(html) {
					enter.focus();
					doc.execCommand('insertHtml', false, html);
				}
			} 

			// 低版本ie<=ie10
			if (doc.selection) {
				return function(html) {
					enter.focus();
					var range = doc.selection.createRange();
					range.pasteHTML(html);
					range.select();
					range.collapse(false);
				}
			} 


			// 高版本ie
			return function(html) {
				enter.focus();
				var range = win.getSelection().getRangeAt(0);
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
		})(win,doc);

		// 添加聊天内容
		var insertChart = (function (doc) {

			var chart = doc.getElementById('chart');

			return function(json){

				var div = doc.createElement('div');

				if (json.type) div.className = json.type;

				div.innerHTML = '<div>' + json.value + '</div><i></i>';

				chart.appendChild(div);
				chart.scrollTop = chart.scrollHeight;
			}	
		})(doc);



		// 移动
		doc.getElementById('header').onmousedown = function(e){

			// 是否支持移动
			var status = config[config.status];

			if( !status.removable) return;

			e = e || win.event;
			var form = [e.screenX,e.screenY],
				client = [e.clientX,e.clientY],
				rect = dom.getBoundingClientRect(),
				// 偏移
				margin = [
					status.margin[0] - form[1],
					status.margin[1] + form[0],
					status.margin[2] + form[1],
					status.margin[3] - form[0]
				],
				// 范围 -2px 容错，防抖动
				range = [
					form[0] - rect.left ,
					form[0] - rect.left + window.parseFloat(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0) - dom.offsetWidth -2,
					form[1] - rect.top,
					form[1] - rect.top + window.parseFloat(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0) - dom.offsetHeight -2,
				];

			doc.onmousemove = function(e) {
				//元素将移动到的位置
				e = e || win.event;
				var to = [e.screenX,e.screenY];

				// 限制范围
				to[0] = to[0] < range[0] ? range[0] :to[0] >range[1] ? range[1] :to[0];
				to[1] = to[1] < range[2] ? range[2] :to[1] >range[3] ? range[3] :to[1];

				status.margin = [
					margin[0] + to[1],
					margin[1] - to[0],
					margin[2] - to[1],
					margin[3] + to[0] 
				]
				//改变css
				dom.style.margin = status.margin.join('px ') + 'px';
				return false;
			}

			doc.onmouseup = win.onblur = function() {
				doc.onmousemove = doc.onmouseup = win.onblur = origin = margin = status =null;
			}
		}

		// 改变大小
		doc.getElementById('resize').onmousedown = function(e){


			e = e || win.event;
			var target = e.target || e.srcElement;
			var status = config[config.status];

			// 是否支持改变大小
			if(target.tagName.toLowerCase() !== 'b' || !status.resizable) return;
			

			var name = target.className,
				rect = dom.getBoundingClientRect(),
				form = [e.screenX,e.screenY],
				client = [e.clientX,e.clientY],
				dire = [
					name.indexOf('t') > -1,
					name.indexOf('r') > -1,
					name.indexOf('b') > -1,
					name.indexOf('l') > -1
				],
				margin = [
					status.margin[0] - form[1],
					status.margin[1] + form[0],
					status.margin[2] + form[1],
					status.margin[3] - form[0]
				],
				size = [
					dom.offsetWidth,
					dom.offsetHeight,
				],
				// 范围 -2px 容错，防抖动
				range = [
					form[0] - client[0] - rect.left ,
					form[0] - client[0] - rect.left + window.parseFloat(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0) -2,
					form[1] - client[1] - rect.top,
					form[1] - client[1] - rect.top + window.parseFloat(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0) -2,
				];

			doc.onmousemove = function(e) {
				//元素将移动到的位置
				e = e || win.event;
				var to = [e.screenX,e.screenY];

				// 限制鼠标范围
				to[0] = to[0] < range[0] ? range[0] :to[0] >range[1] ? range[1] :to[0];
				to[1] = to[1] < range[2] ? range[2] :to[1] >range[3] ? range[3] :to[1];
			
				
				status.size[0] =  dire[1] ? size[0] + to[0] - form[0] : dire[3] ? size[0] - to[0] + form[0] : status.size[0];
				status.size[1] =  dire[0] ? size[1] - to[1] + form[1] : dire[2] ? size[1] + to[1] - form[1] : status.size[1];

				// 最小宽度
				status.size[0] = status.size[0] <100 ? 100 :status.size[0];
				status.size[1] = status.size[1] <100 ? 100 :status.size[1];

				status.margin[0] = dire[0] ? margin[0] + to[1] : status.margin[0];
				status.margin[1] = dire[1] ? margin[1] - to[0] : status.margin[1];
				status.margin[2] = dire[2] ? margin[2] - to[1] : status.margin[2];
				status.margin[3] = dire[3] ? margin[3] + to[0] : status.margin[3];

				dom.style.width =  status.size[0] +'px';
				dom.style.height = status.size[1] +'px';
				dom.style.margin = status.margin.join('px ') + 'px';

				return false;
			}

			doc.onmouseup = win.onblur = function() {
				doc.onmousemove = doc.onmouseup = win.onblur = dire =  margin = size = origin = status = null;
			}
		}

		// 最大化，最小化，还原，关闭
		doc.getElementById('view').onclick = function(e) {

			e = e || win.event;
			var target = e.target || e.srcElement;
			var name = target.className;

			target.tagName.toLowerCase() === 'i' && name !== config.status && status(name);

			return false;
		}

		// enter 发送消息// 回车的浏览器兼容问题～～杀很大
		doc.getElementById('enter').onkeypress = function(e) {
			e = e || win.event;
			var val;

			if ( (e.keyCode==13||e.keyCode==10) && (val = this.innerHTML)){

				commit(val);
				this.innerHTML = '';
				return false;
			}
		}

		// 表情
		doc.getElementById('tools_face').onclick = function(e){
			e = e || win.event;
			// 阻止默认冒泡
			if (!e.stopPropagation) { //ie
				e.cancelBubble = true;

				//标准浏览器
			} else { 
				e.stopPropagation();
			}

			var face = doc.getElementById('tools_face_cnt')
			face.style.display = face.style.display === 'block' ? 'none' :'block';
		}

		// 表情内容点击
		doc.getElementById('tools_face_cnt').onclick = function(e){
			e = e || win.event;
			var tar = e.target || e.srcElement;
			tar.tagName.toLowerCase() === 'img' && tar.src && insertEnter('<img src="'+tar.src+'" />');
		}

		// 总代理
		doc.onclick = function(){
			doc.getElementById('tools_face_cnt').style.display = 'none';
		}

	
		// dom.style.display = 'block';
		return {
			dom:dom,
			win:win,
			doc:doc,
			status:status,
			insertEnter:insertEnter,
			insertChart:insertChart,
			hide:function(){dom.style.display = 'none';},
			show:function(){dom.style.display = 'block';},
			commit:function(fuc){if( fuc && typeof(fuc) === 'function') commit = fuc;},
		}
	})(window,document,config);

	


	// 消息处理器
	var massage = (function(document,box,config){

		
		var speed = 1000, //间隔时间
			interval = false,
			loop = [];


		// 轮询
		var poll = (function(document,config){

			var body = document.getElementsByTagName('body')[0],
				url = config.domain +'/autochart.php?callback=geekeim&time=',
				script = document.createElement('script');
			body.appendChild(script);

			return function(){
				body.removeChild(script);
				script = document.createElement('script');
				script.src = url +(new Date()).getTime()+loop.join('');
				body.appendChild(script);
				loop.length = 0;
			}
		})(document,config);


		box.commit(function(val){
			loop.push('&msg=' + val);
			box.insertChart({
				type:'customer',
				value:val,
				time:(new Date).getTime()
			});
		});

		// 聊天事件（唯一一个接口）
		window[config.name] = function(json){
			// 非空
			if(!json || !json.type || json.type === 'emp') return ;

			box.insertChart({
				type:json.type,
				value:json.value,
				time:json.time || (new Date).getTime()
			});	
		}


		return {
			stop: function() {
				interval = clearInterval(interval) && false;
			},
			start: function() {
				interval = interval || setInterval(poll, speed);
			}
		}
	})(document,box,config);

	


	// 本地存储
	var localdata = (function(window,document) {
		
		var data,usedata,stor,res={},name = window.location.hostname;


		if (window.localStorage) {

			stor = window.localStorage;
			res.set = function(key, val) {
				stor.setItem(key, val);
			}
			res.get = function(key) {
				return stor.getItem(key) || '';
			}
			res.remove = function(key) {
				stor.removeItem(key);
			}
		} else {

			usedata = (function(){
				data = document.createElement('span');
				data.style.cssText = 'position:absolute;top:-1000em;behavior:url("#default#userData")';
				document.body.appendChild(data);
				data.load(name);
				return arguments.callee;
			})();

			res.set = function(key, val) {
				data.parentNode.removeChild(data);
				usedata();
				data.setAttribute(key, val);
				data.save(name);
			}

			res.get = function(key) {
				data.parentNode.removeChild(data);
				usedata();
				return data.getAttribute(key) || '';
			}
			res.remove = function(key) {
				data.removeAttribute(key);
				data.save(name);
			}
		}

		return res;
	})(window,document);


	






	
	box.status('original');
	box.show();

	localdata.set('fuck','day');
	console.log(localdata.get('fuck'));






	



})(window, document);




// (function(window, document, undefined) {

	
// 	// var host = 'http://www.im.com';
// 	var host = 'http://web.im.com';
// 	var name = 'geekeim'; 


// 	// 工具函数 添加事件
// 	var addEvent= (function() {
// 		if (document.addEventListener) {
// 			return function(node, e, fun){node.addEventListener(e, fun, false);}
// 		} else if (document.attachEvent) {
// 			return function(node, e, fun){node.attachEvent("on" + e, fun);}
// 		} else {
// 			return function(node, e, fun){node["on" + e] = fun;}
// 		}
// 	})();


// 	//写入im布局
// 	var box = (function(opts){

// 		var host = opts.host,
// 		head = [],
// 		body = [],
// 		html = '<!DOCTYPE HTML><html><head>%head</head><body>%body</body></html>',
// 		iframe = document.createElement('iframe'),
// 		win,doc;


// 		head.push('<link rel="stylesheet" href="'+host+'/css/style.css" />');
// 		head.push('<base href="'+host+'">');

		
// 		body.push('<div id="header">fuck</div>'); //对方信息
// 		body.push('<div class="view"><i id="maximize"></i><i id="minimize"></i><i id="original"></i><i id="closed"></i></div>'); //窗口放大、缩小、还原、关闭
// 		body.push('<div id="other"></div>'); //其他功能
// 		body.push('<div id="tools"><button id="tools_face"></button><button id="tools_cut"></button><button id="tools_pop"></button><button id="tools_pic"></button><button id="tools_hist"></button></div>'); //工具
// 		body.push('<div class="chart_box"><div id="chart"></div></div>'); //聊天内容窗
// 		body.push('<div id="enter" contentEditable="true" spellcheck="false" ></div>'); //输入内容
// 		body.push('<div id="tools_face_cnt"><img src="images/1.gif" /><img src="images/2.gif" /><img src="images/3.gif" /><img src="images/4.gif" /><img src="images/5.gif" /><img src="images/6.gif" /><img src="images/7.gif" /><img src="images/8.gif" /><img src="images/9.gif" /><img src="images/10.gif" /><img src="images/11.gif" /><img src="images/12.gif" /><img src="images/13.gif" /><img src="images/14.gif" /><img src="images/15.gif" /><img src="images/16.gif" /><img src="images/17.gif" /><img src="images/18.gif" /><img src="images/19.gif" /><img src="images/20.gif" /><img src="images/21.gif" /><img src="images/22.gif" /><img src="images/23.gif" /><img src="images/24.gif" /><img src="images/25.gif" /><img src="images/26.gif" /><img src="images/27.gif" /><img src="images/28.gif" /><img src="images/29.gif" /><img src="images/30.gif" /><img src="images/31.gif" /><img src="images/32.gif" /><img src="images/33.gif" /><img src="images/34.gif" /><img src="images/35.gif" /><img src="images/36.gif" /><img src="images/37.gif" /><img src="images/38.gif" /><img src="images/39.gif" /><img src="images/40.gif" /><img src="images/41.gif" /><img src="images/42.gif" /><img src="images/43.gif" /><img src="images/44.gif" /><img src="images/45.gif" /><img src="images/46.gif" /><img src="images/47.gif" /><img src="images/48.gif" /><img src="images/49.gif" /><img src="images/50.gif" /><img src="images/51.gif" /><img src="images/52.gif" /><img src="images/53.gif" /><img src="images/54.gif" /><img src="images/55.gif" /><img src="images/56.gif" /><img src="images/57.gif" /><img src="images/58.gif" /><img src="images/59.gif" /><img src="images/60.gif" /><img src="images/61.gif" /><img src="images/62.gif" /><img src="images/63.gif" /><img src="images/64.gif" /><img src="images/65.gif" /><img src="images/66.gif" /><img src="images/67.gif" /><img src="images/68.gif" /><img src="images/69.gif" /><img src="images/70.gif" /><img src="images/71.gif" /><img src="images/72.gif" /><img src="images/73.gif" /><img src="images/74.gif" /><img src="images/75.gif" /></div>');
// 		body.push('<div id="resize"></div>')

// 		html = html.replace(/%head/, head.join(''));
// 		html = html.replace(/%body/, body.join(''));
		

// 		iframe.style.cssText = 'display:none;position:fixed;z-index:99; border:none;left:30px;top:30px;border:1px solid #aaa; width:550px;height:580px;';
// 		document.body.appendChild(iframe);


// 		win =  iframe.contentWindow;
// 		doc = win.document;

// 		doc.open();
// 		doc.writeln(html);
// 		doc.close();

// 		iframe.style.display = 'block';

// 		return {
// 			box: iframe,
// 			window: win,
// 			document: doc,
// 			maximize:doc.getElementById('maximize'),
// 			minimize:doc.getElementById('minimize'),
// 			original:doc.getElementById('original'),
// 			closed:doc.getElementById('closed'),
// 			header:doc.getElementById('header'),
// 			resize:doc.getElementById('resize'),
// 			enter: doc.getElementById('enter'),
// 			chart: doc.getElementById('chart'),
// 			tools_face: doc.getElementById('tools_face'),
// 			tools_face_cnt: doc.getElementById('tools_face_cnt')
// 		};
// 	})({name:name,host:host});



// 	// 编辑器
// 	var enter = (function(elem,dom){

// 		var insert;
// 		var dom = dom || document;

// 		// 标准浏览器
// 		if(!/(rv:[\d.]+\) like gecko)|(msie [\d.]+)/.test(navigator.userAgent.toLowerCase())){
// 			// 获取焦点位置
// 			insert = function(html){
// 				elem.focus();
// 				dom.execCommand('insertHtml',false,html);
// 			}
// 		}else if(dom.selection){// 低版本ie<=ie10

// 			insert = function(html){
// 				elem.focus();
// 				var range = dom.selection.createRange();
// 				range.pasteHTML(html);
// 				range.select();
// 				range.collapse(false);
// 			}
			
// 		// 高版本ie
// 		}else{
// 			insert = function(html){
// 				elem.focus();
// 				var range = window.getSelection().getRangeAt(0);
// 				range.collapse(false);
// 				var hasR = range.createContextualFragment(html);
// 				var hasR_lastChild = hasR.lastChild;
// 				while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild.previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {
// 					var e = hasR_lastChild;
// 					hasR_lastChild = hasR_lastChild.previousSibling;
// 					hasR.removeChild(e)
// 				}
// 				range.insertNode(hasR);
// 				if (hasR_lastChild) {
// 					range.setEndAfter(hasR_lastChild);
// 					range.setStartAfter(hasR_lastChild)
// 				}
// 			}
// 		}





// 		return {
// 			insert: insert,
// 			getHtml: function() {
// 				return elem.innerHTML;
// 			},
// 			setHtml: function(html) {
// 				elem.innerHTML = html;
// 				setTimeout(function() {
// 					elem.scrollTop = elem.scrollHeight;
// 				}, 30);
// 			}
// 		}
// 	})(box.enter,box.document);


// 	// 聊天窗
// 	var chart = (function(elem,dom){

// 		dom = dom || document;
// 		var insertEvent = function(){};
		
// 		// insert 之前，假设所有的数据已经检验好了！！！！！
// 		var insert =  function(json){

// 			var div = dom.createElement('div');
// 			if(json.type) div.className = json.type;
// 			div.innerHTML = '<div>'+json.cont+'</div><i></i>';
// 			elem.appendChild(div);

// 			// elem.scrollTop = elem.scrollHeight;
// 			elem.parentNode.scrollTop = elem.parentNode.scrollHeight;
// 			insertEvent(json);
// 		}

// 		return{
// 			insert: insert,
// 			insertEvent: function(fun) {
// 				if (fun && typeof(fun) === 'function') {
// 					insertEvent = fun;
// 				}
// 			},
// 			getHtml: function() {
// 				return elem.innerHTML;
// 			},
// 			setHtml: function(html) {
// 				elem.innerHTML = html;
// 				setTimeout(function() {
// 					elem.scrollTop = elem.scrollHeight;
// 				}, 30);
// 			}
// 		}
// 	})(box.chart,box.document);

	


// 	// 消息处理器
// 	var msg = (function(chart){

// 		// 待发送内容
// 		var pending = [];
// 		var speed = 1000; //间隔时间
// 		var interval;
// 		var script;
// 		var body = document.getElementsByTagName('body')[0];
// 		var script = document.createElement('script');

// 		// 初次链接
// 		script.src = host+'/autochart.php';
// 		body.appendChild(script);

// 		// 轮询
// 		var poll = function(){

// 			body.removeChild(script);
// 			script = document.createElement('script');
// 			script.src =  host+'/autochart.php?callback=geekeim&time='+(new Date()).getTime()+pending.join('');
		
// 			pending = [];
// 			body.appendChild(script);
// 		}

// 		// 内容格式化并压入chart
// 		var format = function(json){


// 			// 解压缩
// 			json.cont = json.cont.replace(/\[\/n\]/gi,'<br/>');
// 			json.cont = json.cont.replace(/\[\/p:(\d+?)\]/gi,'<img src="images/$1.gif"/>');

// 			json.time = json.time || (new Date).getTime();

// 			// 把压缩的数据解析

// 			chart.insert(json);
// 			return msg;
// 		}


// 		// 轮询
// 		interval = setInterval(poll,speed);

// 		return {
// 			chart:function(json){
// 				format(json);
// 			},
// 			send: function(msg) {
// 				var res = msg;


// 				// 输入的内容格式化
// 				res = res.replace(/^<p>/i,'');
// 				res = res.replace(/((?:<div>|<p>)(?:<br>|\s)?|<br>)/gi,'[/n]'); //修改换行为/n

// 				// res = res.replace(/<br>/gi,'<br>'); //修改换行为/n
// 				res = res.replace(/<img.+?(\d+).gif">/gi,'[/p:$1]');
// 				res = res.replace(/<\/?.+?>/g,''); //去除<*>标签

				
// 				pending.push('&msg=' + res);
// 				format({type:'user',cont:res});

// 			},
// 			stop: function() {
// 				clearInterval(interval);
// 				interval = false;
// 			},
// 			start: function() {
// 				if (!interval) {
// 					interval = setInterval(poll, speed);
// 				}
// 			}
// 		}
// 	})(chart);




// 	// 页面跟踪
// 	var track = (function(){

// 		var page_id 	= name+'_pageId';
// 		var enter_value = name+'_enterValue';
// 		var chart_value = name+'_chartValue';
// 		var time = '';  //操作日志
// 		var log;
		


// 		// 本地存储
// 		var localdata = (function() {
			
// 			var set, get, remove,data,name = window.location.hostname,usedata;


// 			if (window.localStorage) {
// 				set = function(key, val) {
// 					if (this.get(key) !== null) {
// 						this.remove(key);
// 					}
// 					window.localStorage.setItem(key, val);
// 				}
// 				get = function(key) {
// 					return window.localStorage.getItem(key) || '';
// 				}
// 				remove = function(key) {
// 					window.localStorage.removeItem(key);
// 				}
// 			} else {

// 				usedata = (function(){
// 					data = document.createElement('span');
// 					data.style.cssText = 'position:absolute;top:-1000em;behavior:url("#default#userData")';
// 					document.body.appendChild(data);
// 					data.load(name);
// 					return arguments.callee;
// 				})();

// 				set = function(key, val) {
// 					data.parentNode.removeChild(data);
// 					usedata();
// 					data.setAttribute(key, val);
// 					data.save(name);
// 				}

// 				get = function(key) {
// 					data.parentNode.removeChild(data);
// 					usedata();
// 					return data.getAttribute(key) || '';
// 				}
// 				remove = function(key) {
// 					data.removeAttribute(key);
// 					data.save(name);
// 				}
// 			}

// 			return {
// 				set: set,
// 				get: get,
// 				remove: remove
// 			}
// 		})();



// 		// test 重置本地存储为空///////////////////////////////////////////////////////////
// 		localdata.set(chart_value,'');
// 		/////////////////////////////////////////////////////////

// 		var listenUpdata = function(data){
// 			time = data.time;
// 		}

// 		var listenCommit = function(data){
// 			time = data.time;
// 			var append = '{'+data.time+','+data.type+','+data.cont+'}';
// 			log += append;
// 			localdata.set(chart_value,log);
// 		}


// 		// 更新数据
// 		var updata = (function(){

// 			var str = log = localdata.get(chart_value),t = time,split,res;

// 			// 监听更新;
// 			chart.insertEvent(listenUpdata);

// 			// 聊天内容没有更新
// 			if( t && !(str = str.split(t)[1])){
// 				chart.insertEvent(listenCommit);
// 				return ;
// 			}

// 			if(res = str.match(/\{.+?\}/gi)){
// 				for(var i=0,l=res.length;i<l;i++){
// 					split = res[i].replace(/[\{\}]/g,'').split(',');
// 					msg.chart({time:split[0],type:split[1],cont:split[2]});
// 				}	
// 			}

// 			chart.insertEvent(listenCommit);
// 			return arguments.callee;
// 		})();

		
// 		var visible = function(){

// 			msg.start();
// 			localdata.set(page_id,'0');
// 			enter.setHtml(unescape(localdata.get(enter_value)));
// 			updata();
// 		}

// 		var hidden = function(){
			
// 			msg.stop();
// 			localdata.set(page_id,'1');
// 			localdata.set(enter_value,escape(enter.getHtml()));

// 			// 全部失去焦点前最后一个页面; 保持有且只有一个轮询
// 			setTimeout(function(){
// 				if(parseInt(localdata.get(page_id)) === 1){
// 					msg.start();
// 				}
// 			},300);
// 		}

		
// 		var hide, visi;
// 		if (typeof document.hidden !== "undefined") {
// 			hide = "hidden";
// 			visi = "visibilitychange";
// 		} else if (typeof document.mozHidden !== "undefined") {
// 			hide = "mozHidden";
// 			visi = "mozvisibilitychange";
// 		} else if (typeof document.msHidden !== "undefined") {
// 			hide = "msHidden";
// 			visi = "msvisibilitychange";
// 		} else if (typeof document.webkitHidden !== "undefined") {
// 			hide = "webkitHidden";
// 			visi = "webkitvisibilitychange";
// 		}

// 		if(hide){
// 			addEvent(document,visi,function(){
// 				if(!document[hide])
// 					visible();
// 				else
// 					hidden();
// 			});
// 		}else{

// 			var focus_time = 0;
// 			var isin = false;

// 			document.onfocusin = function(){
// 				var time = (new Date).getTime();
// 				if((time - focus_time) <5){
// 					isin = true;
// 				}else{
// 					setTimeout(function(){visible();},8);
// 				}
// 			}
// 			document.onfocusout = function(){

// 				focus_time = (new Date).getTime();
// 				setTimeout(function(){
// 					if(isin){isin = false;}
// 					else{hidden();}
// 				},8);
// 			}
// 		}
// 	})();



// 	// 根节点事件点击代理
// 	var domclick = (function(){

// 		var loop = [];
// 		var once = [];
// 		var event = function(e){
// 			var i,k;
// 			if(loop.length>0){
// 				for(i=loop.length-1;i>=0;i--){
// 					if(typeof(loop[i]) === 'function') loop[i](e);
// 				}
// 			}
// 			if(once.length>0){
// 				for(i=once.length-1;i>=0;i--){
// 					if(typeof(once[i]) === 'function') once[i](e);
// 				}
// 				once = [];
// 			}
// 		}

// 		addEvent(box.document,'click',event);

// 		return {
// 			once:function(fun){once.push(fun)},
// 			add:function(fun){loop.push(fun);},
// 			move:function(fun){/*实现相对复杂*/}
// 		}
// 	})();



// 	// 移动
// 	addEvent(box.header,'mousedown',function(e){
// 		e = e || window.event;


// 		var origin = [parseFloat(box.box.style.marginLeft || 0) - e.screenX, parseFloat(box.box.style.marginTop || 0) - e.screenY], //原始坐标与偏移
// 			//范围
// 			range = [-parseInt(box.box.style.left || 0),
// 				parseFloat(window.innerWidth || 0) - parseFloat(box.box.style.width || 0) - parseInt(box.box.style.left || 0), -parseInt(box.box.style.top || 0),
// 				parseFloat(window.innerHeight || 0) - parseFloat(box.box.style.height || 0) - parseInt(box.box.style.top || 0)
// 			];


// 		this.style.cursor = "move";
// 		box.window.onmousemove = function(e) {

// 			//元素将移动到的位置
// 			var x = e.screenX + origin[0];
// 			var y = e.screenY + origin[1];



// 			//将移动限制在页面内
// 			x = x < range[0] ? range[0] : x > range[1] ? range[1] : x;
// 			y = y < range[2] ? range[2] : y > range[3] ? range[3] : y;

// 			//改变css
// 			box.box.style.marginLeft = x + "px";
// 			box.box.style.marginTop = y + "px";
// 		}

// 		box.window.onmouseup = function() {

// 			//还原内容，清除痕迹
// 			box.window.onmousemove = null //还原鼠标移动事件
// 			box.window.onmouseup = null; //还原鼠标放开事件
// 			box.header.style.cursor = 'auto';
// 			return true;
// 		}
// 	});


// 	// 改变大小
// 	addEvent(box.resize,'mousedown',function(e){
// 		e = e || window.event;

// 		var origin = [parseFloat(box.box.style.width || 0) - e.screenX, parseFloat(box.box.style.height || 0) - e.screenY], //原始坐标与偏移
// 			//范围
// 			range = [100,
// 				parseFloat(window.innerWidth || 0) - parseInt(box.box.style.left || 0),
// 				100,
// 				parseFloat(window.innerHeight || 0)- parseInt(box.box.style.top || 0)
// 			];


// 		// this.style.cursor = "move";
// 		box.window.onmousemove = function(e) {

// 			//元素将移动到的位置
// 			var x = e.screenX + origin[0];
// 			var y = e.screenY + origin[1];



// 			//将移动限制在页面内
// 			x = x < range[0] ? range[0] : x > range[1] ? range[1] : x;
// 			y = y < range[2] ? range[2] : y > range[3] ? range[3] : y;

// 			//改变css
// 			box.box.style.width = x + "px";
// 			box.box.style.height = y + "px";
// 		}

// 		box.window.onmouseup = function() {

// 			//还原内容，清除痕迹
// 			box.window.onmousemove = null //还原鼠标移动事件
// 			box.window.onmouseup = null; //还原鼠标放开事件
// 			return true;
// 		}
		
// 	});



// 	// ctrl +enter 发送消息
// 	// 回车的浏览器兼容问题～～杀很大
// 	addEvent(box.enter,'keypress',function(e){
// 		if (e.ctrlKey && (e.keyCode==13||e.keyCode==10)) {
// 			var html = enter.getHtml();
// 			if(html){
// 				msg.send(html);
// 				enter.setHtml('');
// 			}
// 		}
		
// 	});


// 	// 表情
// 	addEvent(box.tools_face,'click',function(e){
// 		// 阻止默认冒泡
// 		if(!e.stopPropagation){ //ie
// 			box.window.event.cancelBubble = true;
// 		}else{ //标准浏览器
// 			e.stopPropagation();
// 		}
		
// 		box.tools_face_cnt.style.display = (box.tools_face_cnt.offsetHeight>0) ? 'none' :'block';
// 		// 注册事件
// 		domclick.once(function(e){ box.tools_face_cnt.style.display = 'none';});

// 	});


// 	// 表情内容点击
// 	addEvent(box.tools_face_cnt,'click',function(e){
// 		e = e||window.event;
// 		var tar = e.target || e.srcElement;
// 		if(tar.src){
// 			enter.insert('<img src="'+tar.src+'"/>');
// 		}
// 	});



// 	// msg.stop();
// 	// setTimeout(function(){msg.stop()},3000);

// 	window[name] = function(json){
// 		// console.log(json);
// 		// 返回空
// 		if(json && json.type && json.type!=='emp'){
// 			msg.chart(json);
// 			// chart.insert(msg.format(json.cont),'server');
// 		}

// 		// if(json.type === 'msg'){
			
// 		// }
// 	}

	
// })(window, document);

