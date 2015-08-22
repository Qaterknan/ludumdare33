var Prisoner = function (game) {
    var prisonerKeys = ["prisoner1", "prisoner2"];
    Person.call(this, game, utils.randomElement(prisonerKeys));

    this.animations.add("stand", [0]);
    var animationSpeed = 4 + Math.random();
    this.animations.add("walk", [0, 1, 2, 3], animationSpeed, true);
    this.play("walk");

    this.inputEnabled = true;
    this.input.useHandCursor = true;
    this.events.onInputDown.add(this.die, this);

    this.alive = true;

}
Prisoner.prototype = Object.create(Person.prototype);
Prisoner.prototype.constructor = Prisoner;
Prisoner.prototype.super = Person.prototype;

Prisoner.prototype.update = function() {
    // nevim, jestli se to takhle dělá, ale je to každopádně lepší, než Person.prototype.update.call()
    this.super.update.call(this);
    // select circle
    if(this.input.pointerOver()) {
        this.circle.visible = this.alive;
    }
    else {
        this.circle.visible = false;
    }
    // tendence se shlukovat u bodu 0;0 celé parent groupy
    // this.body.acceleration.set(0, 0);
    // var force = this.position.clone();
    // force.x = utils.sgn(force.x);
    // force.y = utils.sgn(force.y);
    // force.multiply(-20, -20);
    // this.body.acceleration.add(force.x, force.y);
    // // tendence si udržovat odstup
    // var repulsion = new Phaser.Point();
    // // OPTIMALIZOVAT :(((
    // this.parent.forEach(function(child){
    //  if(this != child){
    //      var vec = child.position.clone().subtract(this.position.x, this.position.y);
    //      var mag = vec.getMagnitudeSq();
    //      repulsion.subtract(100*vec.x/mag, 100*vec.y/mag);
    //  }
    // }, this);
    // this.body.acceleration.add(repulsion.x, repulsion.y);
    // // drag, protože v phaseru je cri
    // var velocityMag = this.body.velocity.getMagnitude();
    // var drag = this.body.velocity.clone().multiply(velocityMag, velocityMag);
    // var dragMult = 0.1;
    // this.body.acceleration.subtract(drag.x*dragMult, drag.y*dragMult);
};

Prisoner.prototype.die = function() {
    this.blood.start(true, 0, 0, 100);
    // this.play("stand");
    this.loadTexture("corpse");
    this.resetFrame();

    var pos = this.worldPosition.clone();
    pos.add(game.camera.view.x, game.camera.view.y);
    this.parent.removeChild(this);
    game.graveyard.add(this);
    this.position = pos;
    this.alive=false;
    this.input.useHandCursor = false;
    game.canvas.style.cursor="default";
};

Prisoner.prototype.flee = function() {
    var pos = this.worldPosition.clone();
    pos.add(game.camera.view.x, game.camera.view.y);
    this.parent.removeChild(this);
    game.world.add(this);
    this.position = pos;
    if(this.position.y < game.world.height/2){
        this.body.velocity.y = -100;
    }
    else {
        this.body.velocity.y = 100;
    }
};