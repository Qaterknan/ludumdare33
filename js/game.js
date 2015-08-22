var game = new Phaser.Game(800, 480, Phaser.CANVAS, document.body, { preload: preload, create: create, update: update, render: render });
function preload() {

    game.load.image('tree','images/tree.png');
    game.load.spritesheet('soldier', 'images/soldier.png', 8, 8);

}

function create() {
    // centrování canvasu
    $(game.canvas).center();

    // nastavení světa
    game.world.setBounds(0, 0, 8000, 480);
    game.stage.backgroundColor = '#dddddd';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // pokusy
    var soldier = game.add.sprite(300, 300, 'soldier', 0);
    
    soldier.scale.set(2);
    soldier.smoothed = false;
    soldier.anchor.setTo(0.5, 0.5);
    soldier.animations.add("stand", [0]);
    soldier.animations.add("walk", [1, 2], 4, true);
    soldier.play("walk");
    
    game.physics.enable(soldier, Phaser.Physics.ARCADE);
}

function update() {

}

function render() {

    game.debug.cameraInfo(game.camera, 32, 32);
    // game.debug.spriteCoords(player, 32, 500);

}