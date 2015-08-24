function Jukebox(game){
	this.game = game;
	this.timer = game.time.create(false);
	this.timer.start();
	this.globalMute = false;

	this.effects = [];
}
Jukebox.prototype.getEffect = function(effectName) {
	return this.effects[effectName];
};
Jukebox.prototype.addEffect = function(audioName, effectName, volume) {
	if(this.effects[effectName] === undefined)
		this.effects[effectName] = new Effects(this);
	
	var effect = this.getEffect(effectName);
	effect.add(audioName, volume);
	
	return effect;
};
Jukebox.prototype.playEffect = function(effectName) {
	this.getEffect(effectName).play();
};
Jukebox.prototype.loopEffect = function(effectName, wait, addRandomWait) {
	this.getEffect(effectName).startLoop(wait, addRandomWait);
};
Jukebox.prototype.mute = function(m){
	this.globalMute = m;
	for(var i in this.effects){
		this.effects[i].mute(m);
	};
};

function Effects(jukebox) {
	this.jukebox = jukebox;

	this.effects = [];
	this.waitTime = 0;
	this.randomWait = 0;
	this.looping = false;
}
Effects.prototype.add = function(audioName, volume) {
	var audio = game.add.audio(audioName);
	audio.volume = volume === undefined ? 1 : volume;
	audio.onStop.add(this.finishedPlaying, this);
	
	this.effects.push(audio);
};
Effects.prototype.play = function() {
	utils.randomElement(this.effects).play();
};

Effects.prototype.finishedPlaying = function() {
	this.wait();
};
Effects.prototype.wait = function() {
	this.jukebox.timer.add(this.waitTime + utils.randomInt(0, this.randomWait), this.loop, this);
};
Effects.prototype.loop = function() {
	if(this.looping)
		this.play();
};
Effects.prototype.startLoop = function(wait, randomWait) {
	this.waitTime = wait * 1000;
	this.randomWait = randomWait * 1000;
	this.looping = true;

	this.wait();
};
Effects.prototype.mute = function(mute) {
	var newMute = this.jukebox.globalMute ? true : mute;
	for(var i=0; i<this.effects.length; i++){
		this.effects[i].mute = newMute;
	}
};