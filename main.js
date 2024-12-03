var screenSize = 800;
var mazeSize = 8;
var mazeCellSize = screenSize / mazeSize;

var maze;
var player;

var maxScore;

function setup() {
	createCanvas(screenSize, screenSize);
	
	maze = new Maze(mazeSize);
	player = new Player(floor(mazeSize / 2), floor(mazeSize / 2));
	maze.setCellVisited(player.x, player.y);
	
	var cells = maze.getDeadEnds();
	
	var pointsNumber = floor(random(cells.length - 1) + 1);
	for(var i = 0;i < pointsNumber;++i) {
		var cell = cells.splice(floor(random(cells.length)), 1)[0];
		var x = cell.x;
		var y = cell.y;
		if(x == player.x && y == player.y) {
			continue;
		}
		maze.getCell(x, y).hasPoint = true;
	}
	
	if(!maze.hasPoints()) {
		setup();
	}
	
	maxScore = maze.getPointsNumber();
	document.getElementById("score").innerHTML = "Kulki: " + (maxScore - maze.getPointsNumber()) + "/" + maxScore;
}

function draw() {
	translate((mazeSize / 2 - player.x) * mazeCellSize - mazeCellSize / 2, (mazeSize / 2 - player.y) * mazeCellSize - mazeCellSize / 2);

	background(50);
	frameRate(60);
	
	maze.draw(mazeCellSize);
	player.draw(mazeCellSize);
}

function keyPressed() {
	var cell = maze.getCell(player.x, player.y);
	if (keyCode === UP_ARROW && !cell.topWall) {
		player.move(0, -1);
	} else if (keyCode === RIGHT_ARROW && !cell.rightWall) {
		player.move(1, 0);
	} else if (keyCode === DOWN_ARROW && !cell.bottomWall) {
		player.move(0, 1);
	} else if (keyCode === LEFT_ARROW && !cell.leftWall) {
		player.move(-1, 0);
	}
	
	maze.setCellVisited(player.x, player.y);
	var newCell = maze.getCell(player.x, player.y);
	if(newCell.hasPoint) {
		newCell.hasPoint = false;
	}
	
	document.getElementById("score").innerHTML = "Kulki: " + (maxScore - maze.getPointsNumber()) + "/" + maxScore;
	
	if(!maze.hasPoints()) {
		setup();
	}
}