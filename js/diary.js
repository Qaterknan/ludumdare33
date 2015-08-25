var Diary = function (game, parent, x, y) {
    Paper.call(this, game, parent, x, y, "paper_cri");

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
		game.progress.storyline[game.diary.story-1] = this.personality;
		if(this.personality == "O" && game.diary.story == 7){
			game.march.fleeOne();
		}
        game.diary.chosen(this);
        this.chosen = true;
        this.alpha = 1;
	}

    var answers = ["textA", "textB", "textC", "textD"];
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
		answer.code = answers[i][answers[i].length-1];
    }
	// personalityKey - {"A" : "", "B" : "", "C" : "", "D" : ""}
    this.textStrings = [
        new Text(
            "What am I still doing here? Russians are closing in...We should let prisoners go and get lost. Screw the doctrine. We are all in the same boat now.But orders are orders. We have to take them to the camp.",
            "The Reich can still make use of them. And win the war.",
            "Russians must not get them. Not after they have seen.",
            "It will be easier and faster to put an end to this in the camp. Plus it's more economical.",
			"What happens in the camp is not my responsibility so I will actually keep my hands clean.",
			{"A" : "N", "B" : "O", "C" : "Z", "D" : "D"}
            ),
        new Text(
            "I wonder why they do not try and kill us.",
            "They would die with honour at least. Germans, for example, would never even become slaves.",
            "Maybe it is because we beat the last bits of will out of them long time ago.",
            "If only they tried! At least we would have more time to disappear and noone could condemn it as a war crime.",
            "Killing them puts an end to their suffering after all. And I would do it for them, unlike most people.",
            {"A" : "N", "B" : "O", "C" : "Z", "D" : "D"}
            ),
        new Text(
            "It's damn cold...",
            "But Germans are born to resist cold. We will arrive on time.",
            "The poor guys must be freezing. Thank god I have a warm coat and a flask.",
            "We are running out of time. I do not fancy Russian firing squads. Hurry up!",
            "We need to get to the camp. What happens there is none of my bussiness. Not my fault.",
            {"A" : "N", "B" : "O", "C" : "Z", "D" : "D"}
            ),
        new Text(
            "What would I do, if I was one of them?",
            "First of all, I would carry out the order on time to show my superiority.",
            "I would die as soon as possible. I do not understand how they can still take it.",
            "Run away, survive. I would do better than anyone of them.",
            "I always carry out my orders, so I would never become one of them in the first place. Ordnung musst sein.",
            {"A" : "N", "B" : "O", "C" : "Z", "D" : "D"}
            ),
		new Text(
            "And when we get to the camp... what then? Is the war not lost?",
            "We must prevail. This may be the end, but we will die standing.",
            "Only death awaits us. Us as well as them.",
            "If only I could get to Switzerland. My cousin could help.",
            "The Allies have to understand my situation!",
            {"A" : "N", "B" : "O", "C" : "Z", "D" : "D"}
            ),
        new Text(
            "Their clothes stink...",
            "They are like animals, if not animals.",
            "They no longer look like human beings.",
            "I must not catch typhus. I must not touch them.",
            "This is disgusting.",
            {"A" : "N", "B" : "O", "C" : "Z", "D" : "D"}
            ),
        new Text(
            "One of them is talking to me? He still has jewellery and I can have it if I let him go.",
            "Guards? Bring here the jewels and give him a whack!",
            "OK, you can go. Get lost my friend and live.",
            "Give it here, yes, of course. You can go... Guards!!",
            "I must not let you go. But... give it here anyway.",
            {"A" : "N", "B" : "O", "C" : "Z", "D" : "D"}
            ),
        new Text(
            "This face seems familiar.",
            "Nonsense, it's an illusion. They all look the same. Let’s go on.",
            "When she walked through the gate, she was holding a child.",
            "I hope she will not remember me. And we will get rid of them soon enough.",
            "But I cannot help everyone. Also I should not.",
            {"A" : "N", "B" : "O", "C" : "Z", "D" : "D"}
            ),
        new Text(
            "We keep walking and walking…",
            "The camp is surely nearby! Double our effort!",
            "So long… So many dead… So much...",
            "We are not fast enough! Faster, damn it!",
            "Maybe if someone is shot, others will speed up and less people will freeze.",
            {"A" : "N", "B" : "O", "C" : "Z", "D" : "D"}
            ),
        new Text(
            "I wonder whether there is anything after death.",
            "I am going to Valhalla!",
            "I also wonder whether there is something meaningful before death, at least.",
            "Others will know soon, but mine is probably very far away.",
            "Hard to tell. Purgatory is just temporary, they say.",
			{"A" : "N", "B" : "O", "C" : "Z", "D" : "D"}
            ),
        new Text(
            "They look like skeletons, they are walking corpses! I cannot tell men from women, that is how skinny they are. What will happen now? Am I going to be judged?",
            "Let's kill them right here, right now, the furnaces are still working. I did a good job!",
            "What have I done? What have we done... to you? I am guilty, we all are. God, I am so sorry!",
            "We will lock them in a barn. Let the Russians or the cold take them. I’m gonna be somewhere far away by then!",
            "I’m not sure, I was just forced to carry out my orders. What else is there to do? My superiors are guilty!",
			{"A" : "N", "B" : "O", "C" : "Z", "D" : "D"}
            )
    ];
    this.story = 0;
}

Diary.prototype = Object.create(Paper.prototype);
Diary.prototype.constructor = Diary;

Diary.prototype.chosen = function(chosen) {
    game.jukebox.playEffect("writing");
    var answers = ["textA", "textB", "textC", "textD"];
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

    game.time.events.add(25000, this.open, this);
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
    var textD = this.getText("textD");
    textA.disabled = textA.chosen = false;
    textB.disabled = textB.chosen = false;
    textC.disabled = textC.chosen = false;
    textD.disabled = textD.chosen = false;
    textA.visible = true;
    textB.visible = true;
    textC.visible = true;
    textD.visible = true;
    textA.alpha = textB.alpha = textC.alpha = textD.alpha = 0.4;

    text.text = textobj.monologue;
    textA.y = text.bottom;
    textA.text = "1. " + textobj.a;
    textB.y = textA.bottom;
    textB.text = "2. " + textobj.b;
    textC.y = textB.bottom;
    textC.text = "3. " + textobj.c;
	textD.y = textC.bottom;
    textD.text = "4. " + textobj.d;
	
	textA.personality = textobj.personalityKey.A;
	textB.personality = textobj.personalityKey.B;
	textC.personality = textobj.personalityKey.C;
	textD.personality = textobj.personalityKey.D;
};

Diary.prototype.showFate = function(fate) {
    this.showingFate = true;
    this.background.events.onInputOver.removeAll();
    this.background.events.onInputOut.removeAll();

    this.getText("text").text = fate.text;
    this.getText("textA").visible = false;
    this.getText("textB").visible = false;
    this.getText("textC").visible = false;
    this.getText("textD").visible = false;
    this.changeState("out");

    this.nextPageButton.visible = true;

    if(fate.next === undefined)
        this.nextPageText.text = "end game";
};

function Text(monologue, a, b, c, d, personalityKey) {
    this.monologue = monologue;
    this.a = a;
    this.b = b;
    this.c = c;
	this.d = d;
	
	this.personalityKey = personalityKey;
}