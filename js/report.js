var Report = function (game, parent, x, y) {
    Paper.call(this, game, parent, x, y, "paper2");

    this.states = {
        "hidden": this.hiddenX,
        "visible": this.hiddenX + this.width*0.2,
        "out": this.hiddenX + this.width + 2
    };

    this.background.events.onInputOver.add(this.onOver, this);
    this.background.events.onInputOut.add(this.onOut, this);

    this.paddingTop = 46;
    this.paddingLeft = 35;

    var text = this.addText("text");

    var nextPage = game.make.button(this.width/2, this.height-25, "buttonBorder", function(){
        console.log("next page");
    });
    nextPage.anchor.set(0.5, 1);
    nextPage.tint = 0x000000;
    nextPage.alpha = 0.6;
    nextPage.onInputOver.add(function(){
        var tween = game.add.tween(this);
        tween.to({alpha : 1}, 300);
        tween.easing(Phaser.Easing.Cubic.Out);
        tween.start();
    }, nextPage);
    nextPage.events.onInputOver.add(this.onOver, this);
    nextPage.onInputOut.add(function(){
        var tween = game.add.tween(this);
        tween.to({alpha : 0.6}, 300);
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

    this.changeState("hidden");
}

Report.prototype = Object.create(Paper.prototype);
Report.prototype.constructor = Report;

Report.prototype.onOver = function() {
    this.changeState("out");
};

Report.prototype.onOut = function() {
	if(!game.march.inDestination)
		this.changeState("visible");
};

Report.prototype.report = function(progress) {
    var text =
        "PRISONERS TRANSPORTATION\n" +
        "distance walked: " + progress.distanceWalked + "m \n" +
		"days elapsed: " + Math.round(progress.daysElapsed*10)/10+" days\n"+
		"prisoners transported: "+ progress.prisonersTransported+ " \n"+
		"casualties: " + progress.casualties+ " \n"+
		"  -  hypothermia: " + progress.hypothermia+" \n"+
		"  -  exhaustion: " + progress.exhaustion+" \n"+
		"  -  executions: " + progress.executions+" \n"+
		"       -  while walking: "+progress.walkKill+" \n"+
		"       -  while running away: "+progress.runKill+" \n"+
		"escapes: "+progress.escapes+" \n"+
		"  -  missed shots: "+progress.missedPrisoners+" \n";

    this.getText("text").text = text;
};