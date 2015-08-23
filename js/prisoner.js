var Prisoner = function (game) {
    var prisonerKeys = ["prisoner1", "prisoner2"];
    Person.call(this, game, utils.randomElement(prisonerKeys));

    this.animations.add("stand", [0]);
    var animationSpeed = 4 + Math.random();
    this.animations.add("walk", [0, 1, 2, 3], animationSpeed, true);
    this.play("walk");

    this.inputEnabled = true;
    this.input.useHandCursor = true;
    this.events.onInputDown.add(this.onClick, this);

    this.repulsion = new Phaser.Point();

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
    // náhodný pohyb
    this.body.velocity.add(
        // utils.random(0, 0), 
        0,
        utils.random(-1.5, 1.5)
        );

    // zůstávají v řadě
    var force = this.position.clone();
    force.x = -force.x;
    force.y = -0.1 * force.y;

    if(this.position.x > 0)
        this.body.velocity.x += force.x;
    if(Math.abs(this.position.y) > this.parent.marchHeight)
        this.body.velocity.y += force.y;

    // repulsion
    this.body.velocity.add(this.repulsion.x, this.repulsion.y);
    this.repulsion.set(0, 0);
    
    // mazání mimo kameru
    if(!this.inCamera && !this.alive){
        console.log("destroyed!")
        this.destroy();
    }
};

Prisoner.prototype.onClick = function(t, pointer) {
    this.die("kill");
};

Prisoner.prototype.die = function(how) {
    if(this.alive){
        console.log(arguments)
		if(how == "kill"){
            game.jukebox.playEffect("gunshot");
            this.blood.makeParticles("blood", 10, 40);
			this.blood.start(true, 0, 0, 100);
            this.loadTexture("corpse");
		}
		else if(how == "freeze"){
			this.loadTexture("frozen");
		}
        this.rotation = utils.random(0, Math.PI*2);
        this.animations.add("fall", null, 14, false);
        this.play("fall");

        var pos = this.worldPosition.clone();
        pos.add(game.camera.view.x, game.camera.view.y);
        this.parent.removeChild(this);
        game.graveyard.add(this);
        this.position = pos;
        this.alive = false;
        // zastaví jakýkoli pohyb z fyziky
        this.body.enable = false;
        this.input.useHandCursor = false;
        game.canvas.style.cursor="default";
    }
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