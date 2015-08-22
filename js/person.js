var Person = function (game, key) {
    Phaser.Sprite.call(this, game, 0, 0, key);

    this.scale.set(2);
    this.smoothed = false;
    this.anchor.set(0.5);

    game.physics.arcade.enable(this);
    this.body.drag.set(10);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;

    // select circle
    this.circle = new Phaser.Graphics(game, 0, 0);
    this.circle.lineStyle(1, 0x00ff00, 1);
    this.circle.drawCircle(this.x, this.y, 10);
    this.circle.visible = false;
    this.addChild(this.circle);

    // footsteps emitter
    // TODO
    
    // blood emitter
    // new Phaser.Emitter(game, 0, 0, 100);
    
}
Person.prototype = Object.create(Phaser.Sprite.prototype);
Person.prototype.constructor = Person;
