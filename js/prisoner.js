var Prisoner = function (game) {
    var prisonerKeys = ["prisoner1", "prisoner2"];
    Person.call(this, game, utils.randomElement(prisonerKeys));

    this.animations.add("stand", [0]);
    var animationSpeed = 4 + Math.random();
    this.animations.add("walk", [0, 1, 2, 3], animationSpeed, true);
    this.play("walk");

    this.inputEnabled = true;
    this.input.useHandCursor = true;
    this.events.onInputDown.add(this.onClick, this);

    this.alive = true;
	this.timeOfDeath = 0;
	this.imageLifespan = 1500;
	this.imagedy = 20/this.imageLifespan;
	this.causeOfDeath = undefined;
}
Prisoner.prototype = Object.create(Person.prototype);
Prisoner.prototype.constructor = Prisoner;
Prisoner.prototype.super = Person.prototype;

Prisoner.prototype.update = function() {
    // nevim, jestli se to takhle dělá, ale je to každopádně lepší, než Person.prototype.update.call()
    this.super.update.call(this);
    // select circle
    if(this.input.pointerOver()) {
        this.circle.visible = this.alive;
    }
    else {
        this.circle.visible = false;
    }
	// cause of death
	
	if(this.causeOfDeath !== undefined){
		var deltaT = new Date().getTime() - this.timeOfDeath;
		if(deltaT < this.imageLifespan){
			this.causeOfDeath.alpha = 1-(deltaT)/this.imageLifespan;
			this.causeOfDeath.y = this.imagedy*deltaT;
		}
		else {
			this.causeOfDeath.destroy();
			delete this.causeOfDeath;
		}
	}
    // náhodný pohyb
    this.body.velocity.add(
        // utils.random(0, 0), 
        0,
        utils.random(-1.5, 1.5)
        );

    // tendence se shlukovat u bodu 0;0 celé parent groupy
    // this.body.acceleration.set(0, 0);
    var force = this.position.clone();
    force.x = -force.x;
    force.y = -0.1 * force.y;

    if(this.position.x > 0)
        this.body.velocity.x += force.x;
    if(Math.abs(this.position.y) > this.parent.marchHeight)
        this.body.velocity.y += force.y;
    // tendence si udržovat odstup
    var repulsion = new Phaser.Point();
    // OPTIMALIZOVAT :(((
    this.parent.forEach(function(child){
     if(this != child){
         var vec = child.position.clone().subtract(this.position.x, this.position.y);
         var mag = vec.getMagnitudeSq();
         var mult = 5;
         if(mag < 16*16)
            repulsion.subtract(mult*vec.x/mag, mult*vec.y/mag);
     }
    }, this);
    this.body.velocity.add(repulsion.x, repulsion.y);
    // // drag, protože v phaseru je cri
    // var velocityMag = this.body.velocity.getMagnitude();
    // var drag = this.body.velocity.clone().multiply(velocityMag, velocityMag);
    // var dragMult = 0.1;
    // this.body.acceleration.subtract(drag.x*dragMult, drag.y*dragMult);
};

Prisoner.prototype.onClick = function(t, pointer) {
    this.die("kill");
};

Prisoner.prototype.die = function(how) {
    if(this.alive){
        console.log(arguments)
		if(how == "kill"){
            game.jukebox.playEffect("gunshot");
			this.blood.start(true, 0, 0, 100);
            this.loadTexture("corpse");
			this.startText("kill");
		}
		else if(how == "freeze"){
			this.loadTexture("frozen");
			this.startText("freeze");
		}
        else if(how == "exhausted"){
			this.loadTexture("frozen");
			this.startText("exhausted");
		}
		else{
			this.loadTexture("frozen");
		}
        this.rotation = utils.random(0, Math.PI*2);
		if(this.causeOfDeath !== undefined){
			this.causeOfDeath.rotation = -this.rotation;
		}
        this.animations.add("fall", null, 14, false);
        this.play("fall");

        var pos = this.worldPosition.clone();
        pos.add(game.camera.view.x, game.camera.view.y);
        this.parent.removeChild(this);
        game.graveyard.add(this);
        this.position = pos;
        this.alive = false;
        // zastaví jakýkoli pohyb z fyziky
        this.body.enable = false;
        this.input.useHandCursor = false;
        game.canvas.style.cursor="default";
		
		this.timeOfDeath = new Date().getTime();
    }
};

Prisoner.prototype.flee = function() {
    var pos = this.worldPosition.clone();
    pos.add(game.camera.view.x, game.camera.view.y);
    this.parent.removeChild(this);
    game.world.add(this);
    this.position = pos;
    if(this.position.y < game.world.height/2){
        this.body.velocity.y = -100;
    }
    else {
        this.body.velocity.y = 100;
    }
};

Prisoner.prototype.startText = function (which){
	this.causeOfDeath = new Phaser.Image(game, 0, 0, which);
	this.causeOfDeath.scale.set(0.4);
	this.addChild(this.causeOfDeath);
};