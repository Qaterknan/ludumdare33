var Report = function (game, parent, x, y) {
    Paper.call(this, game, parent, x, y, "paper2");

    this.states = {
        "hidden": this.hiddenX,
        "visible": this.hiddenX + this.width*0.2,
        "out": this.hiddenX + this.width + 2
    };

    this.background.events.onInputOver.add(this.onOver, this);
    this.background.events.onInputOut.add(this.onOut, this);

    this.paddingLeft = 40;

    var text = this.addText("text");
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