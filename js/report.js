var Report = function (game, parent, x, y, key) {
	var keyz = key === undefined ? "paper2" : key;
    Paper.call(this, game, parent, x, y, keyz);

    this.states = {
        "hidden": this.hiddenX,
        "visible": this.hiddenX + this.width*0.2,
        "out": this.hiddenX + this.width + 2
    };

    // this.background.events.onInputOver.add(this.onOver, this);
    // this.background.events.onInputOut.add(this.onOut, this);

    this.paddingTop = 46;
    this.paddingLeft = 35;

    var text = this.addText("text");

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

Report.prototype.showFate = function(fate) {
    this.getText("text").text = fate.text;
    this.changeState("out");

    if(fate.next === undefined)
        this.nextPageText.text = "end game";
};