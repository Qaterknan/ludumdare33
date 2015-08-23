var preloadA = function (game){};

preloadA.prototype = {
	preload : function() {
		var loadingBar = this.game.add.sprite(100, 100, "loadingBar");
		loadingBar.anchor.set(0.5,0.5);
		this.load.setPreloadSprite(loadingBar, 0);
		game.loadingBar = loadingBar;
		
		game.load.image('tree','images/smrk2.png');
        game.load.image('tree2','images/smrk3.png');
        game.load.image('blood','images/blood.png');
        game.load.image('arrow','images/arrow.png');
        game.load.image('footstep','images/footstep.png');
        game.load.spritesheet('buttons','images/buttons.png', 16, 16);
        game.load.spritesheet('soldier', 'images/nazi.png', 8, 8);
        game.load.spritesheet('prisoner1', 'images/pow1.png', 8, 8);
        game.load.spritesheet('prisoner2', 'images/pow2.png', 8, 8);
        game.load.spritesheet('corpse', 'images/corpse.png', 16, 16);
        game.load.spritesheet('frozen', 'images/frozen.png', 16, 16);

        game.load.image('freeze', 'images/freeze_word.png');
        game.load.image('kill', 'images/kill_word.png');
        game.load.image('exhausted', 'images/exhausted_word.png');

        game.load.audio('cough', 'sounds/cough.ogg');
        game.load.audio('gunshot', 'sounds/gunshot.ogg');
        game.load.audio('gunshot2', 'sounds/gunshot2.ogg');
        game.load.audio('howling', 'sounds/howling.ogg');
        game.load.audio('panting', 'sounds/panting.ogg');
        game.load.audio('twig', 'sounds/twig.ogg');
        game.load.audio('walkFast', 'sounds/walkFast.ogg');
        game.load.audio('walk1', 'sounds/walk1.ogg');
        game.load.audio('walk2', 'sounds/walk2.ogg');
        game.load.audio('wind1', 'sounds/wind1.ogg');
        game.load.audio('wind2', 'sounds/wind2.ogg');
        game.load.audio('wind3', 'sounds/wind3.ogg');
	},
	
	create : function() {
		game.state.start("PhaserGame");
		game.loadingBar.destroy();
		delete game.loadingBar;
	},
};