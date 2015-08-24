function Fates () {
	this.fates = {
		"gameOver": {
			paper: "report",
			text: "COMMANDER EVALUATION\nYou are hereby sentenced to death for neglecting your duties and collaboration with enemies of the state.",
		},

		"NFate":{
			paper: "report",
			text: "HANS HEISSMEYER\nHans Heissmeyer was convicted to life sentence in Nuremberg Trials. He accepted his fate and never regretted his past. He died of a heart attack 11 years later.",
		},

		"OFate":{
			paper: "diary",
			text: "Hans Heissmeyer managed to flee to Switzerland. He attempted to forget about the trauma but he was haunted by feeling of guilt and depression. He hanged himself a few weeks after the end of war.",
		},

		"OFate+":{
			paper: "diary",
			text: "Hans Heissmeyer managed to flee to Switzerland. He attempted to forget about the trauma but he was haunted by feeling of guilt and depression. He hanged himself a few weeks after the end of war. Should he stand before the court, he would be found not guilty and be released in all points of the prosecution, thanks to his effort to miss escaping prisoners.",
		},

		"ZFate":{
			paper: "diary",
			text: "Thanks to his friends Hans Heissmeyer traveled to Switzerland and later to Argentina. He never testified, was charged or stood before court. He had a daughter Mary and a son John. He died of lung cancer at the age of 64.",
		},

		"DFate":{
			paper: "report",
			text: "Hans Heissmeyer stood before court in Nuremberg Trials. He was convicted to a life sentence. He kept making excuses about following orders, never really accepted the punishment or reflected his crimes. After 27 years he was released, due to bad health condition. He died soon after.",
		},

		"DFate+":{
			paper: "report",
			text: "Hans Heissmeyer stood before court in Nuremberg Trials. Thanks to his efforts to miss his prisoners, he was convicted to 15 years of imprisonment. He kept making excuses about following orders, never really accepted the punishment or reflected his crimes. He died 27 years after the war, due to his bad health condition.",
		}
	}
	this.finalFate = null;
}

Fates.prototype.chooseFate = function(progress) {
	return this.finalFate = this.fates["testFate"];
};

Fates.prototype.getFate = function(progress) {
	if(this.finalFate === null)
		this.chooseFate(progress);

	return this.finalFate;
};

Fates.prototype.next = function() {
	if(this.finalFate.next !== undefined)
		this.finalFate = this.finalFate.next;
	else
		this.finalFate = false;
};