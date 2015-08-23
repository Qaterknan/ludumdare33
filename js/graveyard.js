function Graveyard(positionx, positiony){
    Phaser.Group.call(this, game, game.world, 'March', true, true, Phaser.Physics.ARCADE);
    this.position.set(positionx,positiony);
	this.name="Graveyard";
}
Graveyard.prototype=Object.create( Phaser.Group.prototype );