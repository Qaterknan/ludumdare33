var PhaserGame = function () {
    game.march = null;
};

PhaserGame.prototype = {
    preload: function () {
        game.load.image('tree','images/smrk2.png');
        game.load.image('tree2','images/smrk3.png');
        game.load.image('blood','images/blood.png');
        game.load.image('snow','images/snow.png');
        game.load.image('arrow','images/arrow.png');
        game.load.image('footstep','images/footstep.png');
        game.load.image('paper','images/paper.jpg');
        game.load.spritesheet('buttons','images/buttons.png', 16, 16);
        
        game.load.spritesheet('general', 'images/u.png', 10, 10);
        game.load.spritesheet('generalShoot', 'images/shoot.png', 30, 10);

        game.load.spritesheet('soldier', 'images/wehr.png', 8, 8);
        game.load.spritesheet('soldierShoot', 'images/shootwehr.png', 24, 8);

        game.load.spritesheet('prisoner1', 'images/pow1.png', 8, 8);
        game.load.spritesheet('prisoner2', 'images/pow2.png', 8, 8);
        game.load.spritesheet('corpse', 'images/corpse.png', 16, 16);
        game.load.spritesheet('frozen', 'images/frozen.png', 16, 16);

        game.load.image('kill', 'images/text1.png');
        game.load.image('freeze', 'images/text2.png');
        game.load.image('exhausted', 'images/text3.png');

        game.load.audio('cough', 'sounds/cough.ogg');
        game.load.audio('gunshot', 'sounds/gunshot.ogg');
        game.load.audio('gunshot2', 'sounds/gunshot2.ogg');
        // game.load.audio('howling', 'sounds/howling.ogg');
        game.load.audio('panting', 'sounds/panting.ogg');
        game.load.audio('twig', 'sounds/twig.ogg');
        game.load.audio('walkFast', 'sounds/walkFast.ogg');
        game.load.audio('walk1', 'sounds/walk1.ogg');
        game.load.audio('walk2', 'sounds/walk2.ogg');
        game.load.audio('wind1', 'sounds/wind1.ogg');
        game.load.audio('wind2', 'sounds/wind2.ogg');
        game.load.audio('wind3', 'sounds/wind3.ogg');

        game.load.bitmapFont('typewriter', 'fonts/font.png', 'fonts/font.fnt');
    },
    create: function () {
        // centrování canvasu
        $(game.canvas).center();

        // nastavení světa
        game.world.setBounds(0, 0, 8000, 480);
        game.stage.backgroundColor = '#dddddd';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.time.advancedTiming = true;

        game.jukebox = new Jukebox(game);
        game.jukebox.addEffect("cough", "sfx1", 0.1).startLoop(10, 30);
        // game.jukebox.addEffect("howling", "sfx2", 0.4).startLoop(30, 20);
        game.jukebox.addEffect("twig", "sfx3", 0.04).startLoop(2, 5);

        game.jukebox.addEffect("wind1", "wind1", 0.3).startLoop(1, 10);
        game.jukebox.addEffect("wind2", "wind2", 0.1).startLoop(1, 10);
        game.jukebox.addEffect("wind3", "wind3", 0.3).startLoop(0, 0);
        
        game.jukebox.addEffect("walk1", "walk1", 0.2).startLoop(0, 0);
        game.jukebox.addEffect("walk2", "walk2", 0.2).startLoop(0, 0);
        game.jukebox.addEffect("walkFast", "walkFast", 0.2).startLoop(0, 0);
        
        game.jukebox.addEffect("gunshot2", "gunshot", 1);

        this.gui = game.add.group(game.world, "gui");
        this.gui.fixedToCamera = true;
        
        // gui
        var pauseButton = game.make.button(400-60, 400, "buttons", function(){
            game.guard.setSpeed(0);
        }, this, 0, 0);
        pauseButton.scale.set(2);
        pauseButton.smoothed = false;
        this.gui.add(pauseButton);

        var speed1Button = game.make.button(400-20, 400, "buttons", function(){
            game.guard.setSpeed(1);
        }, this, 1, 1);
        speed1Button.scale.set(2);
        speed1Button.smoothed = false;
        this.gui.add(speed1Button);

        var speed2Button = game.make.button(400+20, 400, "buttons", function(){
            game.guard.setSpeed(2);
        }, this, 2, 2);
        speed2Button.scale.set(2);
        speed2Button.smoothed = false;
        this.gui.add(speed2Button);

        var speed3Button = game.make.button(400+60, 400, "buttons", function(){
            game.guard.setSpeed(3);
        }, this, 3, 3);
        speed3Button.scale.set(2);
        speed3Button.smoothed = false;
        this.gui.add(speed3Button);
        
		game.distanceCounter = game.make.text(400, 50, "");
		this.gui.add(game.distanceCounter);

        // var paper = game.make.sprite(game.width/2, 0, "paper");
        // paper.anchor.set(0.5, 0);
        // var stats = game.make.bitmapText(paper.width/2, 0, "typewriter", "libovky", 12);
        // stats.scale.set(2, 2);
        // stats.smoothed = false;
        // paper.addChild(stats);
        // this.gui.add(paper);

        // Particles group
        game.emitters = game.add.group(game.world, "emitters");

        // pro utíkající lidi
        game.fleeing = game.add.group(game.world, "fleeing");

        var enviroment = game.add.group(game.world, "enviroment");
        // stromy pro kontext
        for(var i=0; i<100; i++){
            var tree;
            if(Math.random() < 0.5)
                tree = game.make.sprite(utils.random(0,1600), utils.random(0,100), "tree"+(Math.random() < 0.5 ? "" : "2"));
            else
                tree = game.make.sprite(utils.random(0,1600), utils.random(380,480), "tree"+(Math.random() < 0.5 ? "" : "2"));
            tree.scale.set(2);
            tree.smoothed = false;
            // tree.rotation = utils.random(0, Math.PI);
            tree.rotation = utils.randomInt(0, 4)/2 * Math.PI;
            tree.update = function (){
                if(game.camera.position.x - this.position.x > game.camera.view.width/2+100){
                    this.position.x += 1600;
                }
            };

            enviroment.addChild(tree);
        }
        

        // groupy
        // Hřbitov
        game.graveyard = new Graveyard(0,0);
        game.world.add(game.graveyard);
        // Pochod
        game.march = new March(this.game);
        game.world.add(game.march);
        game.march.position.set(400, 240);

        game.guard = new Guard(this.game);
        game.world.add(game.guard);
        game.guard.position.set(400, 240);

        // sníh!
        var snow = game.add.emitter(0, 240, 1000);
        snow.setRotation(0, 0);
        snow.gravity = 0;
        snow.minParticleScale = 1;
        snow.minParticleScale = 2;
        snow.minParticleSpeed.set(-10, 50);
        snow.maxParticleSpeed.set(10, 100);
        snow.setAlpha(1, 0.6, 1000);
        snow.makeParticles("snow", 0, 1000);
        snow.width = 850;
        snow.height = 600;

        snow.angle = Math.PI;
        snow.angleDelta = 0.1;
        snow.speed = 100;

        snow.flow(1000, 1, 20);
        snow.update = function() {
            var t = game.time.totalElapsedSeconds() * 0.1;
            this.angleDelta = 20/this.speed;
            this.speed = 200 + 100*noise.simplex2(t, 0);
            this.angle = 0 + Math.PI*noise.simplex2(0, t);
            // this.lifespan = utils.randomInt(300, 500);
            var minAngle = this.angle - this.angleDelta;
            var maxAngle = this.angle + this.angleDelta;
            this.minParticleSpeed.set(Math.cos(minAngle)*this.speed, Math.sin(minAngle)*this.speed);
            this.maxParticleSpeed.set(Math.cos(maxAngle)*this.speed, Math.sin(maxAngle)*this.speed);

            this.emitX = game.camera.x + game.camera.view.width/2;
            this.__proto__.update.call(this);
        }
        
        // stopování hry
        game.input.keyboard.addCallbacks(
            game,
            function ( event ) {
                if( event.keyCode == 32 ){
                    game.paused=!game.paused;
                }
            }
        );

        // debug gui
        game.fpsCounter = game.make.text(50, 50, "fps: ", {
            color: 0xFF0000
        })
        this.gui.add(game.fpsCounter);
        

        var background = game.make.graphics(650, 30);
        background.beginFill(0x000000, 0.7);
        background.drawRect(0, 0, 100, 400);
        background.endFill();
        this.gui.add(background);

        var watch = [
            "temperature",
            "fatigue",
            "runningProb",
            "speed",
            "freezing",
            "effort",
            "speedBonus",
			"fear"
        ];
        
        for(var i=0; i<watch.length; i++){
            new Progressbar(this, 650, 30 + i*20, game.march.psychology, watch[i]);
        }

        var fleeButton = game.make.button(650, 200, "buttons", function(){
            game.march.fleeOne();
        }, this, 1, 1);
        fleeButton.scale.set(2);
        fleeButton.smoothed = false;
        this.gui.add(fleeButton);

        var killButton = game.make.button(690, 200, "buttons", function(){
            game.march.killOne();
            game.march.psychology.walkKill();
        }, this, 2, 2);
        killButton.scale.set(2);
        killButton.smoothed = false;
        this.gui.add(killButton);
        
        var pauseButton = game.make.button(650, 240, "buttons", function(){
            game.march.psychology.timeForABreak();
        }, this, 0, 0);
        pauseButton.scale.set(2);
        pauseButton.smoothed = false;
        this.gui.add(pauseButton);
		
		this.gui.renderable = false;
		
        this.datgui = new dat.GUI();
        this.datgui.add(game.march.psychology, "speed");

        this.datgui.add(game.march.psychology, "temperatureToRunning");
        this.datgui.add(game.march.psychology, "fatigueToRunning");
        this.datgui.add(game.march.psychology, "fatigueToSpeed");
        this.datgui.add(game.march.psychology, "baseSpeed");
        this.datgui.add(game.march.psychology, "speedToEffort");
        this.datgui.add(game.march.psychology, "speedToTemperature");
        this.datgui.add(game.march.psychology, "freezingToTemperature");
        this.datgui.add(game.march.psychology, "baseEffort");
        this.datgui.add(game.march.psychology, "effortToFatigue");
        this.datgui.add(game.march.psychology, "runKillToRun");
        this.datgui.add(game.march.psychology, "walkKillToSpeed");
        this.datgui.add(game.march.psychology, "baseToBreakEffort");

        game.camera.follow(game.guard);


        // vrstvy !! -----------------
        this.gui.z = 8;
        game.march.z = 3;
        game.guard.z = 4;
        game.graveyard.z = 2;
        game.emitters.z = 1; // prázdná
        game.fleeing.z = 0; // utíkající
        enviroment.z = 5;
        snow = 6;
        game.world.sort();
    },

    update: function () {
        // var t = 0.0000000001; // rychlost s jakou se řítí kamera za grupou
        // var delta = game.camera.view.clone().subtract(game.guard.position.x-game.camera.width/2, game.guard.position.y-game.camera.height/2).multiply(t, t);
        // game.camera.x += delta.x;
        // game.camera.y += delta.y;
        // game.camera.view.x += 0.5;
        // game.camera.view.x += (game.guard.position.x - game.camera.view.x - game.camera.view.width/2) * t;
        // game.camera.view.y += (game.guard.position.y - game.camera.view.y - game.camera.view.height/2) * t;
        // game.camera.view.x = Math.ceil(game.camera.view.x);
        // game.camera.view.y = Math.ceil(game.camera.view.y);

        game.fpsCounter.text = game.time.fps+" "+game.time.fpsMin+" "+game.time.fpsMax;
		game.distanceCounter.text = Math.round((game.march.position.x - 400)/16) + " m";
    },

    render: function () {

        // game.debug.cameraInfo(game.camera, 32, 32);
        // game.debug.spriteCoords(player, 32, 500);
    }
};

var game = new Phaser.Game(800, 480, Phaser.AUTO, document.body, PhaserGame);