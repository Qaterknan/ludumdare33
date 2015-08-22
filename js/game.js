var PhaserGame = function () {
    this.march = null;
};

PhaserGame.prototype = {
    preload: function () {
        game.load.image('tree','images/tree.png');
        game.load.image('blood','images/blood.png');
        game.load.spritesheet('buttons','images/buttons.png', 16, 16);
        game.load.spritesheet('soldier', 'images/soldier.png', 8, 8);
        game.load.spritesheet('prisoner', 'images/prisoner.png', 8, 8);
    },
    create: function () {
        // centrování canvasu
        $(game.canvas).center();

        // nastavení světa
        game.world.setBounds(0, 0, 8000, 480);
        game.stage.backgroundColor = '#dddddd';
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // gui
        var pauseButton = game.add.button(400-60, 400, "buttons", function(){
            this.guard.setSpeed(0);
        }, this, 0, 0);
        pauseButton.scale.set(2);
        pauseButton.smoothed = false;
        var speed1Button = game.add.button(400-20, 400, "buttons", function(){
            this.guard.setSpeed(1);
        }, this, 1, 1);
        speed1Button.scale.set(2);
        speed1Button.smoothed = false;
        var speed2Button = game.add.button(400+20, 400, "buttons", function(){
            this.guard.setSpeed(2);
        }, this, 2, 2);
        speed2Button.scale.set(2);
        speed2Button.smoothed = false;
        var speed3Button = game.add.button(400+60, 400, "buttons", function(){
            this.guard.setSpeed(3);
        }, this, 3, 3);
        speed3Button.scale.set(2);
        speed3Button.smoothed = false;

        // groupy
        this.march = new March(this.game);
        game.world.add(this.march);
        this.march.position.set(300, 240);

        this.guard = new Guard(this.game);
        game.world.add(this.guard);
        this.guard.position.set(300, 240);
        
        // stopování hry
        game.input.keyboard.addCallbacks(
            game,
            function ( event ) {
                if( event.keyCode == 32 ){
                    game.paused=!game.paused;
                }
            }
        );
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

var game = new Phaser.Game(800, 480, Phaser.AUTO, document.body, PhaserGame);