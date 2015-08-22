function Graveyard(positionx, positiony, z){
    Phaser.Group.call(this, game, game.world, 'March', true, true, Phaser.Physics.ARCADE);
    this.position.set(positionx,positiony);
	this.name="Graveyard";
	this.z = z;
}
Graveyard.prototype=Object.create( Phaser.Group.prototype );