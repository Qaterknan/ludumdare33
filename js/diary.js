var Diary = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, "paper");

    this.hiddenX = x;
    this.state = "hidden"; // "out", "visible"

    this.anchor.set(0, 0);
    this.text = game.make.text(40, 26,
        "transport summary\n\n"+
        "prisoners transported: 10\n"+
        "escapes: 2\n"+
        "casulties:\n"+
        " - hypothermia: 6\n"+
        " - exhaustion: 11\n"+
        " - executions: 7\n\n"+
        "distance walked: 18km\n"+
        "days elapsed: 2 days\n"
        , {
        font: "normal 16px/5px monacoregular"
    });
    this.addChild(this.text);
    // var nextPage = game.make.button(this.width/2, this.height-50, "buttonBorder", function(){
    //     console.log("asdf");
    // });
    // nextPage.anchor.set(0.5, 1);
    // nextPage.tint = 0x000000;
    // nextPage.alpha = 0.4;
    // nextPage.onInputOver.add(function(){
    //     var tween = game.add.tween(this);
    //     tween.to({alpha : 1}, 300);
    //     tween.easing(Phaser.Easing.Circular.In);
    //     tween.start();
    // }, nextPage);
    // nextPage.onInputOut.add(function(){
    //     var tween = game.add.tween(this);
    //     tween.to({alpha : 0.4}, 300);
    //     tween.easing(Phaser.Easing.Circular.Out);
    //     tween.start();
    // }, nextPage);
    // var next = game.make.text(0, -nextPage.height+4, "next page", {
    //     font: "normal 16px monacoregular"
    // });
    // next.anchor.set(0.5, 0);
    // nextPage.addChild(next);
    // paper.addChild(nextPage);

    this.inputEnabled = true;
    this.events.onInputOver.add(this.onOver, this);
    this.events.onInputOut.add(this.onOut, this);
}

Diary.prototype = Object.create(Phaser.Sprite.prototype);
Diary.prototype.constructor = Diary;

Diary.prototype.update = function() {
    this.__proto__.__proto__.update.call(this);
};

Diary.prototype.changeState = function(state) {
    var x, easing;
    easing = Phaser.Easing.Cubic.Out;
    if(state == "hidden"){
        x = this.hiddenX;
    }
    if(state == "out"){
        x = this.hiddenX - this.width*0.2;
    }
    if(state == "visible"){
        x = this.hiddenX - this.width - 2;

    }
    var tween = game.add.tween(this)
        .to({x: x}, 700)
        .easing(easing)
        .start();

    this.state = state;
};

Diary.prototype.onOver = function() {
    this.changeState("visible")
};

Diary.prototype.onOut = function() {
    this.changeState("out")
};