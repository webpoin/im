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


		//域名
		var domain =  host.match(/^https?:\/\/(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3}|(?:[0-9a-z_!~*'()@-]+\.)*\w*)/)[0] || '';


		// domain 本地测试开发
		domain = domain+'/im/web/'



		return {
			name:'geekeim',		//接口名称，做为接收数据，函数名
			speed:1000, 		//轮询时间间隔
			host:host,
			domain:domain,
			submitkey:'enter',
			status:{
				min:{
					width:200,
					height:40,
					top:null,
					right:10,
					bottom:10,
					left:null
				},
				max:{
					width:'100%',
					height:'100%',
					top:0,
					right:0,
					bottom:0,
					left:0
				},
				nor:{
					width:300,
					height:370,
					top:null,
					right:'40%',
					bottom:'30%',
					left:null,
				},
				clo:{
					width:0,
					height:0,
					top:-1,
					right:-1,
					bottom:-1,
					left:-1
				}
			},
			default_status:'nor' //当前状态

		}

	}(document));
	

	// 创建窗口文档与交互
	var box = (function(window,document, config) {

		// 创建document
		var head = [],
			body = [],
			html = '<!DOCTYPE HTML><html><head>%head</head><body>%body</body></html>',
			dom = document.createElement('iframe'),
			win, doc;

		head.push('<base href="' + config.domain + '">');
		// 开发专用，字体图标
		head.push('<link rel="stylesheet" href="css/style.css" />');


		// 结构说明，class布局专用，id为布局和事件代理类型共用


		// 头部
		body.push('<div id="header"></div>');
		
		// 侧边
		body.push('<div id="sider"></div>');

		//聊天内容窗
		body.push('<div id="chart"></div>');

		//输入内容
		body.push('<div id="enter" contentEditable="true" spellcheck="false" ></div>'); 




		// 输入内容提示
		body.push('<div class="enter">按Enter键发送</div>');


		// 服务人员信息
		body.push('<div class="auth"><img id="auth" src="images/header.jpg" /><a href="#">前端工程师</a><i id="auths">&#xa500;</i><b>买了我的瓜，忘了那个他</b></div>');


		// 窗口放大、缩小、还原、关闭
		body.push('<div class="view"><i id="min" title="最小化">&#xa001;</i><i id="nor" title="还原">&#xa002;</i><i id="max" title="最大化">&#xa003;</i><i id="clo" title="关闭">&#xa004;</i></div>');


		//媒体功能
		body.push('<div class="meta"><i id="qq">&#xa100;</i><i id="video">&#xa101;</i><i id="voice">&#xa102;</i></div>');


		// 工具
		body.push('<div class="tools"><i id="face">&#xa200;</i><i id="pop">&#xa201;</i><i id="cut">&#xa202;</i>');
		body.push('<i>&#xa203;<form id="pic" action="updatapic.php" enctype="multipart/form-data" method="post" target="iframe"><input type="file" name="pic" /></form></i>');
		body.push('<i>&#xa204;<form id="file" action="updatafile.php" enctype="multipart/form-data" method="post" target="iframe"><input type="file" name="file" /></form></i>');
		body.push('<i id="hist">&#xa205;</i><i id="switch">&#xa210;</i></div>');


		// 窗口缩放
		body.push('<div class="resize"><b id="t"></b><b id="r"></b><b id="b"></b><b id="l"></b><b id="lt"></b><b id="tr"></b><b id="rb"></b><b id="bl"></b></div>');

		
		// 表情内容
		body.push('<div id="face_cnt"><img src="images/1.gif" /><img src="images/2.gif" /><img src="images/3.gif" /><img src="images/4.gif" /><img src="images/5.gif" /><img src="images/6.gif" /><img src="images/7.gif" /><img src="images/8.gif" /><img src="images/9.gif" /><img src="images/10.gif" /><img src="images/11.gif" /><img src="images/12.gif" /><img src="images/13.gif" /><img src="images/14.gif" /><img src="images/15.gif" /><img src="images/16.gif" /><img src="images/17.gif" /><img src="images/18.gif" /><img src="images/19.gif" /><img src="images/20.gif" /><img src="images/21.gif" /><img src="images/22.gif" /><img src="images/23.gif" /><img src="images/24.gif" /><img src="images/25.gif" /><img src="images/26.gif" /><img src="images/27.gif" /><img src="images/28.gif" /><img src="images/29.gif" /><img src="images/30.gif" /><img src="images/31.gif" /><img src="images/32.gif" /><img src="images/33.gif" /><img src="images/34.gif" /><img src="images/35.gif" /><img src="images/36.gif" /><img src="images/37.gif" /><img src="images/38.gif" /><img src="images/39.gif" /><img src="images/40.gif" /><img src="images/41.gif" /><img src="images/42.gif" /><img src="images/43.gif" /><img src="images/44.gif" /><img src="images/45.gif" /><img src="images/46.gif" /><img src="images/47.gif" /><img src="images/48.gif" /><img src="images/49.gif" /><img src="images/50.gif" /><img src="images/51.gif" /><img src="images/52.gif" /><img src="images/53.gif" /><img src="images/54.gif" /><img src="images/55.gif" /><img src="images/56.gif" /><img src="images/57.gif" /><img src="images/58.gif" /><img src="images/59.gif" /><img src="images/60.gif" /><img src="images/61.gif" /><img src="images/62.gif" /><img src="images/63.gif" /><img src="images/64.gif" /><img src="images/65.gif" /><img src="images/66.gif" /><img src="images/67.gif" /><img src="images/68.gif" /><img src="images/69.gif" /><img src="images/70.gif" /><img src="images/71.gif" /><img src="images/72.gif" /><img src="images/73.gif" /><img src="images/74.gif" /><img src="images/75.gif" /></div>');
		

		// 异步表单
		body.push('<iframe frameborder="0" id="iframe" name="iframe" style="display:none;"></iframe>');

		// 其他
		body.push('<div id="other"></div>');



		html = html.replace(/%head/,head.join('')).replace(/%body/,body.join(''));
		dom.style.cssText = 'position:fixed;_position:absolute;z-index:99;overflow:hidden;';

		dom.setAttribute('frameBorder', 0);
		dom.setAttribute('scrolling','no');
		// dom.setAttribute('allowtransparency','true');
		

		document.body.appendChild(dom);
		win = dom.contentWindow;
		doc = win.document;
		doc.config = config;

		doc.open();
		doc.writeln(html);
		doc.close();


		// 2015.3.18 任务 完成窗口事件修改 完成小窗口视图

		// var res = {};
		// doc.status = [];

		var styleNum = function(val){
			return isNaN(val) || val === null ? val ? val : null : val +'px';
		}

		// 判断id是否存在
		var idIsIn = function(str,id){
			// console.log(str,id)
			return id && str.split(',').indexOf(id)>=0;
		}



		// 位置信息
		dom.getRect = function(){
			var bound = this.getBoundingClientRect();
			var client = document.documentElement;
			return {
				right :(window.innerWidth || client.clientWidth) + client.clientLeft - bound.right,
				bottom : (window.innerHeight || client.clientHeight) + client.clientTop - bound.bottom,
				left : bound.left - client.clientLeft,
				top : bound.top - client.clientTop,
				width: bound.width,
				height : bound.height
			}
		}
		// 移动到
		dom.moveto = function(x1,y1,x2,y2){			
			this.style.left 	= styleNum(x1);
			this.style.top 		= styleNum(y1);
			this.style.right 	= styleNum(x2);
			this.style.bottom 	= styleNum(y2);
		}
		// 改变大小
		dom.resize = function(w,h){
			this.style.width 	= styleNum(w);
			this.style.height 	= styleNum(h);
		}
		// 改变状态
		dom.status = function(name){
			var status = doc.config.status;
			if (name === dom.current) return;
			status[dom.current] = this.getBoundingClientRect();
			status = status[name];
			this.moveto(status.left,status.top,status.right,status.bottom);	
			this.resize(status.width,status.height);
			doc.body.className = name;
			dom.current = name;	
		}
		// 抖动
		dom.shanke = function(){
			var time = 20;
			var rect = this.getRect();
			!function(){
				var l = (time%4-3/2)%1*4 +2;
				var	t = (--time%4-3/2)%1*4 +2;
				dom.style.left = rect.left + l + 'px';
				dom.style.top = rect.top + t + 'px';
				dom.style.right = rect.right - l + 'px';
				dom.style.bottom = rect.bottom - t + 'px';
				if(time>0){setTimeout(arguments.callee,12)}
			}();
		}


		// 缓存表情节点到doc 
		doc.face_cnt = doc.getElementById('face_cnt');








		// 事件
		doc.onclick = function(e){
			var tar = (function(e){return e.target || e.srcElement; })(e = e || win.event);
			var id = (tar.getAttribute('id') || '').toLowerCase() || false;

			// 表情关闭
			this.face_cnt.style.display = 'none';

			// 窗口放大缩小还原关闭
			idIsIn('min,max,nor,clo',id) && dom.status(id);
			
			// 抖动
			idIsIn('pop',id) && dom.shanke();

			// 打开表情
			idIsIn('face',id) && (this.face_cnt.style.display = 'block');

			// 表情点击
			idIsIn('face_cnt',tar.parentNode.getAttribute('id')) && ('');

		}


		doc.onmousedown = function(e){

			var tar = (function(e){return e.target || e.srcElement; })(e = e || win.event);
			var id = (tar.getAttribute('id') || '').toLowerCase();

			var rect = dom.getRect();


			// 拖动
			idIsIn('header,auth',id) && (dom.removable = function(x,y){this.moveto(x-e.screenX+rect.left,y-e.screenY+rect.top)});
			
			// 改变大小
			idIsIn('resize',tar.parentNode.getAttribute('class')) && (
				dom.moveto(
					id.indexOf('l')<0?rect.left:null,
					id.indexOf('t')<0?rect.top:null,
					id.indexOf('r')<0?rect.right:null,
					id.indexOf('b')<0?rect.bottom:null
				),
				dom.resizable = function(x,y){
					this.resize(
						rect.width + (x-e.screenX)*(id.indexOf('l')<0 ? id.indexOf('r')<0 ? 0: 1:-1),
						rect.height+ (y-e.screenY)*(id.indexOf('t')<0 ? id.indexOf('b')<0 ? 0: 1:-1)
					);
				}
			);
			
			

		}

		window.onmousemove =  win.onmousemove = function(e){
			 e = e || win.event;
			
			// 移动
			dom.removable && dom.removable.call(dom,e.screenX,e.screenY);

			// 改变大小
			dom.resizable && dom.resizable.call(dom,e.screenX,e.screenY);


			return false;
		}

		window.onmouseup = win.onmouseup = function(e){
			dom.removable = null;
			dom.resizable = null;

		}




		// 初始化
		doc.config.default_status && dom.status(doc.config.default_status); //强制赋值



		// // 提交事件
		// var commit = function(val){}

		// // 设置|获取 窗口状态
		// var status = function (sta) {
			
		// 	if(!sta) return config.status;

		// 	config.status = sta;
		// 	doc.body.className = sta;

		// 	var status = config[sta],
		// 		style = status.position.concat(status.size),
		// 		name  = ['top','right','bottom','left','width','height'];

		// 	// 定位 和大小
		// 	for(var i=0,x;i<6;i++){
		// 		x = style[i];
		// 		dom.style[name[i]] = typeof(x) === 'string' && x[x.length-1] === '%' ? x : typeof(x) === 'number' ?  x+'px' :null ;
		// 	}

		// 	// 边距
		// 	dom.style.margin = status.margin.join('px ')+ 'px';
		// }



		// // 编辑器插入 insertEnter(html)
		// var insertEnter = (function(win,doc){

		// 	var enter = doc.getElementById('enter');

		// 	// 标准浏览器
		// 	if (!/(rv:[\d.]+\) like gecko)|(msie [\d.]+)/.test(navigator.userAgent.toLowerCase())) {
		// 		// 获取焦点位置
		// 		return function(html) {
		// 			enter.focus();
		// 			doc.execCommand('insertHtml', false, html);
		// 		}
		// 	} 

		// 	// 低版本ie<=ie10
		// 	if (doc.selection) {
		// 		return function(html) {
		// 			enter.focus();
		// 			var range = doc.selection.createRange();
		// 			range.pasteHTML(html);
		// 			range.select();
		// 			range.collapse(false);
		// 		}
		// 	} 


		// 	// 高版本ie
		// 	return function(html) {
		// 		enter.focus();
		// 		var range = win.getSelection().getRangeAt(0);
		// 		range.collapse(false);
		// 		var hasR = range.createContextualFragment(html);
		// 		var hasR_lastChild = hasR.lastChild;
		// 		while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild.previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {
		// 			var e = hasR_lastChild;
		// 			hasR_lastChild = hasR_lastChild.previousSibling;
		// 			hasR.removeChild(e)
		// 		}
		// 		range.insertNode(hasR);
		// 		if (hasR_lastChild) {
		// 			range.setEndAfter(hasR_lastChild);
		// 			range.setStartAfter(hasR_lastChild)
		// 		}
		// 	}
		// })(win,doc);



		// // 添加聊天内容 insertChart({type:'classname',value:'massages value'})
		// var insertChart = (function (doc) {

		// 	var chart = doc.getElementById('chart');

		// 	return function(json){

		// 		var div = doc.createElement('div');

		// 		if (json.type) div.className = json.type;

		// 		div.innerHTML = '<div>' + json.value + '</div><i></i>';

		// 		chart.appendChild(div);
		// 		chart.scrollTop = chart.scrollHeight;
		// 	}	
		// })(doc);


		// // 抖动
		// var shanke = (function(dom){

		// 	var time = 0;
		// 	var timeout =  3000 ;//抖动时间间隔

		// 	return function(){
		// 		var newtime = (new Date()).getTime();

		// 		if(  newtime - time > timeout){

		// 			time = newtime;

		// 			var c,s,i=0,
		// 			m = config[config.status].margin,
		// 			t = m.slice(0),
		// 			interval = setInterval(function(){
		// 				c = i%2;
		// 				s = (i++)%4 <2 ? 0:4;

		// 				t[c] = m[c] -s;
		// 				t[c+2] = m[c+2] +s;

		// 				dom.style.margin = t.join('px ') + 'px';

		// 				if(i>17){
		// 					clearInterval(interval);
		// 					i=0;
		// 				}

		// 			},20);


		// 		}else{
		// 			insertChart({type:'system',value:'您抖动太频繁，请稍后再试'})
		// 		}
		// 	}
		// })(dom);


		// 移动
		// doc.getElementById('header').onmousedown = function(e){

		// 	// 是否支持移动
		// 	var status = config[config.status];

		// 	if( !status.removable) return;

		// 	e = e || win.event;
		// 	var form = [e.screenX,e.screenY],
		// 		client = [e.clientX,e.clientY],
		// 		rect = dom.getBoundingClientRect(),
		// 		// 偏移
		// 		margin = [
		// 			status.margin[0] - form[1],
		// 			status.margin[1] + form[0],
		// 			status.margin[2] + form[1],
		// 			status.margin[3] - form[0]
		// 		],
		// 		// 范围 -2px 容错，防抖动
		// 		range = [
		// 			form[0] - rect.left ,
		// 			form[0] - rect.left + window.parseFloat(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0) - dom.offsetWidth -2,
		// 			form[1] - rect.top,
		// 			form[1] - rect.top + window.parseFloat(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0) - dom.offsetHeight -2,
		// 		];

		// 	doc.onmousemove = function(e) {
		// 		//元素将移动到的位置
		// 		e = e || win.event;
		// 		var to = [e.screenX,e.screenY];

		// 		// 限制范围
		// 		to[0] = to[0] < range[0] ? range[0] :to[0] >range[1] ? range[1] :to[0];
		// 		to[1] = to[1] < range[2] ? range[2] :to[1] >range[3] ? range[3] :to[1];

		// 		status.margin = [
		// 			margin[0] + to[1],
		// 			margin[1] - to[0],
		// 			margin[2] - to[1],
		// 			margin[3] + to[0] 
		// 		]
		// 		//改变css
		// 		dom.style.margin = status.margin.join('px ') + 'px';
		// 		return false;
		// 	}

		// 	doc.onmouseup = win.onblur = function() {
		// 		doc.onmousemove = doc.onmouseup = win.onblur = origin = margin = status =null;
		// 	}
		// }

		// // 改变大小
		// doc.getElementById('resize').onmousedown = function(e){


		// 	e = e || win.event;
		// 	var target = e.target || e.srcElement;
		// 	var status = config[config.status];

		// 	// 是否支持改变大小
		// 	if(target.tagName.toLowerCase() !== 'b' || !status.resizable) return;
			

		// 	var name = target.className,
		// 		rect = dom.getBoundingClientRect(),
		// 		form = [e.screenX,e.screenY],
		// 		client = [e.clientX,e.clientY],
		// 		dire = [
		// 			name.indexOf('t') > -1,
		// 			name.indexOf('r') > -1,
		// 			name.indexOf('b') > -1,
		// 			name.indexOf('l') > -1
		// 		],
		// 		margin = [
		// 			status.margin[0] - form[1],
		// 			status.margin[1] + form[0],
		// 			status.margin[2] + form[1],
		// 			status.margin[3] - form[0]
		// 		],
		// 		size = [
		// 			dom.offsetWidth,
		// 			dom.offsetHeight,
		// 		],
		// 		// 范围 -2px 容错，防抖动
		// 		range = [
		// 			form[0] - client[0] - rect.left ,
		// 			form[0] - client[0] - rect.left + window.parseFloat(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0) -2,
		// 			form[1] - client[1] - rect.top,
		// 			form[1] - client[1] - rect.top + window.parseFloat(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0) -2,
		// 		];

		// 	doc.onmousemove = function(e) {
		// 		//元素将移动到的位置
		// 		e = e || win.event;
		// 		var to = [e.screenX,e.screenY];

		// 		// 限制鼠标范围
		// 		to[0] = to[0] < range[0] ? range[0] :to[0] >range[1] ? range[1] :to[0];
		// 		to[1] = to[1] < range[2] ? range[2] :to[1] >range[3] ? range[3] :to[1];
			
				
		// 		status.size[0] =  dire[1] ? size[0] + to[0] - form[0] : dire[3] ? size[0] - to[0] + form[0] : status.size[0];
		// 		status.size[1] =  dire[0] ? size[1] - to[1] + form[1] : dire[2] ? size[1] + to[1] - form[1] : status.size[1];

		// 		// 最小宽度
		// 		status.size[0] = status.size[0] <100 ? 100 :status.size[0];
		// 		status.size[1] = status.size[1] <100 ? 100 :status.size[1];

		// 		status.margin[0] = dire[0] ? margin[0] + to[1] : status.margin[0];
		// 		status.margin[1] = dire[1] ? margin[1] - to[0] : status.margin[1];
		// 		status.margin[2] = dire[2] ? margin[2] - to[1] : status.margin[2];
		// 		status.margin[3] = dire[3] ? margin[3] + to[0] : status.margin[3];

		// 		dom.style.width =  status.size[0] +'px';
		// 		dom.style.height = status.size[1] +'px';
		// 		dom.style.margin = status.margin.join('px ') + 'px';

		// 		return false;
		// 	}

		// 	doc.onmouseup = win.onblur = function() {
		// 		doc.onmousemove = doc.onmouseup = win.onblur = dire =  margin = size = origin = status = null;
		// 	}
		// }

		// // 最大化，最小化，还原，关闭
		// doc.getElementById('view').onclick = function(e) {

		// 	e = e || win.event;
		// 	var target = e.target || e.srcElement;
		// 	var name = target.className;

		// 	target.tagName.toLowerCase() === 'i' && name !== config.status && status(name);

		// 	return false;
		// }

		// // enter 发送消息// 回车的浏览器兼容问题～～杀很大
		// doc.getElementById('enter').onkeypress = function(e) {
		// 	e = e || win.event;
		// 	var val;

		// 	if ( (e.keyCode==13||e.keyCode==10) && (val = this.innerHTML)){

		// 		commit(val);
		// 		this.innerHTML = '';
		// 		return false;
		// 	}
		// }

		// // 表情
		// doc.getElementById('tools_face').onclick = function(e){
		// 	e = e || win.event;
		// 	// 阻止默认冒泡
		// 	if (!e.stopPropagation) { //ie
		// 		e.cancelBubble = true;

		// 		//标准浏览器
		// 	} else { 
		// 		e.stopPropagation();
		// 	}

		// 	var face = doc.getElementById('tools_face_cnt')
		// 	face.style.display = face.style.display === 'block' ? 'none' :'block';
		// }

		// // 表情内容点击
		// doc.getElementById('tools_face_cnt').onclick = function(e){
		// 	e = e || win.event;
		// 	var tar = e.target || e.srcElement;
		// 	tar.tagName.toLowerCase() === 'img' && tar.src && insertEnter('<img src="'+tar.src+'" />');
		// }

		// // 抖动
		// doc.getElementById('tools_pop').onclick = shanke;



		// // 上传图片(直接上传到服务器缓存，方便实时聊天监控，当提交时，服务器保存图片)
		// doc.getElementById('tools_pic').getElementsByTagName('input')[0].onchange = function(){
		// 	this.parentNode.submit();
		// };

		// doc.getElementById('tools_pic').onsubmit = function(e){
		// 	e = e || win.event;

		// 	// 取图片放入输入框内；不进行反馈
		// 	insertEnter('<img src="'+tar.src+'" />');




		// 	// 异步上传图片
		// 	// doc.getElementById('iframe').onload = function(){


		// 	// 	console.log('load');

		// 	// }

		// 	// console.log('submit');
		// }

		// // 总代理
		// doc.onclick = function(){
		// 	doc.getElementById('tools_face_cnt').style.display = 'none';
		// }

	
		// dom.style.display = 'block';
		// return {
		// 	dom:dom,
		// 	win:win,
		// 	doc:doc,
		// 	status:status,
		// 	insertEnter:insertEnter,
		// 	insertChart:insertChart,
		// 	hide:function(){dom.style.display = 'none';},
		// 	show:function(){dom.style.display = 'block';},
		// 	commit:function(fuc){if( fuc && typeof(fuc) === 'function') commit = fuc;},
		// }
	})(window,document,config);

	


	// 消息轮询 服务器消息返回处理
	// var massage = (function(document,box,config){

	// 	var	interval = false,
	// 		loop = [];


	// 	// 轮询
	// 	var poll = (function(document,config){

	// 		var body = document.getElementsByTagName('body')[0],
	// 			url = config.domain +'/autochart.php?callback=geekeim&time=',
	// 			script = document.createElement('script');
	// 		body.appendChild(script);

	// 		return function(){
	// 			body.removeChild(script);
	// 			script = document.createElement('script');
	// 			script.src = url +(new Date()).getTime()+loop.join('');
	// 			body.appendChild(script);
	// 			loop.length = 0;
	// 		}
	// 	})(document,config);


	// 	box.commit(function(val){
	// 		loop.push('&msg=' + val);
	// 		box.insertChart({
	// 			type:'customer',
	// 			value:val,
	// 			time:(new Date).getTime()
	// 		});
	// 	});

	// 	// 聊天事件（唯一一个接口）
	// 	window[config.name] = function(json){
	// 		// 非空
	// 		if(!json || !json.type || json.type === 'emp') return ;

	// 		box.insertChart({
	// 			type:json.type,
	// 			value:json.value,
	// 			time:json.time || (new Date).getTime()
	// 		});	
	// 	}


	// 	return {
	// 		stop: function() {
	// 			interval = clearInterval(interval) && false;
	// 		},
	// 		start: function() {
	// 			interval = interval || setInterval(poll, config.speed);
	// 		}
	// 	}
	// })(document,box,config);

	


	// 本地存储
	// var localdata = (function(window,document) {
		
	// 	var data,usedata,stor,res={},name = window.location.hostname;


	// 	if (window.localStorage) {

	// 		stor = window.localStorage;
	// 		res.set = function(key, val) {
	// 			stor.setItem(key, val);
	// 		}
	// 		res.get = function(key) {
	// 			return stor.getItem(key) || '';
	// 		}
	// 		res.remove = function(key) {
	// 			stor.removeItem(key);
	// 		}
	// 	} else {

	// 		usedata = (function(){
	// 			data = document.createElement('span');
	// 			data.style.cssText = 'position:absolute;top:-1000em;behavior:url("#default#userData")';
	// 			document.body.appendChild(data);
	// 			data.load(name);
	// 			return arguments.callee;
	// 		})();

	// 		res.set = function(key, val) {
	// 			data.parentNode.removeChild(data);
	// 			usedata();
	// 			data.setAttribute(key, val);
	// 			data.save(name);
	// 		}

	// 		res.get = function(key) {
	// 			data.parentNode.removeChild(data);
	// 			usedata();
	// 			return data.getAttribute(key) || '';
	// 		}
	// 		res.remove = function(key) {
	// 			data.removeAttribute(key);
	// 			data.save(name);
	// 		}
	// 	}

	// 	return res;
	// })(window,document);




	// 页面事件  有延迟，
	// var page = (function(document){

	// 	var res = {};
	// 	res.visible = function(){}
	// 	res.hidden = function(){}
	// 	res.last = true;

	// 	var hide, evnt;
	// 	if (typeof document.hidden !== "undefined") {
	// 		hide = "hidden";
	// 		evnt = "visibilitychange";
	// 	} else if (typeof document.mozHidden !== "undefined") {
	// 		hide = "mozHidden";
	// 		evnt = "mozvisibilitychange";
	// 	} else if (typeof document.msHidden !== "undefined") {
	// 		hide = "msHidden";
	// 		evnt = "msvisibilitychange";
	// 	} else if (typeof document.webkitHidden !== "undefined") {
	// 		hide = "webkitHidden";
	// 		evnt = "webkitvisibilitychange";
	// 	}

	// 	if(hide){
	// 		document.addEventListener(evnt,function(){ if(!document[hide]){res.visible();}else{res.hidden();}}, false); 
	// 	}else{

	// 		var time = 0;
	// 		var isin = false;

	// 		document.onfocusin = function(){
	// 			if((new Date).getTime() - time - 5 <0){
	// 				isin = true;
	// 			}else{
	// 				setTimeout(function(){res.visible();},8);
	// 			}
	// 		}
	// 		document.onfocusout = function(){

	// 			time = (new Date).getTime();
	// 			setTimeout(function(){
	// 				if(isin){isin = false;}
	// 				else{res.hidden();}
	// 			},8);
	// 		}
	// 	}
	// 	return res;
	// })(document);


	




	// // 页面跟踪
	// var track = (function(){

	// 	var page_id 	= name+'_pageId';
	// 	var enter_value = name+'_enterValue';
	// 	var chart_value = name+'_chartValue';
	// 	var time = '';  //操作日志
	// 	var log;
		



	// 	// test 重置本地存储为空///////////////////////////////////////////////////////////
	// 	localdata.set(chart_value,'');
	// 	/////////////////////////////////////////////////////////

	// 	var listenUpdata = function(data){
	// 		time = data.time;
	// 	}

	// 	var listenCommit = function(data){
	// 		time = data.time;
	// 		var append = '{'+data.time+','+data.type+','+data.cont+'}';
	// 		log += append;
	// 		localdata.set(chart_value,log);
	// 	}


	// 	// 更新数据
	// 	var updata = (function(){

	// 		var str = log = localdata.get(chart_value),t = time,split,res;

	// 		// 监听更新;
	// 		chart.insertEvent(listenUpdata);

	// 		// 聊天内容没有更新
	// 		if( t && !(str = str.split(t)[1])){
	// 			chart.insertEvent(listenCommit);
	// 			return ;
	// 		}

	// 		if(res = str.match(/\{.+?\}/gi)){
	// 			for(var i=0,l=res.length;i<l;i++){
	// 				split = res[i].replace(/[\{\}]/g,'').split(',');
	// 				msg.chart({time:split[0],type:split[1],cont:split[2]});
	// 			}	
	// 		}

	// 		chart.insertEvent(listenCommit);
	// 		return arguments.callee;
	// 	})();

		
	// 	var visible = function(){

	// 		msg.start();
	// 		localdata.set(page_id,'0');
	// 		enter.setHtml(unescape(localdata.get(enter_value)));
	// 		updata();
	// 	}

	// 	var hidden = function(){
			
	// 		msg.stop();
	// 		localdata.set(page_id,'1');
	// 		localdata.set(enter_value,escape(enter.getHtml()));

	// 		// 全部失去焦点前最后一个页面; 保持有且只有一个轮询
	// 		setTimeout(function(){
	// 			if(parseInt(localdata.get(page_id)) === 1){
	// 				msg.start();
	// 			}
	// 		},300);
	// 	}

		
	// 	var hide, visi;
	// 	if (typeof document.hidden !== "undefined") {
	// 		hide = "hidden";
	// 		visi = "visibilitychange";
	// 	} else if (typeof document.mozHidden !== "undefined") {
	// 		hide = "mozHidden";
	// 		visi = "mozvisibilitychange";
	// 	} else if (typeof document.msHidden !== "undefined") {
	// 		hide = "msHidden";
	// 		visi = "msvisibilitychange";
	// 	} else if (typeof document.webkitHidden !== "undefined") {
	// 		hide = "webkitHidden";
	// 		visi = "webkitvisibilitychange";
	// 	}

	// 	if(hide){
	// 		addEvent(document,visi,function(){
	// 			if(!document[hide])
	// 				visible();
	// 			else
	// 				hidden();
	// 		});
	// 	}else{

	// 		var focus_time = 0;
	// 		var isin = false;

	// 		document.onfocusin = function(){
	// 			var time = (new Date).getTime();
	// 			if((time - focus_time) <5){
	// 				isin = true;
	// 			}else{
	// 				setTimeout(function(){visible();},8);
	// 			}
	// 		}
	// 		document.onfocusout = function(){

	// 			focus_time = (new Date).getTime();
	// 			setTimeout(function(){
	// 				if(isin){isin = false;}
	// 				else{hidden();}
	// 			},8);
	// 		}
	// 	}
	// })();

	






	// massage.start();
	// box.status('original');
	// box.show();

	// localdata.set('fuck','day');
	// console.log(localdata.get('fuck'));



	/*** 功能 ***/
	// 窗口状态：最大化，最小化，还原，关闭
	// 窗口大小调整
	// 表情
	// 本地存储聊天记录
	// 实时页面追踪
	// 聊天记录无缝衔接
	// 客服状态
	// 浏览器提示
	// 弹出
	// 切换客服
	// 抖动


	// 上传文件 文件预览 拖动上传 ，粘贴
	// 屏幕剪截
	// 语音
	// 视频



	



})(window, document);

