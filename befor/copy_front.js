function getClass(className,parentElement) {
	if (typeof parentElement == 'string'){
	    parentElement = document.getElementById(parentElement);
	} else if (typeof parentElement != 'object' || typeof parentElement.tagName != 'string') {
	    parentElement = document.body;
	}

  	var children = parentElement.getElementsByTagName('*');
  	var re = new RegExp('\\b' + className + '\\b');
  	var element, elements = [],i=0;
  
  	while ( (element = children[i++]) ){
    	if ( re.test(element.className)){
      		elements.push(element);
    	}
  	}  	
  	return elements;

}



function getStyle(node,styleName){
	var realStyle = null;
	if(node.currentStyle){
		realStyle = node.currentStyle[styleName];
	}else if(window.getComputedStyle){
		realStyle = window.getComputedStyle(node,null)[styleName];
	}
	return realStyle;
}




function webim(init){
	//初始化

	/***
		创建内容
	**/

	this.class_prefix = 'webim_';	//css 前缀
	this.removable = true;			//可移动
	this.resizable = true;			//可改变大小
	this.fun_input = function(w){console.log(w);}	//用户输入触发的事件
	this.func_submit = function(w){console.log(w)}
	this.short_key = 10;			//用户发送消息快捷键 的按键码




	webim_ipu.document.designMode = 'on';

	this.enter = document.getElementById('webim_ipu').contentWindow;
	var editor = this.enter.document.body;
		editor.setAttribute('contenteditable','true');
		editor.setAttribute('spellcheck','false');
		editor.style.cssText = 'margin:5px;underline:none';


	//console.log(this.enter.innerHTML);


	//im 页面内元素
	this.dom_box = getClass('webim',document.body)[0],		//主体框
	this.dom_tle = getClass('webim_tle',this.dom_box)[0]	//头部
	this.dom_cht = getClass('webim_cht',this.dom_box)[0];	//内容展示
	this.dom_ipu = editor;									//输入框
	this.dom_sub = getClass('webim_sub',this.dom_box)[0];	//提交按钮
	this.dom_tol = getClass('webim_tol',this.dom_box)[0];	//表情栏
	this.dom_ima = getClass('webim_ima',this.dom_box)[0];	//企业形象
	this.dom_min = getClass('webim_min',this.dom_box)[0];	//最小化窗口按钮
	this.dom_sta = getClass('webim_sta',this.dom_box)[0];	//标准窗口按钮
	this.dom_max = getClass('webim_max',this.dom_box)[0];	//最大化窗口按钮
	this.dom_clo = getClass('webim_clo',this.dom_box)[0];	//关闭窗口按钮


	var that = this;
	/*****		添加状态	*****/
	this.addStatus({			//添加状态  标准模式
		 'name':'standard'		//css class 后缀
		,'size': [580,517]		//大小
		,'posn':  [(parseInt(document.body.offsetWidth)-580)/2,(parseInt(window.innerHeight)-517)/2] //位置
		,'goin': function(){	//进入状态后执行的函数
					if(that.removable){that.dom_tle.onmousedown = function(){return that.move();}}
				}
	});
	this.addStatus({			//添加状态  最大化
		 'name':'maximize'		//css class 后缀
		,'size': [parseInt(document.body.offsetWidth),parseInt(window.innerHeight)]		//全屏
		,'posn': [0,0] 			//位置
		,'goin': function(){	//进入状态后执行的函数
					that.dom_tle.onmousedown = null;
				}
	});
	this.addStatus({			//添加状态  最小化
		 'name':'minimize'		//css class 后缀
		,'size': [237,152]		//大小
		,'posn':  [parseInt(document.body.offsetWidth)-237,parseInt(window.innerHeight)-152]   //默认右下角
		,'goin': function(){	//进入状态后执行的函数
					if(that.removable){that.dom_tle.onmousedown = function(){return that.move();}}
				}
	});
	this.addStatus({			//添加状态  关闭
		 'name':'closed'		//css class 后缀
		,'size': [100,300]		//大小
		,'posn': [0,(parseInt(window.innerHeight)-100)/2]//默认贴左，垂直居中 //位置
		,'goin': function(){	//进入状态后执行的函数
					if(that.removable){that.dom_tle.onmousedown = function(){return that.move();}}
				}
	});


	this.dom_min.onclick = function(){that.minimize();}			//最小化
	this.dom_sta.onclick = function(){that.standard();}			//标准
	this.dom_max.onclick = function(){that.maximize();}			//最大化
	this.dom_clo.onclick = function(){that.closed();}			//关闭
	this.dom_sub.onclick = function(){that.submit();}			//提交

	

	//初始化
	this.init();
}
webim.prototype = {
	test:function(){
		//alert(this.fuck);
		//this.removable='fuck';
		console.log(this.standard.size);
	}
	//初始化
	,init:function(){
		var that = this;
		this.enter.onfocus = function(){that.autoSubmit();}			//快捷键方式提交
	}

	//移动函数
	,move:function(event){

		event = event || window.event;
		var mouseX = parseInt(event.clientX);			//鼠标位置的横坐标
		var mouseY = parseInt(event.clientY);			//鼠标位置的纵坐标
		var winW = parseInt(document.body.offsetWidth);	//浏览器显示区域的宽度(去滚动条宽度)
		var winH = parseInt(window.innerHeight);		//浏览器显示区域的高度
		var position = [this[this.status].posn[0],this[this.status].posn[1]];
		var size = [this[this.status].size[0],this[this.status].size[1]];
		var x,y,that = this;

		var __mousemove 	= window.onmousemove;		//保存鼠标移动事件
		var __mouseup 		= window.onmouseup;			//保存鼠标放开事件

		
		//console.log('winW:'+winW+' winH:'+winH+' domW:'+size[0]+' domH:'+size[1]);
		window.onmousemove = function(event){

			//元素将移动到的位置
			x = parseInt(event.clientX) - mouseX + position[0];
			y = parseInt(event.clientY) - mouseY + position[1];

			//将移动限制在页面内
			x = x < 0 ? 0 : (x >(winW - size[0])  ? winW - size[0] : x);
			y = y < 0 ? 0 : (y >(winH - size[1])  ? winH - size[1] : y);

			//改变css
			that.dom_box.style.left= x + "px";
			that.dom_box.style.top = y + "px";

			//保存位置
			that[that.status].posn = [x,y];
		}

		window.onmouseup = function(){

			//还原内容，清除痕迹
			window.onmousemove = __mousemove;			//还原鼠标移动事件
			window.onmouseup = __mouseup;				//还原鼠标放开事件
			return true;
		}

		return false;	
	}

	//抖动窗口
	,shake:function(){			
		var box = this.dom_box;
		var posn = this[this.status].posn;
		var css=['left','top'],i=0,c,s;

		var interval=setInterval(function(){
			c = i%2;
			s = (i++)%4 <2 ? 0:4;
			box.style[css[c]] = (posn[c] - s) + 'px'; 

			if(i>17){
				clearInterval(interval);
				i=0;
			}
		 },30);

	}
	//弹出窗口->标准窗口+抖动
	,pop:function(){				
		this.winStandard();
		this.shake();
	}


	//状态改变事件
	,addStatus:function(status){

		//生成状态函数
		this[status.name] = function(){

			var posn,size;

			//设置状态
			this.status = status.name;

			if(this[status.name].size && this[status.name].posn){
				size = this[status.name].size;
				posn = this[status.name].posn;
			}else{
				this[status.name].size = size = status.size;
				this[status.name].posn = posn = status.posn;
			}


			this.dom_box.style.display = 'none';

			this.dom_box.setAttribute('class',this.class_prefix+ this.status);
			this.dom_box.style.left  = posn[0] + 'px';
			this.dom_box.style.top 	 = posn[1] + 'px';
			this.dom_box.style.width = size[0] + 'px';
			this.dom_box.style.height= size[1] + 'px';

			this.dom_box.style.display = 'block';

			//移动
			if(status.goin && typeof(status.goin) === 'function'){
				status.goin();
			}
		}
	}

	//发送信息
	,send:function(msg,class_name){
		var div = document.createElement('div');
			if(class_name){
				div.setAttribute('class_name',class_name);
			}
			div.innerHTML = '<pre>'+msg+'</pre>';
		//console.log(msg)
		this.dom_cht.appendChild(div);


	}
	,submit:function(){

		var msg = this.dom_ipu.innerHTML;

		if(msg === ''){return false;}	//判断不为空

		this.send(msg,'customer');
		
		this.func_submit();

		this.dom_ipu.innerHTML = '';

	}
	,autoSubmit:function(){

		var that = this;
		this.enter.document.onkeypress = function(e){ 
			if(e.which == this.short_key){
				that.submit();
			}
		}

		if(typeof(this.fun_input) === 'function'){
			this.enter.onkeyup = function(){that.fun_input(that.dom_ipu.innerHTML);}
		}
	}
	

}



