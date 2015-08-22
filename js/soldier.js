var Soldier = function (game) {
    Person.call(this, game, "soldier");

    this.animations.add("stand", [0]);
    this.animations.add("walk", [0, 1, 2, 3], 4, true);
    this.play("walk");
}
Soldier.prototype = Object.create(Person.prototype);
Soldier.prototype.constructor = Soldier;
