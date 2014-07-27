/**编辑器**/

var EDITOR = function (option,tool) {
	

	//创建editor
	var iframe = document.createElement('iframe');
	//iframe.style.cssText = 'white-space: nowrap;';
	option.node.appendChild(iframe);

	//editor 内容主体
	var win = iframe.contentWindow;
	var doc = win.document;
	
	doc.designMode = 'On'; 
 	doc.contentEditable = true; 
 	doc.open(); 
 	doc.writeln('<!DOCTYPE HTML><html><style>html,body{width:100%;height:100%;padding:0;margin:0;}</style><body></body></html>'); 
 	doc.close(); 
 	
 	doc.body.setAttribute('spellcheck',false);







	this.keyPress = function(key){}
	this.getContent = function(){}
	this.clear = function(){}
	this.inserHtml = function(html){}
	this.setStyle = function(attr,value){}
}