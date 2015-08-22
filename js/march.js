var March = function (game) {
    Phaser.Group.call(this, game, game.world, 'March', false, true, Phaser.Physics.ARCADE);

    this.psychology = new Psychology(this);

    for (var i = 0; i < 30; i++)
    {
        var person = new Prisoner(game);
        person.position.set(utils.random(-300, 0), utils.random(-20, 20));
        this.add(person);
    }

    this.speed = this.psychology.speed/3;
	this.totalFatigue = 0;
	this.totalTemperature = 10;

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
	this.speed = this.psychology.speed;
    this.x += this.speed;
    this.psychology.update(game.time.physicsElapsed);
	
	this.totalFatigue += this.psychology.fatigue*0.1;
	this.totalTemperature -= (1-this.psychology.temperature)*0.1;
	if(this.totalFatigue > 10){
		this.killOne("freeze");
		this.totalFatigue = 0;
	}
	if(this.totalTemperature < 0){
		this.killOne("freeze");
		this.totalTemperature = 10;
	}
};

March.prototype.setSpeed = function(speed) {
    this.speed = speed/3;
};

March.prototype.killOne = function(how) { // kill, freeze
    this.getRandom().die(how);
};

March.prototype.fleeOne = function() {
    this.getRandom().flee()
};