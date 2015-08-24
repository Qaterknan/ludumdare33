var Report = function (game, parent, x, y) {
    Paper.call(this, game, parent, x, y);

    this.states = {
        "hidden": this.hiddenX,
        "out": this.hiddenX + this.width*0.2,
        "visible": this.hiddenX + this.width - 2
    };

    this.paddingLeft = 40;
}

Report.prototype = Object.create(Paper.prototype);
Report.prototype.constructor = Report;
