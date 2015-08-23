function Psychology(parent){
	this.parent = parent;

	this.temperature = 1.0;
	this.fatigue = 0;
	
	this.temperatureToRunning = 0.9;
	this.fatigueToRunning = 0.5;
	
	this.runningProb = utils.probSum(
		this.temperature*this.temperatureToRunning,
		this.fatigue*this.fatigueToRunning
	);
	this.fear = 0;
	
	this.fatigueToSpeed = 0.8;
	this.baseSpeed = 1.0;
	this.speedBonus = 0;
	this.speed = this.baseSpeed;
	
	this.speedToEffort = 0.05;
	this.speedToTemperature = 0.2;
	
	this.baseFreezing = 0.15;
	this.freezing = this.baseFreezing;
	this.freezingToTemperature = 0.1;
	
	this.baseEffort = 0.05;
	this.effort = this.baseEffort;
	this.effortToFatigue = 0.5;
	
	this.breakToTemperature=0.9;
	this.breakToFatigue = 0.3;
	
	this.runKillToRun = 0.3;
	this.walkKillToSpeed = 0.9;
}
Psychology.prototype.update = function (dt){
	var sum = utils.probSum;
	var sub = utils.probSub;
	this.temperature = this.freezing > 0 ? sub(this.temperature, this.freezing*this.freezingToTemperature*dt) : sum(this.temperature, -this.freezing*this.freezingToTemperature*dt);
	this.fatigue = sum(this.fatigue,this.effort*this.effortToFatigue*dt);
	
	this.runningProb = sum(
		this.temperature*this.temperatureToRunning,
		this.fatigue*this.fatigueToRunning
	);
	this.runningProb = sub(this.runningProb, this.fear);
	this.fear = sub(this.fear, 0.001)
	
	this.speed = sub(this.baseSpeed, this.fatigueToSpeed*this.fatigue);
	this.speed = sum(this.speed, this.speedBonus);
	this.speedBonus = sub(this.speedBonus, 0.001);
	
	this.freezing = this.baseFreezing-this.speed*this.speedToTemperature;
	this.effort = sum(this.baseEffort,this.speed*this.speedToEffort);
	
}
Psychology.prototype.timeForABreak = function(){
	this.temperature*=this.breakToTemperature;
	this.fatigue *= this.breakToFatigue;
}
Psychology.prototype.runKill = function(){
	this.fear = this.runKillToRun;
}
Psychology.prototype.walkKill = function(){
	this.speedBonus = this.walkKillToSpeed;
}