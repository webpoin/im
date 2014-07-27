/*for test */
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
var test = document.getElementById('test');
/******************/



if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis ? this: oThis || window,aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

var WEBIM = (function(window){
	
	//工具对象
	var tool = (function(){
		var target; 

		var create = function(tagname){
			var tag = document.createElement(tagname);
			this.appendChild(tag);
			return tag;
		}
		
		if(document.all){
			target = function(){
				return window.event.srcElement;
			} 
		}else{
			target = function(){
				return arguments[0].target;
			}
		}

		var attr = function(){

			var l = arguments.length;
			if( l=== 1){
				this.getAttribute(arguments[0]);
			}else if(l=== 2){

				if(arguments[0] === 'class'){
					this.className = arguments[1];
				}else{
					this.setAttribute(arguments[0],arguments[1]);
				}
			}
		}

		return {
			create:create
			,attr:attr
			,target:target
			,createWithclass:function (parent,tagname,className){
				var tag = create.call(parent,tagname);
				if(className){attr.call(tag,'class',className);}
				
				return tag;
			}
			,createWithhtml:function(parent,value){
				var div = document.createElement('div');
					div.innerHTML = value;
				var child = div.childNodes[0];
				parent.appendChild(child);
				div = null;
				return child;
			}
		}
	})();


	var CREATE = function(){

		/*************创建html 获取dom句柄*************************/

		for(var i=1,img='';i<30;i++){
			img += '<img src="images/'+i+'.gif"/>';
		}

		this.con_box 	= tool.createWithclass(document.body,'div','webim'),	//主体
		this.con_bkg	= tool.createWithclass(this.con_box,'div','webim_bkg'),		//背景
		this.con_title 	= tool.createWithclass(this.con_box,'div','webim_tle'),		//头部信息框
		this.con_chart	= tool.createWithclass(this.con_box,'div','webim_cht'),		//聊天框
		this.con_enter	= tool.createWithclass(this.con_box,'div','webim_ent'),		//输入框
		this.con_company= tool.createWithclass(this.con_box,'div','webim_com'),		//企业信息框
		this.con_operat = tool.createWithclass(this.con_title,'div','webim_operat'),//窗口控制链接框
		this.con_tool 	= tool.createWithclass(this.con_box,'div','webim_tol'),		//表情等工具框

		//窗口控制按钮
		this.btn_minsize = tool.createWithhtml(this.con_operat,'<b class="webim_min" title="最小化"><i>&nbsp;</i></b>'),
		this.btn_maxsize = tool.createWithhtml(this.con_operat,'<b class="webim_max" title="最大化"><i>&nbsp;</i></b>'),
		this.btn_normal  = tool.createWithhtml(this.con_operat,'<b class="webim_nor" title="还原"><i>&nbsp;</i></b>'),
		this.btn_closed  = tool.createWithhtml(this.con_operat,'<b class="webim_clo" title="关闭"><i>&nbsp;</i></b>');
		
		//表情等交互
		this.con_face 	= tool.createWithclass(this.con_tool,'div','webim_fac'),
		this.btn_face_ico= tool.createWithhtml(this.con_face,'<i>&nbsp;</i>'),
		this.con_face_blo= tool.createWithhtml(this.con_face,'<div>'+img+'</div>'),

		//字体
		this.con_font	= tool.createWithclass(this.con_tool,'div','webim_fon'),
		this.btn_font_ico= tool.createWithhtml(this.con_font,'<i>&nbsp;</i>'),
		this.con_font_blo= tool.createWithclass(this.con_font,'div'),
		this.btn_font_family	= tool.createWithhtml(this.con_font_blo,'<select><option>微软雅黑</option><option>宋体</option><option>楷体</option><option>黑体</option><option>Arial</option><option>MS Mincho</option><option>PMingLiU</option><option>Tahoma</option><option>Verdana</option></select>'),
		this.btn_font_size	= tool.createWithhtml(this.con_font_blo,'<select><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option></select>'),
		this.con_font_weight	= tool.createWithhtml(this.con_font_blo,'<b>B</b>'),
		this.con_font_style	= tool.createWithhtml(this.con_font_blo,'<em>I</em>'),
		this.con_font_unline	= tool.createWithhtml(this.con_font_blo,'<u>U</u>'),

		//图片
		this.con_pic		= tool.createWithclass(this.con_tool,'div','webim_pic'),
		this.btn_pic_ico	= tool.createWithhtml(this.con_pic,'<i>&nbsp;</i>');
		this.fam_pic		= tool.createWithhtml(this.con_pic,'<iframe style="border:none;"></iframe>');
		var doc = this.fam_pic.contentWindow.document;
		doc.open();
		doc.writeln('<!DOCTYPE HTML><html><style>html,body{width:100%;height:100%;padding:0;margin:0;}</style><body></body></html>'); 
     	doc.close(); 
	}

	var MOVE = function(box,title){
		var ie6		=!-[1,]&&!window.XMLHttpRequest,
		class_prefix= 'webim webim_',
		__mousemove = document.onmousemove,		//保存鼠标移动事件
		__mouseup 	= document.onmouseup;			//保存鼠标放开事件

		var winsize = (function(){
			var getwin;
			if(window.width){
				getwin = function(){
					return [parseInt(window.innerWidth),parseInt(window.innerHeight)];
				}
			}else{
				getwin = function(){
					return [parseInt(document.documentElement.clientWidth),parseInt(document.documentElement.clientHeight)];
				}
			}
			return getwin;
		})();

		var position = (function(){
			var posn;
			if(ie6){
				posn = function(x,y){
					box.style.left= x + document.documentElement.scrollLeft+ "px";
					box.style.top = y + document.documentElement.scrollTop+ "px";
				}
			}else{
				posn = function(x,y){
					box.style.left= x + "px";
					box.style.top = y + "px";
				}
			}
			return posn;
		})();

		var move = function(event){

	
			event = event || window.event;
			var win = winsize();							//浏览器显示区域的宽度,高度(去滚动条宽度)
			var mouseX = parseInt(event.clientX);			//鼠标位置的横坐标
			var mouseY = parseInt(event.clientY);			//鼠标位置的纵坐标
			var posn = [this[this.status].posn[0],this[this.status].posn[1]];
			var size = [this[this.status].size[0],this[this.status].size[1]];
			var x,y;

			document.onmousemove = function(event){
			
				event = event || window.event; 
				//元素将移动到的位置
				x = parseInt(event.clientX) - mouseX + posn[0];
				y = parseInt(event.clientY) - mouseY + posn[1];

				//将移动限制在页面内
				x = x < 0 ? 0 : (x >(win[0] - size[0])  ? win[0] - size[0] : x);
				y = y < 0 ? 0 : (y >(win[1] - size[1])  ? win[1] - size[1] : y);

				position(x,y);

				//保存位置
				this[this.status].posn = [x,y];

			}.bind(this);

		

			document.onmouseup = function(){
				//还原内容，清除痕迹
				//document.onmouseup = null;
				//document.onmousemove = null;
				document.onmousemove = __mousemove;			//还原鼠标移动事件
				document.onmouseup = __mouseup;				//还原鼠标放开事件
				return true;
			}.bind(this);
			
			return false;	
		}.bind(this);

		var addStatus = function(status){

			//生成状态函数
			this[status.name] = function(){

				var posn,size;

				//设置为当前状态
				this.status = status.name;

				if(this[status.name].size && this[status.name].posn){
					size = this[status.name].size;
					posn = this[status.name].posn;
				}else{
					this[status.name].size = size = status.size;
					this[status.name].posn = posn = status.posn;
				}

				//this.dom_box.style.display = 'none';

				box.className 	 = class_prefix+ this.status;
				position(posn[0],posn[1]);
				box.style.width = size[0] + 'px';
				box.style.height= size[1] + 'px';

				//this.dom_box.style.display = 'block';

				//移动
				if(status.move){
					title.onmousedown = move
				}
			}
		}.bind(this);



		var win = winsize();
		
		addStatus({			//添加状态  标准模式
			 'name':'standard'		//css class 后缀
			,'size': [580,517]		//大小
			,'posn': [(win[0]-580)/2,(win[1]-517)/2] //位置
			,'move': true
		});
	
		addStatus({			//添加状态  最大化
			 'name':'maximize'		//css class 后缀
			,'size': [win[0],win[1]]		//全屏
			,'posn': [0,0] 			//位置
			,'move': false
		});
		addStatus({			//添加状态  最小化
			 'name':'minimize'		//css class 后缀
			,'size': [237,152]		//大小
			,'posn': [win[0]-237,win[1]-152]   //默认右下角
			,'move': true
		});
		addStatus({			//添加状态  关闭
			 'name':'closed'		//css class 后缀
			,'size': [100,300]		//大小
			,'posn': [0,(win[1]-100)/2]//默认贴左，垂直居中 //位置
			,'move': true
		});


		if(ie6){
			window.attachEvent('onscroll',function(){
				box.style.top = document.documentElement.scrollTop + this[this.status].posn[1]+ 'px';
			}.bind(this));
		}


		this.shake = function(){
			var shakebox = box;
			var posn = this[this.status].posn;
			var css=['left','top'],i=0,c,s;
			var interval=setInterval(function(){
				c = i%2;
				s = (i++)%4 <2 ? 0:4;
				shakebox.style[css[c]] = (posn[c] - s) + 'px'; 

				if(i>17){
					clearInterval(interval);
					i=0;
				}
			},30);
		}
		this.moveTo = function (argument) {
			
		}
	}
	
	var EDITOR = function(node,keypress){

		/*添加事件*/ 
		var addEvent= (function() {
			if (document.addEventListener) {
				return function(node, e, fun){node.addEventListener(e, fun, false);}
			} else if (document.attachEvent) {
				return function(node, e, fun){node.attachEvent("on" + e, fun);}
			} else {
				return function(node, e, fun){node["on" + e] = fun;}
			}
		})();



		//创建editor
		var iframe = document.createElement('iframe');
		//iframe.style.cssText = 'white-space: nowrap;';
		node.appendChild(iframe);

		//editor 内容主体
		var win = iframe.contentWindow;
		var doc = win.document;
		
		doc.designMode = 'On'; 
     	doc.contentEditable = true; 
     	doc.open(); 
     	doc.writeln('<!DOCTYPE HTML><html><style>html,body{width:100%;height:100%;padding:0;margin:0;}</style><body></body></html>'); 
     	doc.close(); 
 
     	
     	doc.body.setAttribute('spellcheck',false);



     	//监听keypress 事件
     	if(keypress && typeof(keypress) === 'function'){addEvent(doc.body,'keypress',keypress);}


     	//兼容ie的inserhtml问题
		var ie = !!document.all;
		var range = false;
		var setRange = function(){range = doc.selection.createRange();}

		if(ie){
			addEvent(doc.body,'keypress',setRange);
			addEvent(doc.body,'click',setRange);
		}
		var insertHtml =  ie ? function (html){

			win.focus();
			if(range){
				range.pasteHTML(html); 
				range.select();
			}else{
				doc.body.innerHTML += html;
				setRange();
			}
			
		} : function(html){
			win.focus();
			doc.execCommand('insertHtml',false,html);
			console.log(html);
		}



		//未完成：回车各种不兼容问题



		this.insertHtml = insertHtml;

		this.insertImage = function(src){
			insertHtml('<img src="'+src+'" />');
		}
		this.insertText = function(text){
			insertHtml(text);
		}


		
     	this.setStyle=function(name,val){
			doc.body.style[name] = val;
		}
		this.getStyle =function(){
			return doc.body.getAttribute('style');
		}

		this.clear = function(){
			var res = doc.body.innerHTML;
			doc.body.innerHTML = '';
			return res;
		}

		this.getContent = function(){
			return body.innerHTML;
		}
	}

	var CHART = function(node){

		var prefix = 'webim_';
		var style = {};

		this.setStyle = function(name,sta){
			style[name] = sta;
			
		}

		this.send = function(str,class_name){

			if(str === '') return false;
			var div = document.createElement('div');
			if(class_name){
				div.setAttribute('class',prefix+class_name);
			}

			for(var i in style){div.style[i] = style[i];}
			//div.innerHTML = '<pre>'+str+'</pre>';
			div.innerHTML = str

			node.appendChild(div);
		}
	}



	var im = function(init){

		var create 	= new CREATE(init);
		var move 	= new MOVE(create.con_box,create.con_title);
		var chart 	= new CHART(create.con_chart);
		var editor 	= new EDITOR(create.con_enter,
				function(e){
					//ctrl + enter 键提交
					if(e.ctrlKey&&(e.keyCode==13||e.keyCode==10)){chart.send(editor.clear(),'customer');}
				}
			);


		//初始化大小
		move.standard();	
		//绑定事件
		create.btn_minsize.onclick = function(){move.minimize()};
		create.btn_maxsize.onclick = function(){move.maximize()};
		create.btn_normal.onclick  = function(){move.standard()};
		create.btn_closed.onclick  = function(){move.closed()};

		//表情
		create.btn_face_ico.onclick = function(e){
			
			var sta = create.con_face_blo.style.display;
			if(sta === 'block' ){
				this.removeAttribute('class');
				create.con_face_blo.style.display = 'none';
			}else{
				this.setAttribute('class','on');
				create.con_face_blo.style.display = 'block';
			}
		}
		create.con_face_blo.onclick = function(){
			var e = tool.target(arguments[0]);	
			if(e.src){
				editor.insertImage(e.src);
				create.con_face_blo.style.display = 'none';
				create.btn_face_ico.removeAttribute('class');
			}
		}


		//文字
		create.btn_font_ico.onclick = function(){

			var sta = create.con_font_blo.style.display
			if(sta === 'block' ){
				this.removeAttribute('class');
				create.con_font_blo.style.display = 'none';
			}else{
				this.setAttribute('class','on');
				create.con_font_blo.style.display = 'block';
			}
		}

		//字体
		create.btn_font_family.onchange = function(){
			var select = this.options[this.selectedIndex].text;
			editor.setStyle('fontFamily',select);
			chart.setStyle('fontFamily',select);
		}

		//字号
		create.btn_font_size.onchange = function(){
			var select = this.options[this.selectedIndex].text;
			editor.setStyle('fontSize',select+'px');
			chart.setStyle('fontSize',select+'px');
		}

		//加粗
		create.con_font_weight.onclick = function(){

			if(this.getAttribute('class') === 'on'){
				editor.setStyle('fontWeight','normal');
				chart.setStyle('fontWeight','normal');
				this.removeAttribute('class');
			}else{
				editor.setStyle('fontWeight','bold');
				chart.setStyle('fontWeight','bold');
				this.setAttribute('class','on');
			}
		}

		//斜体
		create.con_font_style.onclick = function(){

			if(this.getAttribute('class') === 'on'){
				editor.setStyle('fontStyle','normal');
				chart.setStyle('fontStyle','normal');
				this.removeAttribute('class');
			}else{
				editor.setStyle('fontStyle','italic');
				chart.setStyle('fontStyle','italic');
				this.setAttribute('class','on');
			}
		}

		//下划线
		create.con_font_unline.onclick = function(){

			if(this.getAttribute('class') === 'on'){
				editor.setStyle('textDecoration','none');
				chart.setStyle('textDecoration','none');
				this.removeAttribute('class');
			}else{
				editor.setStyle('textDecoration','underline');
				chart.setStyle('textDecoration','underline');
				this.setAttribute('class','on');
			}
		}






		//图片上传
		var createInput = function (iframe){
			var doc = iframe.contentWindow.document;

			var body = doc.body;
				body.style.cssText = 'margin:0;';

			var form = doc.createElement('form');
				form.action = 'http://localhost/webim/pic.php';
				form.method = 'post';
				form.enctype ='multipart/form-data';

			var file = doc.createElement('input');
				//file.style.cssText = 'cursor:pointer;margin:-5px 0 0 -5px;padding:0;height:50px;*width:50px;';
				file.type = 'file';
				//file.value = 'fuck';
				file.name = 'pic';
				file.onchange = function(){
					form.submit();
				}

			body.appendChild(form);
			form.appendChild(file);


			return arguments.callee;
		}(create.fam_pic);


		/*
		var pic = create.fam_pic
		if (pic.attachEvent){
		    pic.attachEvent("onload", function(){
		    	editor.insertImage(this.contentWindow.document.body.innerHTML);
		    	createInput(pic);
		    });
		} else {
		    pic.onload = function(){
		        editor.insertImage(this.contentWindow.document.body.innerHTML);
		        createInput(pic);
		    };
		}

		//var doc = create.fam_pic.contentWindow.document;

			
		//test.innerHTML = doc.body.innerHTML;

/*

		var iframe = create.fam_pic;
		makePic(create.fam_pic);
		if (iframe.attachEvent){
		    iframe.attachEvent("onload", function(){
		    	editor.insertImage(this.contentWindow.document.body.innerHTML);
		    	makePic(iframe);
		    });
		} else {
		    iframe.onload = function(){
		        editor.insertImage(this.contentWindow.document.body.innerHTML);
		        makePic(iframe);
		    };
		}


		function makePic(iframe){
			var iframe_body = iframe.contentWindow.document.body;
				//iframe_body.innerHTML = '';
				iframe_body.style.cssText = 'margin:0;padding:0;';

			var form = document.createElement('form');

				form.action = 'http://localhost/webim/pic.php';
				form.method = 'post';
				form.enctype ='multipart/form-data';
			var pic = document.createElement('input');
				pic.style.cssText = 'cursor:pointer;';
				pic.type = 'file';
				pic.name = 'pic';
				pic.onchange = function(){
					form.submit();
				}

			form.appendChild(pic);
			iframe_body.appendChild(form);


		}
/****/

	}
	im.prototype = {
		 send:function(){}
		,shake:function(){this.move.shake();}
		,status:function(){return move.status;}
		,normal:function(){move.standard();}
		,minimize:function(){move.minimize();}
		,maximize:function(){move.maximize();}
		,closed:function(){move.closed();}
		,pop:function(){move.standard();move.shake();}
	}

	return im;

})(window);


var im = new WEBIM();


//img.send


var style = {fuck:'afese'}




//document.getElementById('test').innerHTML = document.getElementById('test').getAttribute('style').fontFamily;

document.getElementById('test').onclick = function(event){
		//im.shake();
		//console.log(event);
}








