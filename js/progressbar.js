var Progressbar = function (game, x, y, watchObj, key) {
    Phaser.Graphics.call(this, game, x, y);

    this.beginFill(0x9300FF);
    this.drawRect(0, 0, 100, 16);
    this.endFill();
    // trochu humus ale co - rovnou se při vytvoření přidá
    var label = game.make.text(x, y, key, {
        font: "normal 11pt Arial",
        fill: "#ffffff",
    });
    game.gui.add(this);
    game.gui.add(label);

    this.watchObj = watchObj;
    this.key = key;
}

Progressbar.prototype = Object.create(Phaser.Graphics.prototype);
Progressbar.prototype.constructor = Progressbar;

Progressbar.prototype.update = function() {
    this.__proto__.__proto__.update.call(this);
    this.scale.set(this.watchObj[this.key], 1);
};