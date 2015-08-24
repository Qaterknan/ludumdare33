function Fates () {
	this.fates = {
		"testFate": {
			paper: "report",
			text: "COMMANDER EVALUATION\nu got hangd lulz",
			next: {
				paper: "diary",
				text: "sum juw got gas'd lul",
			}
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