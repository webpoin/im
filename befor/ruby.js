/*
html




<!--
	<div class="webim">
		<div class="webim_bkg"></div>
		<div class="webim_operat">
			<b class="webim_min" title="最小化"><i>&nbsp;</i></b>
			<b class="webim_sta" title="还原窗口"><i>&nbsp;</i></b>
			<b class="webim_max" title="最大化"><i>&nbsp;</i></b>
			<b class="webim_clo" title="关闭"><i>&nbsp;</i></b>
		</div>
		<div class="webim_tle">头</div>
		<div class="webim_cht"></div>
		<div class="webim_tol">
			<div class="webim_fac">
				<i>&nbsp;</i>
				<div>
					<img src="images/1.gif" />
					<img src="images/2.gif" />
					<img src="images/3.gif" />
					<img src="images/4.gif" />
					<img src="images/5.gif" />
					<img src="images/6.gif" />
					<img src="images/7.gif" />
					<img src="images/8.gif" />
					<img src="images/9.gif" />
					<img src="images/10.gif" />
					<img src="images/11.gif" />
					<img src="images/12.gif" />
					<img src="images/13.gif" />
					<img src="images/14.gif" />
					<img src="images/15.gif" />
					<img src="images/16.gif" />
					<img src="images/17.gif" />
					<img src="images/18.gif" />
					<img src="images/19.gif" />
					<img src="images/20.gif" />
					<img src="images/21.gif" />
					<img src="images/22.gif" />
					<img src="images/23.gif" />
					<img src="images/24.gif" />
					<img src="images/25.gif" />
					<img src="images/26.gif" />
					<img src="images/27.gif" />
					<img src="images/28.gif" />
					<img src="images/29.gif" />
					<img src="images/30.gif" />
					<img src="images/31.gif" />
					<img src="images/32.gif" />
					<img src="images/33.gif" />
					<img src="images/34.gif" />
					<img src="images/35.gif" />
					<img src="images/36.gif" />
					<img src="images/37.gif" />
					<img src="images/38.gif" />
					<img src="images/39.gif" />
				</div>
			</div>
			<div class="webim_fon">
				<i>&nbsp;</i>
				<div>
					<select>
						<option>微软雅黑</option>
						<option>宋体</option>
						<option>楷体</option>
						<option>黑体</option>
						<option>Arial</option>
						<option>MS Mincho</option>
						<option>PMingLiU</option>
						<option>Tahoma</option>
						<option>Verdana</option>
					</select>
					<select>
						<option>8</option>
						<option>9</option>
						<option>10</option>
						<option>11</option>
						<option>12</option>
						<option>13</option>
						<option>14</option>
						<option>15</option>
						<option>16</option>
						<option>17</option>
						<option>18</option>
						<option>19</option>
						<option>20</option>
						<option>21</option>
						<option>22</option>
					</select>
					<b>B</b>
					<em>I</em>
					<u>U</u>
					<span></span>
				</div>
			</div>

			<div class="webim_pic">
			</div>
			<!--文件,电话,评价--

		</div>
		<div class="webim_ipu"></div>
		<i class="webim_sub" title="按Ctrl+Enter发送信息">发送</i>
		<div class="webim_ima">企业形象</div>
	</div>
-->


<!--
	<div class="webim_minimize">
		<span class="webim_operat">
			<b class="webim_restore"><i>&nbsp;</i></b>
			<b class="webim_maxsize"><i>&nbsp;</i></b>
			<b class="webim_close"><i>&nbsp;</i></b>
		</span>

		<div class="webim_min_chart">
			<section class="webim_chart_customer"><p>亲爱的，您还在线啵？？</p></section>
			<section class="webim_chart_waiter"><p>在的，</p></section>
			<section class="webim_chart_customer"><p>有什么可以帮您的吗</p></section>
			<section class="webim_chart_waiter"><p>你想表达什么？</p></section>
			<section class="webim_chart_waiter"><p>我可以关掉吧？</p></section>
			<section class="webim_chart_customer"><p>你是关不掉的，你大可试试</p></section>
		</div>
		<div class="webim_min_enter">
			<input type="text" />
		</div>
	</div>
-->

*/


	//元素移动
	function dommove(event){

		event = event || window.event;
		var mouseX = parseInt(event.clientX);			//鼠标位置的横坐标
		var mouseY = parseInt(event.clientY);			//鼠标位置的纵坐标
		var domX = parseInt(webim.offsetLeft);			//元素离左边的距离
		var domY = parseInt(webim.offsetTop);			//元素离顶部的距离
		var domW = parseInt(webim.offsetWidth);			//元素宽度
		var domH = parseInt(webim.offsetHeight);		//元素高度
		var winW = parseInt(document.body.offsetWidth);	//浏览器显示区域的宽度(去滚动条宽度)
		var winH = parseInt(window.innerHeight);		//浏览器显示区域的高度

		//var __selectstart 	= window.onselectstart;		//保存文字选择事件
		var __mousemove 	= window.onmousemove;		//保存鼠标移动事件
		var __mouseup 		= window.onmouseup;			//保存鼠标放开事件
		
		//console.log('winW:'+winW+'winH:'+winH+'domW:'+domW+'domH:'+domH);
		window.onmousemove = function(event){

			//元素将移动到的位置
			var X = parseInt(event.clientX) + domX - mouseX;
			var Y = parseInt(event.clientY) + domY - mouseY;

			//将移动限制在页面内
			X = X < 0 ? 0 : (X >(winW - domW)  ? winW - domW : X);
			Y = Y < 0 ? 0 : (Y >(winH - domH)  ? winH - domH : Y);

			//改变css
			webim.style.left= X + "px";
			webim.style.top = Y + "px";

			//保存位置
			webim.left = X;
			webim.top = Y;
		}

		window.onmouseup = function(){
			//还原内容，清除痕迹
			window.onmousemove = __mousemove;			//还原鼠标移动事件
			window.onmouseup = __mouseup;				//还原鼠标放开事件
			return true;
		}
		
		//webim.onselectstart = function(){return false;};
		return false;
	}



	var webim = getClass('webim',document.body)[0];	//主体框
	var title = getClass('webim_title',webim)[0];		//头部
	var minsize = getClass('webim_minsize',webim)[0];	
	var maxsize =  getClass('webim_maxsize',webim)[0];
	var close =  getClass('close',webim)[0];

	webim.width = parseInt(webim.offsetWidth);
	webim.height = parseInt(webim.offsetHeight);
	webim.left = parseInt(webim.offsetLeft);
	webim.top = parseInt(webim.offsetTop);
	
	title.onmousedown = dommove;

	
	//最小化




	//最大化与还原
	maxsize.onclick = function(event){

	//	console.log('left:'+webim.left +'top:'+webim.top);

		var domW = parseInt(webim.offsetWidth);			//元素宽度
		var domH = parseInt(webim.offsetHeight);		//元素高度
		var winW = parseInt(document.body.offsetWidth);	//浏览器显示区域的宽度(去滚动条宽度)
		var winH = parseInt(window.innerHeight);		//浏览器显示区域的高度

	//	console.log('winW:'+winW+'winH:'+winH+'domW:'+domW+'domH:'+domH);


		//检查大小，如果是最大化(大小相减，相差不大)，则还原，如果不是，则最大化
		if(Math.abs(winW + winH - domW - domH)<10 ){
			//还原
			webim.style.width = webim.width + 'px';
			webim.style.height = webim.height + 'px';
			webim.style.left = webim.left + 'px';
			webim.style.top = webim.top + 'px';

			//恢复移动
			title.onmousedown = dommove;
		}else{
			//最大化
			webim.style.width = '100%';
			webim.style.height = '100%';
			webim.style.left =0;
			webim.style.top = 0;
			//禁止移动
			title.onmousedown = null;
		}
	}



	//关闭



