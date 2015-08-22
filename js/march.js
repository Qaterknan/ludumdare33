var March = function (game) {
    Phaser.Group.call(this, game, game.world, 'March', false, true, Phaser.Physics.ARCADE);

    this.psychology = new Psychology(this);

    for (var i = 0; i < 30; i++)
    {
        var person = new Prisoner(game);
        person.position.set(utils.random(-300, 0), utils.random(-20, 20));
        this.add(person);
    }

    this.speed = 0.3;

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
    this.x += this.speed;
    this.psychology.update(game.time.physicsElapsed);
};

March.prototype.setSpeed = function(speed) {
    this.speed = speed/3;
};

March.prototype.killOne = function() {
    this.getRandom().die();
};

March.prototype.fleeOne = function() {
    this.getRandom().flee()
};