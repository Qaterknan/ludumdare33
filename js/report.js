var Report = function (game, parent, x, y) {
    Paper.call(this, game, parent, x, y, "paper2");

    this.states = {
        "hidden": this.hiddenX,
        "visible": this.hiddenX + this.width*0.2,
        "out": this.hiddenX + this.width + 2
    };

    this.background.events.onInputOver.add(this.onOver, this);
    this.background.events.onInputOut.add(this.onOut, this);

    this.paddingTop = 50;
    this.paddingLeft = 35;

    var text = this.addText("text");

    var nextPage = game.make.button(this.width/2, this.height-30, "buttonBorder", function(){
        console.log("next page");
    });
    nextPage.anchor.set(0.5, 1);
    nextPage.tint = 0x000000;
    nextPage.alpha = 0.4;
    nextPage.onInputOver.add(function(){
        var tween = game.add.tween(this);
        tween.to({alpha : 1}, 300);
        tween.easing(Phaser.Easing.Cubic.Out);
        tween.start();
    }, nextPage);
    nextPage.events.onInputOver.add(this.onOver, this);
    nextPage.onInputOut.add(function(){
        var tween = game.add.tween(this);
        tween.to({alpha : 0.4}, 300);
        tween.easing(Phaser.Easing.Cubic.Out);
        tween.start();
    }, nextPage);
    nextPage.events.onInputOut.add(this.onOut, this);
    var next = game.make.text(0, -nextPage.height+4, "next page", {
        font: "normal 16px monacoregular"
    });
    next.anchor.set(0.5, 0);
    nextPage.addChild(next);
    this.addChild(nextPage);

    this.report({distanceWalked: 10})
    this.changeState("visible");
}

Report.prototype = Object.create(Paper.prototype);
Report.prototype.constructor = Report;

Report.prototype.onOver = function() {
    this.changeState("out");
};

Report.prototype.onOut = function() {
    this.changeState("visible");
};

Report.prototype.report = function(progress) {
    var text =
        "prisoners transportation report" +
        "distance walked: " + progress.distanceWalked + "m";

    this.getText("text").text = text;
};