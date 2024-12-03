function Player(x, y) {
	this.x = x;
	this.y = y;
	
	this.draw = function(cellSize) {
		var padding = 5;
	
		noStroke();
		fill(0, 150, 0);
		rect(this.x * cellSize + padding, this.y * cellSize + padding, cellSize - padding * 2, cellSize - padding * 2);
	}
	
	this.move = function(x, y) {
		this.x += x;
		this.y += y;
	}
}