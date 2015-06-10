
var app = angular.module('app',[]);
// 把socket 封装到angular;
app.factory('socket', function($rootScope) {
	var socket = io();
	return {
		on: function(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(socket, args);
				});
			});
		},
		emit: function(eventName, data, callback) {
			socket.emit(eventName, data, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					if (callback) {
						callback.apply(socket, args);
					}
				});
			})
		}
	};
});


// 编辑器指令
app.directive("contenteditable", function() {
	return {
		require: "ngModel",
		link: function(scope, ele, attrs, ctrl) {
			ele.bind("keypress", function(e) {ctrl.$setViewValue(ele.text()+String.fromCharCode(e.keyCode));});
			ctrl.content = function(value) {ele.html(value);};
			ctrl.$setViewValue(ele.text());
		}
	};
});


app.controller('webim', function($scope,$http,socket){

	$scope.charts = [];
	$http.post('/api/recode').success(function(res){
		$scope.charts = res;
	});


	socket.on('chat message', function(msg) {
		$scope.charts.push({msg:msg});
		// $('#messages').append($('<li>').text(msg));
	});



	$scope.keyup = function(e) {

		if(e.keyCode === 13){
			$scope.charts.push({msg:$scope.content});
			socket.emit('chart messages',{msg:$scope.content})
			// $http.post('/api/chart',{data:$scope.content}).success(function(res) {});
			return false;
		}
	}


});



