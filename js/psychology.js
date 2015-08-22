function Psychology(){
	
	this.temperature = 1.0;
	this.fatigue = 0;
	
	this.temperatureToRunning = 0.9;
	this.fatigueToRunning = 0.5;
	
	this.runningProb = utils.probSum(
		this.temperature*this.temperatureToRunning,
		this.fatigue*this.fatigueToRunning
	);
	this.fatigueToSpeed = 0.5;
	this.speed = 0.3;
	
	this.speedToEffort = 0.1;
	this.speedToTemperature = 0.2;
	this.freezing = 0.05-this.speed*this.speedToTemperature;
	this.effort = 0.02+this.speed*this.speedToEffort;
	
	this.breakToTemperature=0.3;
	this.breakToFatigue = 0.3;
	
	this.runKillToRun = 0.1;
	this.lastKill = 0;
	this.halfTimeOfFear = 10000;
	this.walkKillToSpeed = 2;
}
Psychology.prototype.update = function (dt){
	var sum = utils.probSum;
	this.temperature -= this.freezing*dt/1000;
	this.fatigue = sum(this.fatigue,this.effort*dt/1000);
	
	this.runningProb = sum(
		this.temperature*this.temperatureToRunning,
		this.fatigue*this.fatigueToRunning
	)*(1-(1-this.runKillToRun)*((new Date().getTime())-this.lastKill)/this.halfTimeOfFear);
	
	this.speed -= this.fatigueToSpeed*this.fatigue;
	
	this.freezing = 0.05-this.speed*this.speedToTemperature;
	this.effort = 0.02+this.speed*this.speedToEffort;
	
}
Psychology.prototype.timeForABreak = function(){
	this.temperature*=this.breakToTemperature;
	this.fatigue *= this.breakToFatigue;
}
Psychology.prototype.runKill = function(){
	this.lastKill = new Date().getTime();
}
Psychology.prototype.walkKill = function(){
	this.speed = utils.probMul(this.walkKillToSpeed, this.speed);
}