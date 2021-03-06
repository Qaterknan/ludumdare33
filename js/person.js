var Person = function (game, key) {
    Phaser.Sprite.call(this, game, 0, 0, key);

    this.scale.set(2);
    this.smoothed = false;
    this.anchor.set(0.5);

    game.physics.arcade.enable(this);
    this.body.drag.set(10);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;

    // blood emitter
    this.blood = game.make.emitter(0, 0, 100);
    this.blood.setRotation(0, 0);
    this.blood.particleDrag.set(1000);
    this.blood.gravity = 0;
    this.blood.minParticleSpeed.set(40, -70);
    this.blood.maxParticleSpeed.set(200, 70);
    this.addChild(this.blood);

    // TODO: footsteps particle effect
    this.footsteps = game.make.emitter(0, 0, 30);
    this.footsteps.makeParticles("footstep", 0, 30);
    this.footsteps.setRotation(0, 0);
    this.footsteps.gravity = 0;
    this.footsteps.height = 4;
    var lifespan = 6000;
    this.footsteps.setAlpha(0.6, 0.2, lifespan);
    this.footsteps.minParticleSpeed.set(0, 0);
    this.footsteps.maxParticleSpeed.set(0, 0);
    this.footsteps.minParticleScale = 2;
    this.footsteps.maxParticleScale = 2;
    game.emitters.add(this.footsteps);
    this.footsteps.start(false, lifespan, 1000, 0);

    // select circle
    this.circle = new Phaser.Graphics(game, 0, 0);
    this.circle.lineStyle(1, 0xDD3232, 1);
    this.circle.drawCircle(this.x, this.y, 10);
    this.circle.visible = false;
    this.addChild(this.circle);
}
Person.prototype = Object.create(Phaser.Sprite.prototype);
Person.prototype.constructor = Person;
Person.prototype.update = function() {
    if(this.parent !== undefined){
        if(this.animations.currentAnim.name == "walk" || this.animations.currentAnim.name == "stand"){
            if(this.parent.speed === 0){
                this.play("stand");
            }
            else if(this.parent.speed > 0) {
                this.play("walk");
            }
        }

        var pos = this.worldPosition.clone();
        pos.add(game.camera.view.x, game.camera.view.y);
        this.footsteps.emitX = pos.x;
        this.footsteps.emitY = pos.y;
        if(this.parent.speed > 0.5)
            this.footsteps.frequency = 300/this.parent.speed;

        if(this.fleeing){
            this.footsteps.width = 4;
            this.footsteps.height = 1;
            this.footsteps.frequency = 10000/this.body.velocity.getMagnitude();
            if(this.body.velocity.y > 0){
                this.footsteps.forEach(function(particle){
                    particle.rotation = Math.PI/2;
                });
            }
            else {
                this.footsteps.forEach(function(particle){
                    particle.rotation = -Math.PI/2;
                });
            }

        }

        var animationSpeed = 12*this.parent.speed;
        animationSpeed += utils.random(0, 0.1)*animationSpeed; // 10% pro desync animací
        if(this.animations.currentAnim.name == "walk")
            this.animations.currentAnim.speed = animationSpeed;
    }
};

Person.prototype.statusImage = function(which) {
    var pos = this.worldPosition.clone();
    pos.add(game.camera.view.x, game.camera.view.y);
    this.statusImg = new Phaser.Image(game, Math.round(pos.x), Math.round(pos.y)-10, which);
    this.statusImg.scale.set(2, 2);
    this.statusImg.smoothed = false;
    this.statusImg.anchor.set(0.5, 0.5);

    var tween = game.add.tween(this.statusImg);
    tween.to({y : pos.y-60, alpha : 0}, 3000);
    tween.start();
    tween.easing(Phaser.Easing.Linear.None);
    var _this = this;
    tween.onComplete.add(function(){
        _this.statusImg.destroy();
    })

    game.world.add(this.statusImg);
};