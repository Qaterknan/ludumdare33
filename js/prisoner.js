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
    this.events.onInputOver.add(this.onHover, this);

    this.repulsion = new Phaser.Point();
	this.fleeing = false;
    this.alive = true;
	this.aimedAt = false;
	this.timeOfDeath = 0;
	this.causeOfDeath = undefined;
}
Prisoner.prototype = Object.create(Person.prototype);
Prisoner.prototype.constructor = Prisoner;
Prisoner.prototype.super = Person.prototype;

Prisoner.prototype.onHover = function() {
	if(game.march.inDestination)
		return;
    this.circle.scale.set(1.5, 1.5);
    var tween = game.add.tween(this.circle.scale);
    tween.to({x : 1, y : 1}, 100);
    tween.easing(Phaser.Easing.Cubic.Out);
    tween.start();
};

Prisoner.prototype.update = function() {
    // nevim, jestli se to takhle dělá, ale je to každopádně lepší, než Person.prototype.update.call()
    this.super.update.call(this);
    // select circle
    if(this.input.pointerOver()) {
        this.circle.visible = this.alive && !game.march.inDestination;
    }
    else {
        this.circle.visible = false;
    }

    if(!this.fleeing){
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
    }
    else {
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    }
    
    // mazání mimo kameru
    if(!this.inCamera && (!this.alive || this.fleeing)){
		if(this.fleeing){
			// Podařilo se mu utéct
			game.march.psychology.escape();
            if(this.aimedAt !== false){
                this.aimedAt.missedPrisoner = true;
                console.log(this.aimedAt)
            }
			game.progress.updateEscape(this.aimedAt !== false, game.march.children.length);
		}
        this.destroy();
    }
};

Prisoner.prototype.onClick = function(t, pointer) {
    if(this.alive){
		if(game.march.inDestination)
			return;
        var soldier = game.guard.getNearest(this.worldPosition);
        soldier.shoot(this);
		this.aimedAt = soldier;
        soldier.events.onFire.addOnce(this.onShot, this);
    }
};

Prisoner.prototype.onShot = function(soldier) {
    this.die("kill");
    var angle = Phaser.Point.angle(this.worldPosition, soldier.worldPosition);
    this.rotation = angle;
};

Prisoner.prototype.die = function(how) {
    if(this.alive){
		if(how == "kill"){
			// Efekty zabití
			if(this.fleeing){
				game.march.psychology.runKill();
				game.progress.updateDeath("runKill", game.march.children.length);
				this.fleeing = false;
				for(var i =0; i < this.children.length;i++){
					if(this.children[i].key == "arrow")
						this.children[i].destroy();
				};
			}
			else {
				game.march.psychology.walkKill();
				game.progress.updateDeath("walkKill", game.march.children.length);
			}
            this.blood.makeParticles("blood", 10, 40);
			this.blood.start(true, 0, 0, 100);
            this.loadTexture("corpse");
			this.startText("kill");
		}
		else if(how == "freeze"){
			this.loadTexture("frozen");
			game.progress.updateDeath("freeze", game.march.children.length);
			this.startText("freeze");
		}
        else if(how == "exhausted"){
			game.progress.updateDeath("exhausted", game.march.children.length);
			this.loadTexture("frozen");
			this.startText("exhausted");
		}
		else{
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
		
		this.timeOfDeath = new Date().getTime();
    }
};

Prisoner.prototype.flee = function() {
    var pos = this.worldPosition.clone();
    pos.add(game.camera.view.x, game.camera.view.y);
    this.parent.removeChild(this);
    game.fleeing.add(this);
    this.position = pos;
    if(this.position.y < game.world.height/2){
        this.body.velocity.y = -100;
    }
    else {
        this.body.velocity.y = 100;
    }
	this.fleeing = true;
	var arr = new Phaser.Image(game, -2, -10, "arrow");
	arr.scale.set(0.15);
	this.addChild(arr);
};

Prisoner.prototype.startText = function (which) {
    this.statusImage(which);
};