var Paper = function (game, parent, x, y, key) {
    Phaser.Group.call(this, game, parent, key);
    this.position.set(x, y);

    this.background = game.make.sprite(0, 0, key);
    this.background.inputEnabled = true;
    this.addChild(this.background);

    this.hiddenX = x;
    this.states = {
        "hidden": this.hiddenX
    };

    this.texts = {};

    this.state = "hidden"; // "out", "visible"

    this.paddingLeft = 40;
}

Paper.prototype = Object.create(Phaser.Group.prototype);
Paper.prototype.constructor = Paper;

Paper.prototype.addText = function(key) {
    var textOptions = {
        font: "normal 16px/5px monacoregular",
        wordWrap: true,
        wordWrapWidth: 300
    };
    var text = game.make.text(this.paddingLeft, 26, "text", textOptions);
    this.addChild(text);

    this.texts[key] = text;
    return text;
};

Paper.prototype.getText = function(key) {
    return this.texts[key];
};

Paper.prototype.changeState = function(state) {
    var tween = game.add.tween(this)
        .to({x: this.states[state]}, 700)
        .easing(Phaser.Easing.Cubic.Out)
        .start();

    this.state = state;
};
