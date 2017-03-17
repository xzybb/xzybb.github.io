angular.module('moviecatJsonpApp',[]).service('jsonpService', ['$window',function ($window) {
    this.jsonp=function(url,fun){
		var cb = 'xu'+new Date().getTime()+Math.random().toString().substr(2);
		var script = document.createElement('script');
	    script.src=url+"&callback="+cb+"&jsonpCallback="+cb;
	    window.document.body.appendChild(script);
	    window[cb]= function (data) {
	        fun(data);
	        window.document.body.removeChild(script)
	   };
	   window["jsonCallback"]= function (data) {
	        fun(data);
	        window.document.body.removeChild(script)
	   };
	}
}])
