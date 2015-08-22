var Guard = function (game) {
    Phaser.Group.call(this, game, game.world, 'Guard', false, true, Phaser.Physics.ARCADE);

    for (var i = 0; i < 7; i++)
    {
        var person = new Soldier(game);
        if(Math.random() > 0.5)
            person.position.set(utils.random(-300, 0), utils.sgn(Math.random()-0.5)*60 + utils.random(-10, 10));
        else
            person.position.set(utils.random(20, 30), utils.random(-70, 70));
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

Guard.prototype = Object.create(Phaser.Group.prototype);
Guard.prototype.constructor = Guard;

Guard.prototype.update = function() {
    // :(((
    this.__proto__.__proto__.update.call(this);
    this.x += this.speed;
};

Guard.prototype.setSpeed = function(speed) {
    this.speed = speed/3;
};