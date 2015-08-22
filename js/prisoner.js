var Prisoner = function (game) {
	Person.call(this, game, "soldier");

	this.animations.add("stand", [0]);
    this.animations.add("walk", [1, 2], 4, true);
    this.play("walk");

    this.inputEnabled = true;
    this.input.useHandCursor = true;
    this.events.onInputDown.add(this.die, this);


}
Prisoner.prototype = Object.create(Person.prototype);
Prisoner.prototype.constructor = Prisoner;
Prisoner.prototype.super = Person.prototype;

Prisoner.prototype.update = function() {
	// nevim, jestli se to takhle dělá, ale je to každopádně lepší, než Person.prototype.update.call()
	this.super.update.call(this);
	// select circle
	if(this.input.pointerOver()) {
		this.circle.visible = true;
	}
	else {
		this.circle.visible = false;
	}
	// tendence se shlukovat u bodu 0;0 celé parent groupy
	// this.body.acceleration.set(0, 0);
	// var force = this.position.clone();
	// force.x = utils.sgn(force.x);
	// force.y = utils.sgn(force.y);
	// force.multiply(-20, -20);
	// this.body.acceleration.add(force.x, force.y);
	// // tendence si udržovat odstup
	// var repulsion = new Phaser.Point();
	// // OPTIMALIZOVAT :(((
	// this.parent.forEach(function(child){
	// 	if(this != child){
	// 		var vec = child.position.clone().subtract(this.position.x, this.position.y);
	// 		var mag = vec.getMagnitudeSq();
	// 		repulsion.subtract(100*vec.x/mag, 100*vec.y/mag);
	// 	}
	// }, this);
	// this.body.acceleration.add(repulsion.x, repulsion.y);
	// // drag, protože v phaseru je cri
	// var velocityMag = this.body.velocity.getMagnitude();
	// var drag = this.body.velocity.clone().multiply(velocityMag, velocityMag);
	// var dragMult = 0.1;
	// this.body.acceleration.subtract(drag.x*dragMult, drag.y*dragMult);
};

Prisoner.prototype.die = function() {
	this.blood.start(true, 0, 0, 100);
	console.log(this);
};