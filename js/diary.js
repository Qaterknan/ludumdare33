var Diary = function (game, parent, x, y) {
    Paper.call(this, game, parent, x, y, "paper");

    this.states = {
        "hidden": this.hiddenX,
        "visible": this.hiddenX - this.background.width*0.2,
        "out": this.hiddenX - this.background.width - 2
    };

    this.background.events.onInputOver.add(this.onOver, this);
    this.background.events.onInputOut.add(this.onOut, this);

    var text = this.addText("text");

    var onOver = function(){
        var tween = game.add.tween(this);
        tween.to({alpha : 1}, 300);
        tween.easing(Phaser.Easing.Cubic.Out);
        tween.start();
    }
    var onOut = function(){
        var tween = game.add.tween(this);
        tween.to({alpha : 0.4}, 300);
        tween.easing(Phaser.Easing.Cubic.Out);
        tween.start();
    }

    var answers = ["textA", "textB", "textC"];
    for(var i=0;i<answers.length;i++){
        var answer = this.addText(answers[i]);
        answer.alpha = 0.4;
        answer.inputEnabled = true;
        answer.events.onInputOver.add(onOver, answer);
        answer.events.onInputOver.add(this.onOver, this);
        answer.events.onInputOut.add(onOut, answer);
        answer.events.onInputOut.add(this.onOut, this);
    }

    this.textStrings = [
        new Text(
            "Musi jim byt jasne, co je ceka. Proc se proste neseberou a nezkusi nas premoct... Mame zbrane, ale mohli by alespon zemrit rychleji a se cti.",
            "Jejich slabost jen dokazuje jak podradni jsou. Germani by se nenechali takhle zotrocit.",
            "Nemaji uz zadnou vlastni vuli. Vytloukli jsme z nich posledni zbytky odporu uz pred dlouhou dobou.",
            "Kez by to zkusili! Meli bychom to alespon rychleji za sebou a potlaceni vzpoury by nikdo nemohl odsoudit jako valecne zverstvo. "
            )
    ];
    this.story = 0;

    this.changeState("visible");
    this.nextQuestion();
}

Diary.prototype = Object.create(Paper.prototype);
Diary.prototype.constructor = Diary;

Diary.prototype.onOver = function() {
    this.changeState("out");
};

Diary.prototype.onOut = function() {
    this.changeState("visible");
};

Diary.prototype.nextQuestion = function() {
    this.changeQuestion(this.textStrings[this.story]);
    this.story++;
};

Diary.prototype.changeQuestion = function(textobj) {
    var text = this.getText("text");
    var textA = this.getText("textA");
    var textB = this.getText("textB");
    var textC = this.getText("textC");
    text.text = textobj.monologue;
    textA.y = text.bottom;
    textA.text = "1. " + textobj.a;
    textB.y = textA.bottom;
    textB.text = "2. " + textobj.b;
    textC.y = textB.bottom;
    textC.text = "3. " + textobj.c;
};

function Text(monologue, a, b, c) {
    this.monologue = monologue;
    this.a = a;
    this.b = b;
    this.c = c;
}