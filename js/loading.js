var loading = function(game){};
	
loading.prototype = {
	preload : function (){
		this.game.load.image("loadingBar", "images/loadingbar.png");
	},
	create : function (){
		game.state.start("Preload");
	}
};