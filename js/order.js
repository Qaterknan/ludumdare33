var Order = function (game, parent, x, y) {
    Report.call(this, game, parent, x, y, "paper3");
    this.getText("text").wordWrapWidth = 280;
    this.nextPageButton.onInputUp.removeAll();
	
	this.changeToPageTwo = function (){
		this.changeState("hidden", function(){
			game.order.getText("text").text = "\nDo eliminate any"+
				" unnecessary casualties due to hypothermia (too slow) or exhaustion (too fast). "+
				"The Reich can still make use of the prisoners. "+
				"Punish attemts to escape, as success only encourages more such acts.\n\n"+
				"Sturmbannfuhrer Karl Wilhelm Florstedt";
			game.order.nextPageText.text = "start";
			game.order.changeState("out");
			game.order.nextPageButton.onInputUp.removeAll();
			game.order.nextPageButton.onInputUp.add(function(){game.order.changeState("hidden");game.startGame();}, game);
		});
	};
	this.changeToPageThree = function (){
		this.changeState("hidden", function(){console.log(game.order.state);
			game.order.getText("text").text = "Sometimes, "+
				"your prisoners might try to run away. It is up to you, if you decide to stop "+
				"him by clicking on him or if you let him go. But this might undermine your authority. "+
				"\n\nPleasant journey\nA.H.";
			game.order.changeState("out");
			game.order.nextPageButton.onInputUp.removeAll();
			game.order.nextPageButton.onInputUp.add(function(){game.order.changeState("hidden");game.startGame();}, game);
		});
	};
	this.nextPageButton.onInputUp.add(this.changeToPageTwo, this);
}

Order.prototype = Object.create(Report.prototype);
Order.prototype.constructor = Order;

Order.prototype.showCommand = function() {
    this.getText("text").text = "\nHauptscharfuhrer Hans Heissemeyer!\n\n"+
		"This is an order! The enemy is entering your territory. "+
		"Speedily march the prisoners to a camp 44 kilometres from you.";
        // "TRANSPORT ORDER \n"+
        // "Dear colonel, \n"+
		// "you have been chosen for this important task. Take these prisoners to "+
		// "another camp deeper within our territory. The path is long, so be advised. "+
		// "You can change the pace of walk by clicking on these buttons: \n\n\n";
		
    this.changeState("out");
};
