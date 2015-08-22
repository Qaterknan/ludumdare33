var PhaserGame = function () {
    this.march = null;
};

PhaserGame.prototype = {
    preload: function () {
        game.load.image('tree','images/tree.png');
        game.load.image('blood','images/blood.png');
        game.load.spritesheet('buttons','images/buttons.png', 16, 16);
        game.load.spritesheet('soldier', 'images/soldier.png', 8, 8);
        game.load.spritesheet('prisoner1', 'images/pow1.png', 8, 8);
        game.load.spritesheet('prisoner2', 'images/pow2.png', 8, 8);
    },
    create: function () {
        // centrování canvasu
        $(game.canvas).center();

        // nastavení světa
        game.world.setBounds(0, 0, 8000, 480);
        game.stage.backgroundColor = '#dddddd';
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.gui = game.add.group(game.world, "gui");
        this.gui.z = 1000;
        // gui
        var pauseButton = game.make.button(400-60, 400, "buttons", function(){
            this.guard.setSpeed(0);
        }, this, 0, 0);
        pauseButton.scale.set(2);
        pauseButton.smoothed = false;
        pauseButton.fixedToCamera = true;
        this.gui.add(pauseButton);

        var speed1Button = game.make.button(400-20, 400, "buttons", function(){
            this.guard.setSpeed(1);
        }, this, 1, 1);
        speed1Button.scale.set(2);
        speed1Button.smoothed = false;
        speed1Button.fixedToCamera = true;
        this.gui.add(speed1Button);

        var speed2Button = game.make.button(400+20, 400, "buttons", function(){
            this.guard.setSpeed(2);
        }, this, 2, 2);
        speed2Button.scale.set(2);
        speed2Button.smoothed = false;
        speed2Button.fixedToCamera = true;
        this.gui.add(speed2Button);

        var speed3Button = game.make.button(400+60, 400, "buttons", function(){
            this.guard.setSpeed(3);
        }, this, 3, 3);
        speed3Button.scale.set(2);
        speed3Button.smoothed = false;
        speed3Button.fixedToCamera = true;
        this.gui.add(speed3Button);


        // stromy pro kontext
        for(var i=0; i<100; i++){
            if(Math.random() < 0.5)
                game.add.sprite(utils.random(0,1600), utils.random(0,100), "tree");
            else
                game.add.sprite(utils.random(0,1600), utils.random(380,480), "tree");
        }

        // groupy
        // Hřbitov
        game.graveyard = new Graveyard(0,0,0);
        game.world.add(game.graveyard);
        // Pochod
        this.march = new March(this.game);
        game.world.add(this.march);
        this.march.position.set(400, 240);

        this.guard = new Guard(this.game);
        game.world.add(this.guard);
        this.guard.position.set(400, 240);
        
        // stopování hry
        game.input.keyboard.addCallbacks(
            game,
            function ( event ) {
                if( event.keyCode == 32 ){
                    game.paused=!game.paused;
                }
            }
        );

        game.camera.follow(this.guard);

        game.world.sort();
    },

    update: function () {
        // var t = 0.0000000001; // rychlost s jakou se řítí kamera za grupou
        // var delta = game.camera.view.clone().subtract(this.guard.position.x-game.camera.width/2, this.guard.position.y-game.camera.height/2).multiply(t, t);
        // game.camera.x += delta.x;
        // game.camera.y += delta.y;
        // game.camera.view.x += 0.5;
        // game.camera.view.x += (this.guard.position.x - game.camera.view.x - game.camera.view.width/2) * t;
        // game.camera.view.y += (this.guard.position.y - game.camera.view.y - game.camera.view.height/2) * t;
        // game.camera.view.x = Math.ceil(game.camera.view.x);
        // game.camera.view.y = Math.ceil(game.camera.view.y);
    },

    render: function () {

        game.debug.cameraInfo(game.camera, 32, 32);
        // game.debug.spriteCoords(player, 32, 500);
        game.debug.body(this.march.getTop());
        // game.debug.body(sprite2);
    }
};

var game = new Phaser.Game(800, 480, Phaser.AUTO, document.body, PhaserGame);