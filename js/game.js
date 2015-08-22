var PhaserGame = function () {
    this.march = null;
};

PhaserGame.prototype = {
    preload: function () {
        game.load.image('tree','images/tree.png');
        game.load.spritesheet('soldier', 'images/soldier.png', 8, 8);
    },
    create: function () {
        // centrování canvasu
        $(game.canvas).center();

        // nastavení světa
        game.world.setBounds(0, 0, 8000, 480);
        game.stage.backgroundColor = '#dddddd';
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // pokusy
        this.march = new March(this.game);
        game.world.add(this.march);
        this.march.position.set(300, 300);
    },

    update: function () {

    },

    render: function () {

        game.debug.cameraInfo(game.camera, 32, 32);
        // game.debug.spriteCoords(player, 32, 500);
        game.debug.body(this.march.getTop());
        // game.debug.body(sprite2);
    }
};

var game = new Phaser.Game(800, 480, Phaser.CANVAS, document.body, PhaserGame);