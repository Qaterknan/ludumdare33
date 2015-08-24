var Diary = function (game, parent, x, y) {
    Paper.call(this, game, parent, x, y, "paper");

    this.states = {
        "hidden": this.hiddenX,
        "visible": this.hiddenX - this.background.width*0.2,
        "out": this.hiddenX - this.background.width - 2
    };

    this.background.events.onInputOver.add(this.onOver, this);
    this.background.events.onInputOut.add(this.onOut, this);

    this.opened = false;

    this.nextPageButton.visible = false;

    var text = this.addText("text");

    var onOver = function(){
        if(!this.disabled){
            var tween = game.add.tween(this);
            tween.to({alpha : 1}, 300);
            tween.easing(Phaser.Easing.Cubic.Out);
            tween.start();
        }
    }
    var onOut = function(){
        if(!this.chosen && !this.disabled){
            var tween = game.add.tween(this);
            tween.to({alpha : 0.4}, 300);
            tween.easing(Phaser.Easing.Cubic.Out);
            tween.start();
        }
    }
	var onDown = function(){
		game.progress.storyline[game.diary.story] = this.name;
        game.diary.chosen(this);
        this.chosen = true;
        this.alpha = 1;
	}

    var answers = ["textA", "textB", "textC"];
    for(var i=0;i<answers.length;i++){
        var answer = this.addText(answers[i]);
        answer.alpha = 0.4;
        answer.inputEnabled = true;
        answer.input.useHandCursor = true;
        answer.events.onInputOver.add(onOver, answer);
        answer.events.onInputOver.add(this.onOver, this);
        answer.events.onInputOut.add(onOut, answer);
        answer.events.onInputOut.add(this.onOut, this);
		
        answer.events.onInputDown.add(onDown, answer);
		answer.name = answers[i][answers[i].length-1];
    }

    this.textStrings = [
        new Text(
            "What am I still doing here? Russians are closing in...We should let prisoners go and get lost. Screw the doctrine. We are all in the same boat now.But orders are orders. We have to take them to the camp.",
            "The Reich can still make use of them. And win the war.",
            "Russians must not get them. Not after they have seen.",
            "It will be easier and faster to put an end to this in the camp. Plus it's more economical."
            ),
        new Text(
            "I wonder why they do not try and kill us.",
            "They would die with honour at least. Germans, for example, would never even become slaves.",
            "Maybe it is because we beat the last bits of will out of them long time ago.",
            "If only they tried! At least we would have more time to disappear and noone could condemn it as a war crime."
            ),
		
    ];
    this.story = 0;
}

Diary.prototype = Object.create(Paper.prototype);
Diary.prototype.constructor = Diary;

Diary.prototype.chosen = function(chosen) {
    game.jukebox.playEffect("writing");
    var answers = ["textA", "textB", "textC"];
    for(var i=0;i<answers.length;i++){
        var answer = this.getText(answers[i]);
        if(answer != chosen){
            answer.disabled = true;
            var tween = game.add.tween(answer);
                tween.to({alpha : 0}, 700);
                tween.easing(Phaser.Easing.Cubic.Out);
                tween.start();
                tween.onComplete.add(function(){
                    this.visible = false;
                }, answer);
        }
    }
    this.opened = false;

    game.time.events.add(3000, this.open, this);
};

Diary.prototype.open = function() {
    if(this.nextQuestion() && !this.showingFate){
        this.opened = true;
        this.changeState("visible");
    }
};

Diary.prototype.hide = function() {
    this.showingFate = true;
    this.opened = false;
    this.changeState("hidden");
};

Diary.prototype.onOver = function() {
    this.changeState("out");
};

Diary.prototype.onOut = function() {
    if(this.opened)
        this.changeState("visible");
    else
        this.changeState("hidden");
};

Diary.prototype.nextQuestion = function() {
    if(this.story < this.textStrings.length){
        this.changeQuestion(this.textStrings[this.story]);
        this.story++;
        return true;
    }
    return false;
};

Diary.prototype.changeQuestion = function(textobj) {
    var text = this.getText("text");
    var textA = this.getText("textA");
    var textB = this.getText("textB");
    var textC = this.getText("textC");
    textA.disabled = textA.chosen = false;
    textB.disabled = textB.chosen = false;
    textC.disabled = textC.chosen = false;
    textA.visible = true;
    textB.visible = true;
    textC.visible = true;
    textA.alpha = textB.alpha = textC.alpha = 0.4;

    text.text = textobj.monologue;
    textA.y = text.bottom;
    textA.text = "1. " + textobj.a;
    textB.y = textA.bottom;
    textB.text = "2. " + textobj.b;
    textC.y = textB.bottom;
    textC.text = "3. " + textobj.c;
};

Diary.prototype.showFate = function(fate) {
    this.showingFate = true;
    this.background.events.onInputOver.removeAll();
    this.background.events.onInputOut.removeAll();

    this.getText("text").text = fate.text;
    this.getText("textA").visible = false;
    this.getText("textB").visible = false;
    this.getText("textC").visible = false;
    this.changeState("out");

    this.nextPageButton.visible = true;

    if(fate.next === undefined)
        this.nextPageText.text = "end game";
};

function Text(monologue, a, b, c) {
    this.monologue = monologue;
    this.a = a;
    this.b = b;
    this.c = c;
}