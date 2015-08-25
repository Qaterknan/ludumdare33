function Fates () {
	this.fates = {
		"gameOver": {
			paper: "report",
			text: "COMMANDER EVALUATION\nYou are hereby sentenced to death for neglecting your duties and collaboration with enemies of the state. Namely, you let %n% prisoners deliberately escape.",
		},

		"NFate":{
			paper: "report",
			text: "HANS Gaertner\nHans Gaertner was convicted to life sentence in Nuremberg Trials. He accepted his fate and never regretted his past. He died of a heart attack 11 years later.",
		},

		"OFate":{
			paper: "diary",
			text: "Hans Gaertner managed to flee to Switzerland. He attempted to forget about the trauma but he was haunted by feeling of guilt and depression. He hanged himself a few weeks after the end of war.",
		},

		"OFate+":{
			paper: "diary",
			text: "Hans Gaertner managed to flee to Switzerland. He attempted to forget about the trauma but he was haunted by feeling of guilt and depression. He hanged himself a few weeks after the end of war. Should he stand before the court, he would be found not guilty and be released in all points of the prosecution, thanks to his effort to miss escaping prisoners.",
		},

		"ZFate":{
			paper: "diary",
			text: "Thanks to his friends Hans Gaertner traveled to Switzerland and later to Argentina. He never testified, was charged or stood before court. He had a daughter Mary and a son John. He died of lung cancer at the age of 64.",
		},

		"DFate":{
			paper: "report",
			text: "Hans Gaertner stood before court in Nuremberg Trials. He was convicted to a life sentence. He kept making excuses about following orders, never really accepted the punishment or reflected his crimes. After 27 years he was released, due to bad health condition. He died soon after.",
		},

		"DFate+":{
			paper: "report",
			text: "Hans Gaertner stood before court in Nuremberg Trials. Thanks to his efforts to miss his prisoners, he was convicted to 15 years of imprisonment. He kept making excuses about following orders, never really accepted the punishment or reflected his crimes. He died 27 years after the war, due to his bad health condition.",
		}
	}
	this.finalFate = null;
}

Fates.prototype.chooseFate = function(progress) {
	var fate;
	if(progress.escapes - progress.missedPrisoners >= 7){
		fate = this.fates["gameOver"];
		fate.text = fate.text.replace("%n%", progress.escapes-progress.missedPrisoners);
	}
	else {
		var counts = [
			["N", progress.getStorylineCount("N")],
			["O", progress.getStorylineCount("O")],
			["Z", progress.getStorylineCount("Z")],
			["D", progress.getStorylineCount("D")],
			];
		counts.sort(function(a, b) {return b[1] - a[1]});
		var append = "";
		if(2*progress.missedPrisoners >= this.escapes)
			append = "+";

		if(counts[0][1] > counts[1][1]){
			var fateName = counts[0][0]+"Fate";
			if(this.fates[fateName + append] !== undefined)
				fateName = fateName + append;

			fate = this.fates[fateName];
		}
		else {
			var counts = [
				["N", progress.runKill],
				["O", progress.hypothermia],
				["Z", progress.exhaustion],
				["D", progress.walkKill * 2],
				];
			counts.sort(function(a, b) {return b[1] - a[1]});
			var fateName = counts[0][0]+"Fate";
			if(this.fates[fateName + append] !== undefined)
				fateName = fateName + append;

			fate = this.fates[fateName];
		}
	}

	return this.finalFate = fate;
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