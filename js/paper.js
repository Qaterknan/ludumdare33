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

    this.paddingTop = 26;
    this.paddingLeft = 40;

    var nextPage = this.nextPageButton = game.make.button(this.width/2, this.height-25, "buttonBorder", function(){
        this.changeState("hidden", function(){
            game.showFate();
        });
    }, this);
    nextPage.anchor.set(0.5, 1);
    nextPage.tint = 0x000000;
    nextPage.alpha = 0.6;
    nextPage.onInputOver.add(function(){
        var tween = game.add.tween(this);
        tween.to({alpha : 1}, 300);
        tween.easing(Phaser.Easing.Cubic.Out);
        tween.start();
    }, nextPage);
    nextPage.onInputOut.add(function(){
        var tween = game.add.tween(this);
        tween.to({alpha : 0.6}, 300);
        tween.easing(Phaser.Easing.Cubic.Out);
        tween.start();
    }, nextPage);
    var next = this.nextPageText = game.make.text(0, -nextPage.height+4, "next page", {
        font: "normal 16px monacoregular"
    });
    next.anchor.set(0.5, 0);
    nextPage.addChild(next);
    this.addChild(nextPage);
}

Paper.prototype = Object.create(Phaser.Group.prototype);
Paper.prototype.constructor = Paper;

Paper.prototype.addText = function(key) {
    var textOptions = {
        font: "normal 16px/5px monacoregular",
        wordWrap: true,
        wordWrapWidth: 295
    };
    var text = game.make.text(this.paddingLeft, this.paddingTop, "text", textOptions);
    this.addChild(text);

    this.texts[key] = text;
    return text;
};

Paper.prototype.getText = function(key) {
    return this.texts[key];
};

Paper.prototype.changeState = function(state, callback) {
    var tween = game.add.tween(this)
        .to({x: this.states[state]}, 700)
        .easing(Phaser.Easing.Cubic.Out)
        .start();
    if(callback !== undefined)
        tween.onComplete.add(callback, this);

    this.state = state;
};
