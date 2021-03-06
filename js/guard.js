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

	this.inDestination = false;
	
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

    // Připojení se kamery
    if(this.position.x >= game.camera.position.x){
		if(!this.inDestination)
			game.camera.follow(game.guard);
    }
	
	if(this.position.x  >= game.finalGate.position.x){
		if(!this.inDestination){
			game.camera.unfollow();
			this.inDestination = true;
		}
		if(this.position.x - 350 >= game.finalGate.position.x){
			this.speed = 0;
		}
	}
};

Guard.prototype.setSpeed = function(speedIndex) {
    var speeds = [
        0,
        0.4,
        0.6,
        0.8
    ];
    var tween = game.add.tween(this)
        .to({speed : speeds[speedIndex]}, 1000)
        .easing(Phaser.Easing.Cubic.Out)
        .start();
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