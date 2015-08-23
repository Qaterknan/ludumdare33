function Psychology(parent){
	this.parent = parent;

	this.temperature = 1.0;
	this.fatigue = 0;
	
	this.temperatureToRunning = 0.6;
	this.fatigueToRunning = 0.5;
	
	this.runningProb = utils.probSum(
		this.temperature*this.temperatureToRunning,
		this.fatigue*this.fatigueToRunning
	);
	this.fear = 0.2;
	
	this.fatigueToSpeed = 0.8;
	this.baseSpeed = 1.0;
	this.speedBonus = 0;
	this.speed = this.baseSpeed;
	this.maxSpeed = this.speed;
	
	this.speedToEffort = 0.05;
	this.speedToTemperature = 0.4;
	
	this.baseFreezing = 0.15;
	this.freezing = this.baseFreezing;
	this.freezingToTemperature = 0.1;
	
	this.baseEffort = 0.05;
	this.effort = this.baseEffort;
	this.effortToFatigue = 0.5;
	
	this.isBreak = false;
	this.baseToBreakEffort = 0.25;
	
	this.runKillToRun = 0.99;
	this.walkKillToSpeed = 0.9;
	this.runAwayToFear = 0.5;
}
Psychology.prototype.update = function (dt){
	var sum = utils.probSum;
	var sub = utils.probSub;
	this.temperature = this.freezing > 0 ? sub(this.temperature, this.freezing*this.freezingToTemperature*dt) : sum(this.temperature, -this.freezing*this.freezingToTemperature*dt);
	this.fatigue = this.effort > 0 ? sum(this.fatigue,this.effort*this.effortToFatigue*dt) : sub(this.fatigue, -this.effort*this.effortToFatigue*dt);
	
	this.runningProb = sum(
		this.temperature*this.temperatureToRunning,
		this.fatigue*this.fatigueToRunning
	);
	this.runningProb = sub(this.runningProb, this.fear);
	this.fear = sub(this.fear, 0.0001)
	
	this.maxSpeed = sub(this.baseSpeed, this.fatigueToSpeed*this.fatigue);
	this.maxSpeed = sum(this.maxSpeed, this.speedBonus);
	this.speedBonus = sub(this.speedBonus, 0.0001);
	
	this.freezing = this.baseFreezing-this.speed*this.speedToTemperature;
	this.effort = sum(this.baseEffort,this.speed*this.speedToEffort);
	
}
Psychology.prototype.toggleBreak = function(){
	this.baseEffort = this.isBreak ? this.baseEffort*(-this.baseToBreakEffort) : this.baseEffort*(-1/this.baseToBreakEffort);
	this.isBreak = !this.isBreak;
}
Psychology.prototype.runKill = function(){
	this.fear = this.runKillToRun;
}
Psychology.prototype.walkKill = function(){
	this.speedBonus = this.walkKillToSpeed;
}
Psychology.prototype.escape = function(){
	this.fear *= this.runAwayToFear;
}