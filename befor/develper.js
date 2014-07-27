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



function getChild(node){
	var child = node.childNodes;
	//console.log(child)
	var res = [];
	for(var i=0,l=child.length;i<l;i++){
		if(child[i].nodeType === 1) res.push(child[i]);
	}
	return res;
}





function EDITOR(eit){
	
	//创建editor
	var id = (new Date).getTime();
	var editor = document.createElement('iframe');
	editor.id = id;
	eit.parent.appendChild(editor);
	window[id].document.designMode = 'on';


	//editor 内容主体
	this.window = editor.contentWindow
	this.body = this.window.document.body;


	if(eit.keyup && typeof(eit.keyup) === 'function'){
		this.keyUp = eit.keyup;
	}
	if(eit.keypress && typeof(eit.keypress) === 'function'){
		this.keyPress = eit.keypress;
	}

	//初始化
	this.init();
}

EDITOR.prototype = {
	init:function(){
		this.body.setAttribute('contenteditable','true');
		this.body.setAttribute('spellcheck','false');
		//this.body.style.cssText = 'margin:5px;';

		var that = this;

		this.window.onfocus = function(){
			this.onkeyup = that.keyUp;
			this.onkeypress = that.keyPress;		
		}
	}
	,setStyle:function(name,val){

		this.body.style[name] = val;
		//this.body.style.cssText = str;
	}
	,getStyle:function(){
		return this.body.getAttribute('style');
	}
	,clear:function(){
		var res = this.body.innerHTML;
		this.body.innerHTML = '';
		return res;
	}
	,getContent:function(){
		return this.body.innerHTML;
	}
	,keyPress:function(e){}
	,keyUp:function(e){}
	,insertText:function(text){
		this.window.focus();
        //if ie
              //insert the given text
        //    this.enter.document.body.focus();
        //      range = this.enter.document.selection.createRange();
        //      range.pasteHTML('inputText');
        //      range.collapse(false);
        //      range.select();

        //this.enter.document.execCommand('insertText', true, '-------------');
       this.window.document.execCommand('insertText',true, text);
        //this.enter.document.execCommand('InsertHtml',false, '<b>agsefe</b>');
	}
	,insertImage:function(src){
		this.window.focus();
       	this.window.document.execCommand('insertImage',true, src);
        //this.enter.document.execCommand('InsertHtml',false, '<b>agsefe</b>');
	}
	,insertHtml:function(html){
		this.window.focus();
        this.window.document.execCommand('InsertHtml',false, html);
	}
}



