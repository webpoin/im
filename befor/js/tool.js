/**常用扩展函数**/

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



var tool = (function (window,document,undefine) {

	//var 

	var addEvent = document.addEventListener ? 
						function(node, e, fun){node.addEventListener(e, fun, false);} : 
						(document.attachEvent ? 
							function(node, e, fun){node.attachEvent("on" + e, fun);} : 
							function(node, e, fun){node["on" + e] = fun;});





		/*	if (document.addEventListener) {
				return function(node, e, fun){node.addEventListener(e, fun, false);}
			} else if (document.attachEvent) {
				return function(node, e, fun){node.attachEvent("on" + e, fun);}
			} else {
				return function(node, e, fun){node["on" + e] = fun;}
			}
		*/





	return {
		attr :function(){

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
		,addEvent:addEvent



	}

	
})(window,document);

