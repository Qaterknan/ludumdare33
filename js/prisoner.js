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

Prisoner.prototype.update = function() {
	// select circle
	if(this.input.pointerOver()) {
		this.circle.visible = true;
	}
	else {
		this.circle.visible = false;
	}
};

Prisoner.prototype.die = function() {
	// this.blood.start(true, 0);
	this.blood.start(true, 0, 0, 100);
};