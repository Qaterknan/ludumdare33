var Order = function (game, parent, x, y) {
    Report.call(this, game, parent, x, y);

    this.nextPageButton.onInputUp.removeAll();
	
	this.changeToPageTwo = function (){
		this.changeState("hidden", function(){
			game.order.getText("text").text = "Faster pace "+
				"will keep the prisoners warm, however, they might get exhausted. "+
				"In that case, I suggest you take a break, even though your soliders will get cold. "+
				"If you want your prisoners to go faster without break, just choose one prisoner and click on him. ";
			game.order.changeState("out");
			game.order.nextPageButton.onInputUp.removeAll();
			game.order.nextPageButton.onInputUp.add(game.order.changeToPageThree, game.order);
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
    this.getText("text").text = 
        "TRANSPORT ORDER \n"+
        "Dear colonel, \n"+
		"you have been chosen for this important task. Take these prisoners to "+
		"another camp deeper within our territory. The path is long, so be advised. "+
		"You can change the pace of walk by clicking on these buttons: \n\n\n";
		
    this.changeState("out");
};
