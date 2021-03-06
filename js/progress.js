function Progress(){
	
	this.prisonersTransported = 0;
	
	this.casualties = 0;
	this.hypothermia = 0;
	this.exhaustion = 0;
	this.executions = 0;
	
	this.walkKill = 0;
	this.runKill = 0;
	
	this.distanceWalked = 0;
	this.daysElapsed = 0;
	this.startTime = new Date().getTime();
	this.timeFromStart = 0;
	
	this.escapes = 0;
	this.missedPrisoners = 0;
	
	this.finished = false;
	
	this.storyline = [];
	
}

Progress.prototype.getStorylineCount = function(story) {
	var count = 0;
	for(var i=0; i<this.storyline.length; i++){
		if(this.storyline[i] == story)
			count++;
	}

	return count;
};

Progress.prototype.updateDeath = function (how, left){
	this.casualties++;
	this.prisonersTransported--;
	
	if(how == "freeze")
		this.hypothermia++;
	if(how == "exhausted")
		this.exhaustion++;
	if(how == "walkKill"){
		this.walkKill++;
		this.executions++;
	}
	if(how == "runKill"){
		this.runKill++;
		this.executions++;
	}
	// this.checkLeft(left);
}
Progress.prototype.updateEscape = function(missed, left){
	this.escapes++;
	this.missedPrisoners += missed ? 1 : 0;
	this.prisonersTransported--;
	// this.checkLeft(left);
}
Progress.prototype.init = function (howMany){console.log("init");
	this.prisonersTransported = howMany;
	this.startTime = new Date().getTime();
}
Progress.prototype.updateDistance = function(xposition){
	if(game.march.inDestination)
		return;
	this.timeFromStart = new Date().getTime();
	this.daysElapsed = (this.timeFromStart - this.startTime)/60000;
	this.distanceWalked = Math.round((xposition-400)*3);
}
// Progress.prototype.checkLeft = function(l){
// 	if(l == this.prisonersTransported)
// 		return true;
// 	else{
// 		console.warn("Uniká nějaký druh smrti" + game.march.children.length + " "+ this.prisonersTransported);
// 	}
// }
Progress.prototype.sendStats = function (){
	$.ajax({
		type : "POST",
		url : "stats.php",
		data : {stats : JSON.stringify(this)},
	});
}