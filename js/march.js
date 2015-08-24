var March = function (game) {
    Phaser.Group.call(this, game, game.world, 'March', false, true, Phaser.Physics.ARCADE);

    this.psychology = new Psychology(this);

    this.marchHeight = 20;
    for (var i = 0; i < 30; i++)
    {
        var person = new Prisoner(game);
        person.position.set(utils.random(-300, 0), utils.random(-this.marchHeight, this.marchHeight));
        this.add(person);
    }

	this.effectsStopped = false;
	this.psychologyStopped = false;
	
    this.speed = this.psychology.maxSpeed/3;
	this.fatigueTreshold = 200;
	this.temperatureTreshold = 50;
	this.moraleTreshold = 40;
	this.totalFatigue = 0;
	this.totalTemperature = this.temperatureTreshold;
	this.totalMorale = this.moraleTreshold;

    // debug axes
    // var debugAxes = new Phaser.Graphics(game, 0, 0);
    // debugAxes.lineStyle(1, 0x00ff00, 1);
    // debugAxes.moveTo(0, -50);
    // debugAxes.lineTo(0, 50);
    // debugAxes.moveTo(0, 0);
    // debugAxes.lineTo(-300, 0);
    // this.addChild(debugAxes);
}

March.prototype = Object.create(Phaser.Group.prototype);
March.prototype.constructor = March;

March.prototype.update = function() {
    // :(((
    this.__proto__.__proto__.update.call(this);
	this.speed = this.psychology.maxSpeed;

    // vězni nemůžou předběhnout guardy
    if(this.position.x-5 < game.guard.position.x){
        this.x += this.speed;
		this.psychology.speed = this.speed;
		if(this.psychology.isBreak){
			this.psychology.toggleBreak();
		}
	}
	else {
		this.psychology.speed = game.guard.speed;
        this.speed = game.guard.speed;
		this.x += this.speed;
		if(game.guard.speed == 0 && !this.psychology.isBreak){
			this.psychology.toggleBreak();
		}
	}

    if(this.speed > 0){
        game.jukebox.getEffect("walk1").mute(false);
        game.jukebox.getEffect("walk2").mute(false);
        game.jukebox.getEffect("walkFast").mute(false);
    }
    else {
        game.jukebox.getEffect("walk1").mute(true);
        game.jukebox.getEffect("walk2").mute(true);
        game.jukebox.getEffect("walkFast").mute(true);
    }
	
	// Psychologie + zaznamenávání do progressu
	
    if(!this.psychologyStopped)
		this.psychology.update(game.time.physicsElapsed);
	
	if(!this.effectsStopped){
		this.totalFatigue += this.psychology.fatigue*0.1;
		this.totalTemperature -= (1-this.psychology.temperature)*0.1;
		this.totalMorale -= this.psychology.runningProb*0.1;
		if(this.totalFatigue > this.fatigueTreshold){
			this.killOne("exhausted");
			game.progress.updateDeath("exhausted", this.children.length);
			this.totalFatigue = 0;
		}
		if(this.totalTemperature < 0){
			this.killOne("freeze");
			game.progress.updateDeath("freeze", this.children.length);
			this.totalTemperature = this.temperatureTreshold;
		}
		if(this.totalMorale < 0){
				this.fleeOne();
				this.totalMorale = this.moraleTreshold;
		}
	}
	
	game.progress.updateDistance(this.position.x);
	
    // tendence si udržovat odstup
    for(var i=0; i<this.length; i++){
        var child1 = this.children[i];
        for(var j=i+1; j<this.length; j++){
            var child2 = this.children[j];

            var dx = child1.position.x - child2.position.x;
            var dy = child1.position.y - child2.position.y;
            var mag = dx*dx + dy*dy;
            var mult = 5;

            if(mag < 256){// odstup 16
                child1.repulsion.subtract(-mult*dx/mag, -mult*dy/mag);
                child2.repulsion.subtract(mult*dx/mag, mult*dy/mag);
            }
        }
    }
};

March.prototype.setSpeed = function(speed) {
    this.speed = speed/3;
};

March.prototype.killOne = function(how) { // kill, freeze, exhausted
    this.getRandom().die(how);
};

March.prototype.fleeOne = function() {
    this.getRandom().flee()
};

March.prototype.startEffects = function(){
	this.effectsStopped = false;
	this.psychologyStopped = false;
};

March.prototype.stopEffects = function(){
	this.effectsStopped = true;
	this.psychologyStopped = true;
};