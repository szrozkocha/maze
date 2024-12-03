function Maze(size) {
	//fields init
	this.size = size;
	this.cells = new Array();
	
	//functions
	this.hasPoints = function() {
		for(var i = 0;i < this.cells.length;++i) {
			if(this.cells[i].hasPoint) {
				return true;
			}
		}
		
		return false;
	}
	
	this.getPointsNumber = function() {
		var pointsNumber = 0;
		for(var i = 0;i < this.cells.length;++i) {
			if(this.cells[i].hasPoint) {
				pointsNumber += 1;
			}
		}
		
		return pointsNumber;
	}
	
	this.getIndex = function(x , y) {
		if(x < 0 || x > (this.size - 1) || y < 0 || y > (this.size - 1)) {
			return -1;
		} else {
			return x * this.size + y;
		}
	};
	
	this.getCell = function(x, y) {
		return this.cells[this.getIndex(x, y)];
	};
	
	this.getCellRandomNeighbour = function(cell) {
		var neighbours = new Array();
		
		var top = this.cells[this.getIndex(cell.x, cell.y - 1)];
		if(top && !top.visited) {
			neighbours.push(top);
		}
		var right = this.cells[this.getIndex(cell.x + 1, cell.y)];
		if(right && !right.visited) {
			neighbours.push(right);
		}
		var bottom = this.cells[this.getIndex(cell.x, cell.y + 1)];
		if(bottom && !bottom.visited) {
			neighbours.push(bottom);
		}
		var left = this.cells[this.getIndex(cell.x - 1, cell.y)];
		if(left && !left.visited) {
			neighbours.push(left);
		}
		
		if(neighbours.length == 0) {
			return undefined;
		} else {
			return neighbours[floor(random(neighbours.length))];
		}
	};
	
	this.setCellVisited = function(x, y) {
		var cell = this.getCell(x, y);
		cell.visited = true;
		
		if(!cell.topWall) {
			this.getCell(x, y - 1).visited = true;
		}
		
		if(!cell.rightWall) {
			this.getCell(x + 1, y).visited = true;
		}
		
		if(!cell.bottomWall) {
			this.getCell(x, y + 1).visited = true;
		}
		
		if(!cell.leftWall) {
			this.getCell(x - 1, y).visited = true;
		}
	}
	
	this.getDeadEnds = function() {
		var deadEnds = new Array();
		
		for(var i = 0;i < this.cells.length;++i) {
			var bordersNumber = 0;
			
			if(this.cells[i].topWall) {
				bordersNumber += 1;
			}
			if(this.cells[i].rightWall) {
				bordersNumber += 1;
			}
			if(this.cells[i].bottomWall) {
				bordersNumber += 1;
			}
			if(this.cells[i].leftWall) {
				bordersNumber += 1;
			}
			
			if(bordersNumber == 3) {
				deadEnds.push(this.cells[i]);
			}
		}
		
		return deadEnds;
	};
	
	this.draw = function(cellSize) {
		for(var i = 0;i < this.cells.length;++i) {
			this.cells[i].draw(cellSize);
		}
	};
	
	//generate
	var stack = new Array();
	
	for(var x = 0;x < this.size;++x) {
		for(var y = 0;y < this.size;++y) {
			this.cells.push(new MazeCell(x, y));
		}
	}

	var current = this.cells[this.getIndex(floor(this.size / 2), floor(this.size / 2))];

	current.visited = true;
	
	while(true) {
		var neighbour = this.getCellRandomNeighbour(current);

		if(neighbour) {
			stack.push(current);
			current.removeWall(neighbour);
			
			neighbour.visited = true;
			current = neighbour;
		} else {
			if(stack.length > 0) {
				current = stack.pop();
			} else {
				break;
			}
		}
	}
	
	for(var i = 0;i < this.cells.length;++i) {
		this.cells[i].visited = false;
	}
}