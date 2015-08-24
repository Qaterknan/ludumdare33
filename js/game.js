var PhaserGame = function () {
    game.march = null;
};

PhaserGame.prototype = {
    preload: function () {

    },
    create: function () {
        // centrování canvasu
        $(game.canvas).center();
		// Zapnutí progressu
		game.progress = new Progress();
        // nastavení světa
        game.world.setBounds(0, 0, 80000, 480);
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
        var pauseButton = game.make.button(400-60-16, 400, "buttons", function(){
            game.guard.setSpeed(0);
        }, this, 8, 0, 12);
        pauseButton.scale.set(2);
        pauseButton.smoothed = false;
        this.gui.add(pauseButton);

        var speed1Button = game.make.button(400-20-16, 400, "buttons", function(){
            game.guard.setSpeed(1);
        }, this, 9, 1, 13);
        speed1Button.scale.set(2);
        speed1Button.smoothed = false;
        this.gui.add(speed1Button);

        var speed2Button = game.make.button(400+20-16, 400, "buttons", function(){
            game.guard.setSpeed(2);
        }, this, 10, 2, 14);
        speed2Button.scale.set(2);
        speed2Button.smoothed = false;
        this.gui.add(speed2Button);

        var speed3Button = game.make.button(400+60-16, 400, "buttons", function(){
            game.guard.setSpeed(3);
        }, this, 11, 3, 15);
        speed3Button.scale.set(2);
        speed3Button.smoothed = false;
        this.gui.add(speed3Button);

        this.speedButtons = [pauseButton, speed1Button, speed2Button, speed3Button];
        
        game.distanceCounter = game.make.text(game.width/2, 80, "", {
            font: "normal 32px monacoregular"
        });
        game.distanceCounter.anchor.set(0.5, 0.5);
        this.gui.add(game.distanceCounter);

        game.stage.disableVisibilityChange = true;
        game.diary = new Diary(game, game.width, game.height/2 - 225);
        this.gui.addChild(game.diary);
		game.diary.changeState("out");
		// Start menu
		this.startGroup = game.add.group(game.world, "startGroup");
        this.startGroup.fixedToCamera = true;
		// Tlačítko start
		var startButton = game.make.button(game.width/2, 200, "buttonBorder", function(){
            game.guard.setSpeed(2);
			game.march.startEffects();
			game.progress.init(game.march.children.length);
			var tw1 = game.add.tween(this.startGroup);
			tw1.to({ alpha : 0 }, 2000);
			var tw2 = game.add.tween(this.gui);
			tw2.to({ alpha : 1 }, 2000);
			tw1.start();
			tw1.onComplete.add(function(){this.startGroup.destroy();}, this);
			tw2.start();
        }, this);
        startButton.tint = 0x000000;
		startButton.anchor.set(0.5);
		startButton.scale.set(2);
        startButton.smoothed = false;
		startButton.name = "startButton";
		this.startGroup.add(startButton);
		// Nápis start
		var startText = game.make.text(game.width/2,204, "Start", {
            font: "normal 32px monacoregular"
        });
		startText.anchor.set(0.5, 0.5);
		// startText.scale.set(2);
		this.startGroup.add(startText);
		// Tlumící tlačítko
		var soundButton = game.make.button(game.width/2, 300, "sound", function(){
			if(!game.jukebox.globalMute){
				soundButton.setFrames(1,1,0);
				game.jukebox.mute(true);
			}
			else{
				soundButton.setFrames(0,0,1);
				game.jukebox.mute(false);
			}
		}, soundButton, 0, 0, 1);
        soundButton.anchor.set(0.5, 0.5);
        soundButton.scale.set(2, 2);
        soundButton.smoothed = false;
		this.startGroup.add(soundButton);
		// Druhé gui v pozadí
		this.gui.alpha = 0;
		
        game.background = game.add.group(game.world, "background");
        this.snowBackground = game.make.tileSprite(0, 0, 400, 240, "snowBackground");
        this.snowBackground.fixedToCamera = true;
        this.snowBackground.scale.set(2, 2);
        this.snowBackground.smoothed = false;
        game.background.addChild(this.snowBackground);

        // Particles group
        game.emitters = game.add.group(game.world, "emitters");

        // pro utíkající lidi
        game.fleeing = game.add.group(game.world, "fleeing");

        var enviroment = game.add.group(game.world, "enviroment");
        // stromy pro kontext
        for(var i=0; i<70; i++){
            var tree;
            if(i%2==0)
                tree = game.make.sprite(utils.random(0,800), utils.random(0,100), "tree"+(Math.random() < 0.5 ? "" : "2"));
            else
                tree = game.make.sprite(utils.random(0,800), utils.random(380,480), "tree"+(Math.random() < 0.5 ? "" : "2"));
            tree.scale.set(2);
            tree.smoothed = false;
            tree.rotation = utils.randomInt(0, 4)/2 * Math.PI;
            tree.update = function (){
                if(game.camera.position.x - game.camera.width/2 > this.position.x + this.width){
                    this.position.x += game.camera.view.width+this.width*2;
                }
            };

            enviroment.addChild(tree);
        }
        
        var yard = game.make.sprite(-300, -25, "yard");
        yard.scale.set(2, 2);
        yard.smoothed = false;
        game.background.addChild(yard);

        var gate = game.add.sprite(400, 240, "gate");
        gate.anchor.set(0.5, 0.5);
        gate.scale.set(-2, 2);
        gate.smoothed = false;
		game.finalGate = game.add.sprite(1400, 240, "gate");
        game.finalGate.anchor.set(0.5, 0.5);
        game.finalGate.scale.set(2, 2);
        game.finalGate.smoothed = false;
        // groupy
        // Hřbitov
        game.graveyard = new Graveyard(0,0);
        game.world.add(game.graveyard);
        // Pochod
        game.march = new March(this.game);
        game.world.add(game.march);
        game.march.position.set(320, 240);

        game.guard = new Guard(this.game);
        game.world.add(game.guard);
        game.guard.position.set(320, 240);
		// Připojení se kamery
		var interval = window.setInterval(function(){
			if(game.guard.position.x >= game.camera.position.x){
				game.camera.follow(game.guard);
				window.clearInterval(interval);
			}
		}, 100);
		game.guard.setSpeed(0);
		game.camera.setPosition(300, 240);
		game.march.stopEffects();

        // sníh!
        var snow = game.add.emitter(0, 240, 1500);
        snow.setRotation(0, 0);
        snow.gravity = 0;
        snow.minParticleScale = 1;
        snow.minParticleScale = 2;
        snow.minParticleSpeed.set(-10, 50);
        snow.maxParticleSpeed.set(10, 100);
        snow.setAlpha(1, 0.6, 1000);
        snow.makeParticles("snow", 0, 1500);
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
        var debugGui = game.add.group(this.gui, "debugGui");
        debugGui.x = -600;

        game.fpsCounter = game.make.text(600, 0, "fps: ", {
            font: "normal 32px monacoregular"
        });
        debugGui.add(game.fpsCounter);

        var background = game.make.graphics(650, 30);
        background.beginFill(0x000000, 0.7);
        background.drawRect(0, 0, 100, 400);
        background.endFill();
        debugGui.add(background);

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
            new Progressbar(this, 650, 30 + i*20, game.march.psychology, watch[i], debugGui);
        }

        var fleeButton = game.make.button(650, 200, "buttons", function(){
            game.march.fleeOne();
        }, this, 1, 1);
        fleeButton.scale.set(2);
        fleeButton.smoothed = false;
        debugGui.add(fleeButton);

        var killButton = game.make.button(690, 200, "buttons", function(){
            game.march.getRandom().onClick();
            game.march.psychology.walkKill();
        }, this, 2, 2);
        killButton.scale.set(2);
        killButton.smoothed = false;
        debugGui.add(killButton);

        debugGui.visible = true;
		
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


        // vrstvy !! -----------------

        game.background.z = -1;
        game.fleeing.z = 0; // utíkající
        game.emitters.z = 1; // prázdná
        game.graveyard.z = 2;
        game.march.z = 3;
        game.guard.z = 4;
        enviroment.z = 5;
        gate.z = 6;
        snow.z = 7;
        this.gui.z = 8;
		this.startGroup.z = 9;
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
        this.snowBackground.tilePosition.set(-game.camera.x/2, -game.camera.y/2);
        game.fpsCounter.text = game.time.fps+" "+game.time.fpsMin+" "+game.time.fpsMax;
		game.distanceCounter.text = Math.round(game.progress.distanceWalked/1000) + " km";
    },

    render: function () {

        // game.debug.cameraInfo(game.camera, 32, 32);
        // game.debug.spriteCoords(player, 32, 500);
    }
};
var game;
$(document).ready(function(){
    waitForWebfonts(["monacoregular"], function(){
        game = new Phaser.Game(800, 480, Phaser.AUTO, document.body);
        game.state.add("Loading", loading);
        game.state.add("Preload", preloadA);
        game.state.add("PhaserGame", PhaserGame);
        game.state.start("Loading");
    });
})

function endGame(early){
	this.progress.finished = !early;
	this.progress.sendStats();
	this.march.stopEffects();
	this.march.inDestination = true;
	console.log("konec");
	if(early)
		game.guard.speed = 0;
}