var im = new webim;



/*
var chart = getClass('webim',document.body)[0];
var title =  getClass('webim_title',this.dom_box)[0];
var minsize = getClass('webim_min',title)[0];

var input = function(){
	console.log('input')
}
var submit = function(){
	console.log('submit')
}


//不可定制，只允许设置参数
var im = new webim({
	//domt_chart	: chart				//type:document主体框
	//,domt_show	:showarea
	//,domt_input	:inputarea
	//,domt_movetrg 	: title	//type:document解发移动的元素【默认为true】
	 boon_show      : 'maximize'		//默认显示状态【最大化，最小化，关闭，标准】
	,boon_movable 	: true		//type:bloolean是否可移动【默认为true】
	,boon_resizable : true		//type:bloolean可改变大小【默认为true】
	,func_input 	:input			//type:function用户输入事件触发
	,func_submit	:submit			//type:function用户提交事件触发
	
	,minsize:{name:'minsize',domt:minsize,size:[150,80],posn:[-1,-1]}//最小化参数
	//最大化窗口参数
	//标准窗口参数
	//关闭窗口参数
	//
});

*/





im.standard();	//显示标准窗口
//im.winMinimize();
//im.winMaximize();
//im.winClosed();

//im.test();

	
	
	
	//webim_editer.document.designMode = 'on';





	var div = document.createElement('div');
	div.innerHTML = '你打我呀';
	div.onclick = function(){
		im.shake();
	}
	document.body.appendChild(div);
//im.test();

/*

*/
