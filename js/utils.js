jQuery.fn.center = function () {
	this.css("position","absolute");

	this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
	this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");

	return this;
};

utils = {
	random: function (min, max) {
		return min + Math.random()*(max-min+1);
	},

	randomInt: function (min, max) {
		return min + Math.floor(Math.random()*(max-min+1));
	},

	sgn: function (x) {
		if(x > 0)
			return 1;
		else if(x < 0)
			return -1;
		else
			return 0;
	},

	randomElement: function (a) {
		return a[Math.floor(Math.random() * a.length)];
	},
	
	relativSum : function(a,b,limit){
		return (a+b)/(1+a*b/(limit*limit));
	},
	
	probMul : function(a,n){
		var m = 0;
		for(var i = 0; i < n; i++){
			m = (m+a)/(1+m*a);
		}
		return m;
	},
	
	probSum : function (a,b){
		return (a+b)/(1+a*b);
	},
};