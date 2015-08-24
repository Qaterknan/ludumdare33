var Soldier = function (game, key, shootKey) {
    Person.call(this, game, key);
    this.defaultKey = key;
    this.shootKey = shootKey;

    this.animations.add("stand", [0]);
    this.animations.add("walk", [0, 1, 2, 3], 4, true);
    this.play("walk");

    // this.inputEnabled = true;
    // this.input.useHandCursor = true;
    // this.events.onInputDown.add(this.shoot, this);

    this.events.onFire = new Phaser.Signal();
    this.lookAt = null;
}
Soldier.prototype = Object.create(Person.prototype);
Soldier.prototype.constructor = Soldier;
Soldier.prototype.shoot = function(prisoner) {
    this.lookAt = prisoner.worldPosition;
    this.events.onFire.removeAll();
    this.loadTexture(this.shootKey);
    var shoot = this.animations.add("shoot", null, 12, false);
    shoot.enableUpdate = true;
    var _this = this;
    shoot.onUpdate.add(function(){
        delayMult = 6;
        if(this.frame == 2){
            this.delay *= delayMult;
        }
        else if(this.frame == 3){
            this.delay /= delayMult;
        }
        else if(this.frame == 4){
            _this.events.onFire.dispatch(_this);
        }
    }, shoot);
    this.play("shoot");

    shoot.onComplete.add(function(){
        this.lookAt = null;
        this.rotation = 0;
        this.loadTexture(this.defaultKey);
        this.play("walk");
    }, this);
};

Soldier.prototype.update = function() {
    this.__proto__.__proto__.update.call(this);

    if(this.lookAt !== null){
        var angle = Phaser.Point.angle(this.worldPosition, this.lookAt);
        this.rotation = angle - Math.PI;
    }
}