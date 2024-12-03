function MazeCell(x, y) {
	this.x = x;
	this.y = y;
	
	this.visited = false;
	this.hasPoint = false;
	
	this.topWall = true;
	this.rightWall = true;
	this.bottomWall = true;
	this.leftWall = true;
	
	this.draw = function(cellSize) {
		strokeWeight(6);
				
		if(this.visited) {
			fill(200);
		} else {
			return;
		}
		
		var x = this.x * cellSize;
		var y = this.y * cellSize;
		
		noStroke();
		rect(x, y, cellSize, cellSize);
		
		
		if(this.hasPoint) {
			fill(255, 255, 0);
			ellipse(x + cellSize / 2, y + cellSize / 2, cellSize * 0.4);
		}

		stroke(100);
		if(this.topWall) {
			line(x, y, x + cellSize, y);
		}
		
		if(this.rightWall) {
			line(x + cellSize, y, x + cellSize, y + cellSize);
		}
		
		if(this.bottomWall) {
			line(x + cellSize, y + cellSize, x, y + cellSize);
		}
		
		if(this.leftWall) {
			line(x, y + cellSize, x, y);
		}
	};
	
	this.removeWall = function(neighbour) {
		var x = this.x - neighbour.x;
		
		if(x == -1) {
			this.rightWall = false;
			neighbour.leftWall = false;
			return;
		}
		
		if(x == 1) {
			
			this.leftWall = false;
			neighbour.rightWall = false;
			return;
		}
		
		var y = this.y - neighbour.y;
		
		if(y == -1) {
			this.bottomWall = false;
			neighbour.topWall = false;
			return;
		}
		
		if(y == 1) {
			this.topWall = false;
			neighbour.bottomWall = false;
			return;
		}
	};
}