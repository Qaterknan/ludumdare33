var Person = function (game, key) {
    Phaser.Sprite.call(this, game, 0, 0, key);

    this.scale.set(2);
    this.smoothed = false;
    this.anchor.set(0.5);

    game.physics.arcade.enable(this);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;

}
Person.prototype = Object.create(Phaser.Sprite.prototype);
Person.prototype.constructor = Person;