/*

function webim(init){
	//初始化



	this.class_prefix = 'webim_';	//css 前缀
	this.removable = true;			//可移动
	this.resizable = true;			//可改变大小
	this.fun_input = function(w){console.log(w);}	//用户输入触发的事件
	this.func_submit = function(w){console.log('---->'+w)}
	this.short_key = 10;			//用户发送消息快捷键 的按键码



	webim_ipu.document.designMode = 'on';

	this.enter = document.getElementById('webim_ipu').contentWindow;
	var editor = this.enter.document.body;
		//editor.setAttribute('contenteditable','true');
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

	var dom_fac = getClass('webim_fac',this.dom_box)[0];
	var dom_fac_tle = dom_fac.childNodes[1];
	var dom_fac_cnt = dom_fac.childNodes[3]; //得改


	dom_fac_tle.onclick = function(){dom_fac_cnt.style.display = 'block';}
	dom_fac_cnt.onclick = function(e){
		if(e.target.src){

			that.insertImage(e.target.src);
			if(typeof(that.fun_input) === 'function'){
				that.fun_input(that.dom_ipu.innerHTML);
			}
			this.style.display = 'none';
		}	
	}

	

	/*****		添加状态	*****
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


	//自定义功能: 弹出窗口->标准窗口+抖动
	this.pop = function(){ this.standard();this.shake();}

	//初始显示
	this.standard();

	
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

		this.enter.onfocus = function(){
			
			this.document.onkeypress = function(e){ 
				if(e.which == that.short_key){that.submit();} //快捷键方式提交
			}

			if(typeof(that.fun_input) === 'function'){
				this.onkeyup = function(){that.fun_input(that.dom_ipu.innerHTML);}
			}			
		}
	
	}

	//插入内容
	,insertImage:function (str) {

        this.enter.focus();
        //if ie
              //insert the given text
        //    this.enter.document.body.focus();
        //      range = this.enter.document.selection.createRange();
        //      range.pasteHTML('inputText');
        //      range.collapse(false);
        //      range.select();

        //this.enter.document.execCommand('insertText', true, '-------------');
        this.enter.document.execCommand('InsertImage',true, str);
        //this.enter.document.execCommand('InsertHtml',false, '<b>agsefe</b>');
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

	//发送信息
	,send:function(msg,class_name){
		var div = document.createElement('div');
			if(class_name){
				div.setAttribute('class',this.class_prefix+class_name);
			}
			div.innerHTML = '<pre>'+msg+'</pre>';
		//console.log(msg)
		this.dom_cht.appendChild(div);
	}
	,submit:function(){

		var msg = this.dom_ipu.innerHTML;
		if(msg === ''){return false;}	//判断不为空

		this.send(msg,'customer');
		this.dom_ipu.innerHTML = '';

		if(this.func_submit){
			this.func_submit(msg);
		}
	}
	
}


*/