function MOVE(box,tle){


	this.dom_box = box;
	this.dom_tle = tle;
	this.class_prefix = 'webim webim_';
	var that = this; 
	/*****		添加状态	*****/
	this.addStatus({			//添加状态  标准模式
		 'name':'standard'		//css class 后缀
		,'size': [580,517]		//大小
		,'posn':  [(parseInt(document.body.offsetWidth)-580)/2,(parseInt(window.innerHeight)-517)/2] //位置
		,'goin': function(){	//进入状态后执行的函数
					that.dom_tle.onmousedown = function(){return that.move();}
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
					that.dom_tle.onmousedown = function(){return that.move();}
				}
	});
	this.addStatus({			//添加状态  关闭
		 'name':'closed'		//css class 后缀
		,'size': [100,300]		//大小
		,'posn': [0,(parseInt(window.innerHeight)-100)/2]//默认贴左，垂直居中 //位置
		,'goin': function(){	//进入状态后执行的函数
					that.dom_tle.onmousedown = function(){return that.move();}
				}
	});
}
MOVE.prototype = {

	init:function(){

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
	
	//状态改变事件
	,addStatus:function(status){

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
}


function CHART(dom){
	this.box = dom;
	this.class_prefix = 'webim_';
}
CHART.prototype = {
	init:function(){

	}
	,setStyle:function(val){
		var style = document.getElementById('webim_style')
		if(!style){
			style = document.createElement('style');
			style.id = 'webim_style';
			document.getElementsByTagName('head')[0].appendChild(style);
		}

		style.innerHTML = '.webim_customer{'+val+'}';
	}
	,send:function(str,class_name){
		if(str === '') return false;
		var div = document.createElement('div');
		if(class_name){
			div.setAttribute('class',this.class_prefix+class_name);
		}
		div.innerHTML = '<pre>'+str+'</pre>';

		this.box.appendChild(div);
	}
}



function WEBIM(){
	//im 页面内元素
	this.dom_box = getClass('webim',document.body)[0],		//主体框
	this.dom_tle = getClass('webim_tle',this.dom_box)[0]	//头部
	this.dom_cht = getClass('webim_cht',this.dom_box)[0];	//内容展示
	this.dom_ipu = getClass('webim_ipu',this.dom_box)[0];	//编程器
	this.dom_min = getClass('webim_min',this.dom_box)[0];	//最小化窗口按钮
	this.dom_sta = getClass('webim_sta',this.dom_box)[0];	//标准窗口按钮
	this.dom_max = getClass('webim_max',this.dom_box)[0];	//最大化窗口按钮
	this.dom_clo = getClass('webim_clo',this.dom_box)[0];	//关闭窗口按钮
	this.dom_sub = getClass('webim_sub',this.dom_box)[0];	//提交按钮
	this.dom_fac = getClass('webim_fac',this.dom_box)[0];	//表情
	this.dom_fon = getClass('webim_fon',this.dom_box)[0];	//字体
	this.dom_pic = getClass('webim_pic',this.dom_box)[0];	//图片





	this.init();
	

	
	//editor.	
}
WEBIM.prototype = {
	init:function(){

		var that = this;
		//移动
		this.move = new MOVE(this.dom_box,this.dom_tle);
		this.move.standard();		//初始化显示

		this.dom_min.onclick = function(){that.move.minimize();}			//最小化
		this.dom_sta.onclick = function(){that.move.standard();}			//标准
		this.dom_max.onclick = function(){that.move.maximize();}			//最大化
		this.dom_clo.onclick = function(){that.move.closed();}				//关闭


		


		//显示
		this.chart = new CHART(this.dom_cht);

		//编程器
		this.editor = new EDITOR({
			parent:this.dom_ipu
			,keypress:function(e){
				if(e.which == 10){that.chart.send(that.editor.clear(),'customer');}	//快捷键方式
			}
			,keyup:function(e){
				//console.log('keyup-->'+that.editor.getContent());
			}
		});

		//提交
		this.dom_sub.onclick = function(){that.chart.send(that.editor.clear(),'customer');};





		//表情
		var dom_fac_child = getChild(this.dom_fac);
		dom_fac_child[0].onclick = function(e){
			
			var sta = dom_fac_child[1].style.display;
			if(sta === 'block' ){
				this.removeAttribute('class');
				dom_fac_child[1].style.display = 'none';
			}else{
				this.setAttribute('class','on');
				dom_fac_child[1].style.display = 'block';
			}

		}
		dom_fac_child[1].onclick = function(e){
			if(e.target.src){
				that.editor.insertImage(e.target.src);
				that.editor.keyUp();
				dom_fac_child[1].style.display = 'none';
				dom_fac_child[0].removeAttribute('class');
			}	
		}




		//字体
		var dom_fon_child = getChild(this.dom_fon);
		dom_fon_child[0].onclick = function(e){
			var sta = dom_fon_child[1].style.display;
			if(sta === 'block' ){
				dom_fon_child[1].style.display = 'none';
				this.removeAttribute('class');
			}else{
				this.setAttribute('class','on');
				dom_fon_child[1].style.display = 'block';
			}
		}



		var dom_fon_child_item = getChild(dom_fon_child[1]);


		dom_fon_child_item[0].onchange = function(){
			var select = this.options[this.selectedIndex].text;
			that.editor.setStyle('fontFamily',select);
			that.chart.setStyle(that.editor.getStyle());
		}
		dom_fon_child_item[1].onchange = function(){
			var select = this.options[this.selectedIndex].text;
			that.editor.setStyle('fontSize',select+'px');
			that.chart.setStyle(that.editor.getStyle());
		}

		//加粗
		dom_fon_child_item[2].onclick = function(){

			if(this.getAttribute('class') === 'on'){
				that.editor.setStyle('fontWeight','normal');
				that.chart.setStyle(that.editor.getStyle());
				this.removeAttribute('class');
			}else{
				that.editor.setStyle('fontWeight','bold');
				that.chart.setStyle(that.editor.getStyle());
				this.setAttribute('class','on');
			}
		}

		//斜体
		dom_fon_child_item[3].onclick = function(){

			if(this.getAttribute('class') === 'on'){
				that.editor.setStyle('fontStyle','normal');
				that.chart.setStyle(that.editor.getStyle());
				this.removeAttribute('class');
			}else{
				that.editor.setStyle('fontStyle','italic');
				that.chart.setStyle(that.editor.getStyle());
				this.setAttribute('class','on');
			}
		}


		//下划线
		dom_fon_child_item[4].onclick = function(){

			if(this.getAttribute('class') === 'on'){
				that.editor.setStyle('textDecoration','none');
				that.chart.setStyle(that.editor.getStyle());
				this.removeAttribute('class');
			}else{
				that.editor.setStyle('textDecoration','underline');
				that.chart.setStyle(that.editor.getStyle());
				this.setAttribute('class','on');
			}
		}


		//图片上传
		var iframe = document.createElement('iframe');
			iframe.style.cssText = 'border:none;opacity:0;';
		this.dom_pic.appendChild(iframe);
		makePic(iframe);

		if (iframe.attachEvent){
		    iframe.attachEvent("onload", function(){
		    	that.editor.insertImage(this.contentWindow.document.body.innerHTML);
		    	makePic(iframe);
		    });
		} else {
		    iframe.onload = function(){
		        that.editor.insertImage(this.contentWindow.document.body.innerHTML);
		        makePic(iframe);
		    };
		}


		function makePic(iframe){
			var iframe_body = iframe.contentWindow.document.body;
				iframe_body.innerHTML = '';
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

		
		
		
	}
	
}




var im = new WEBIM({name:''});

//im.standard();	//显示标准窗口
//im.winMinimize();
//im.winMaximize();
//im.winClosed();
//im.test();

//不可定制，只允许设置参数
//var im = new webim({
	//domt_chart	: chart				//type:document主体框
	//,domt_show	:showarea
	//,domt_input	:inputarea
	//,domt_movetrg 	: title	//type:document解发移动的元素【默认为true】
	// boon_show      : 'maximize'		//默认显示状态【最大化，最小化，关闭，标准】
	//,boon_movable 	: true		//type:bloolean是否可移动【默认为true】
	//,boon_resizable : true		//type:bloolean可改变大小【默认为true】
	//,func_input 	:input			//type:function用户输入事件触发
	//,func_submit	:submit			//type:function用户提交事件触发
	
	//,minsize:{name:'minsize',domt:minsize,size:[150,80],posn:[-1,-1]}//最小化参数
	//最大化窗口参数
	//标准窗口参数
	//关闭窗口参数
	//
//});







/*

*/
