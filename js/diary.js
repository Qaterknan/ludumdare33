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
        console.log("ahoj")
        var tween = game.add.tween(this);
        tween.to({alpha : 1}, 300);
        tween.easing(Phaser.Easing.Cubic.Out);
        tween.start();
    }
    var onOut = function(){
        console.log("ahoj")
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

    // var nextPage = game.make.button(this.width/2, this.height-50, "buttonBorder", function(){
    //     console.log("asdf");
    // });
    // nextPage.anchor.set(0.5, 1);
    // nextPage.tint = 0x000000;
    // nextPage.alpha = 0.4;
    // nextPage.onInputOver.add(function(){
    //     var tween = game.add.tween(this);
    //     tween.to({alpha : 1}, 300);
    //     tween.easing(Phaser.Easing.Circular.In);
    //     tween.start();
    // }, nextPage);
    // nextPage.onInputOut.add(function(){
    //     var tween = game.add.tween(this);
    //     tween.to({alpha : 0.4}, 300);
    //     tween.easing(Phaser.Easing.Circular.Out);
    //     tween.start();
    // }, nextPage);
    // var next = game.make.text(0, -nextPage.height+4, "next page", {
    //     font: "normal 16px monacoregular"
    // });
    // next.anchor.set(0.5, 0);
    // nextPage.addChild(next);
    // paper.addChild(nextPage);

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

Diary.prototype.changeQuestion = function(text) {
    this.texts["text"].text = text.monologue;
    this.texts["textA"].y = this.texts["text"].bottom;
    this.texts["textA"].text = "1. " + text.a;
    this.texts["textB"].y = this.texts["textA"].bottom;
    this.texts["textB"].text = "2. " + text.b;
    this.texts["textC"].y = this.texts["textB"].bottom;
    this.texts["textC"].text = "3. " + text.c;
     // + "\n" +
     //    "1." + text.a + "\n" +
     //    "2." + text.b + "\n" +
     //    "3." + text.c;
};

function Text(monologue, a, b, c) {
    this.monologue = monologue;
    this.a = a;
    this.b = b;
    this.c = c;
}