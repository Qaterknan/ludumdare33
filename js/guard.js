var Guard = function (game) {
    Phaser.Group.call(this, game, game.world, 'Guard', false, true, Phaser.Physics.ARCADE);

    var soldier;
    soldier = new Soldier(game, "general", "generalShoot");
    soldier.position.set(40, 0);
    this.add(soldier);

    soldier = new Soldier(game, "soldier", "soldierShoot");
    soldier.position.set(-100, game.march.marchHeight+30);
    this.add(soldier);
    soldier = new Soldier(game, "soldier", "soldierShoot");
    soldier.position.set(-100, -(game.march.marchHeight+30));
    this.add(soldier);

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

Guard.prototype.getNearest = function(position) {
    var minDistance = -1;
    var minChild = false;
    this.forEach(function(child){
        var dist = child.worldPosition.distance(position);
        if(dist < minDistance || minDistance < 0){
            minDistance = dist;
            minChild = child;
        }
    }, this);
    return minChild;
};