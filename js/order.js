var Order = function (game, parent, x, y) {
    Report.call(this, game, parent, x, y);

    this.nextPageButton.onInputDown.removeAll();
}

Order.prototype = Object.create(Report.prototype);
Order.prototype.constructor = Order;

Order.prototype.showCommand = function() {
    this.getText("text").text = 
        "TRANSPORT ORDER"+
        "lorem ipsum";
    this.changeState("out");
};
