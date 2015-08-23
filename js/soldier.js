var Soldier = function (game) {
    Person.call(this, game, "soldier");

    this.animations.add("stand", [0]);
    this.animations.add("walk", [0, 1, 2, 3], 4, true);
    this.play("walk");

    this.inputEnabled = true;
    this.input.useHandCursor = true;
    this.events.onInputDown.add(this.shoot, this);
}
Soldier.prototype = Object.create(Person.prototype);
Soldier.prototype.constructor = Soldier;
Soldier.prototype.shoot = function() {
    this.loadTexture("shoot");
    this.animations.add("shoot", null, 10, false);
    this.play("shoot");
};