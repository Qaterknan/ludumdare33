var Prisoner = function (game) {
	Person.call(this, game, "soldier");

	this.animations.add("stand", [0]);
    this.animations.add("walk", [1, 2], 4, true);
    this.play("walk");
}
Prisoner.prototype = Object.create(Person.prototype);
Prisoner.prototype.constructor = Prisoner;
