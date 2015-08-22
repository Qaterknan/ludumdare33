var March = function (game) {
    Phaser.Group.call(this, game, game.world, 'March', true, true, Phaser.Physics.ARCADE);

    // game.physics.enable(this, Phaser.Physics.ARCADE);
    // this.body.drag = 10;
    // this.body.acceleration.set(1, 0);

    for (var i = 0; i < 10; i++)
    {
        var person = new Prisoner(game);
        person.position.set(utils.random(-100, 100), utils.random(-100, 100));
        this.add(person);
    }
}

March.prototype = Object.create(Phaser.Group.prototype);
March.prototype.constructor = March;