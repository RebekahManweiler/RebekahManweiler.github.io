function mazeGenerator(){
	this.mazes = [];
	/**
	 * Returns the size of the given maze
	 * @param {array} maze - The maze array
	 * @pre maze is a valid and filled array that is a perfect square length
	 * @return {int} size of the given maze
	 */
	this.getMazeSize = function(maze){
		return Math.floor(Math.sqrt(maze.length));
	}

	this.getMaze = function(size){
		return this.twoToOne(this.generateMaze(size));
	}

	/**
	 * Returns a randomized maze of the given size
	 * @param {int} size - The given size of the maze
	 * @pre size is not less than 7
	 * @return {array} the filled 1D maze array
	 */
	this.generateMaze = function(size) {

		var maze = [];
		for(var i = 0; i < size; i++)
		{
			maze[i] = [];
		}
		for(var i = 0; i < size; i++)
		{
			maze[0][i] = 'W';
			maze[1][i] = 'W';
			maze[i][0] = 'W';
			maze[i][1] = 'W';
			maze[size-2][i] = 'W';
			maze[size-1][i] = 'W';
			maze[i][size-2] = 'W';
			maze[i][size-1] = 'W';
		}
		for (var x = 2; x < size-2; x++)
		{
			for (var y = 2; y < size-2; y++)
			{
				if(x%2 != 0)
				{
					maze[x][y] = 'W';
				}
				else{
					if(y%2 == 0){
						maze[x][y] = 'U';
					}
					else{
						maze[x][y] = 'W';
					}
				}
			}
		}

		maze = this.makeMaze(maze, [2,2]);
		var startRow = this.randomIntFromInterval(2, size-2);
		var startCol = 1
		var endRow = this.randomIntFromInterval(2, size-2);
		var endCol = size-2;
		maze[startRow][startCol] = 'S';
		maze[endRow][endCol] = 'E';
		maze = this.recurseMaze(maze, startRow, startCol);
		maze = this.placeHoles(maze);
		maze[startRow][startCol] = 'S';
		maze[endRow][endCol] = 'E';
		if(this.mazeSolver(maze).length == 0)
		{
			maze = this.generateMaze(size);
			this.mazes.push(maze);
		}
		else{this.mazes.push(maze);}
		return maze;

	}

	/**
	 * Returns an array of coordinate pairs that is the path to solve the maze
	 * @param {array} maze - is a filled 2D randomized array
	 * @pre maze has been generated
	 * @return array of coordinate pairs that is the path to solve the maze
	 */
	this.mazeSolver = function(maze){

		var startRow = 0;
		var startCol = 1;
		var endRow = 0;
		var endCol = maze.length-2;

		for (var i = 0; i < maze.length; i++)
		{
			if(maze[i][1] == 'S')
			{
				startRow = i;
			}
			if(maze[i][maze.length-2] == 'E')
			{
				endRow = i;
			}
		}

		var path = this.pathFinder(maze, startRow, startCol);
		this.resetMaze(maze, startRow, startCol, endRow, endCol);

		return path;

	}

	/**
	 * Returns a maze with holes placed at all "dead ends"
	 * @param {array} maze - is a filled 2D randomized array
	 * @pre maze has been generated
	 * @return maze with holes placed at "dead ends" ('H' has been inserted at specific indexes)
	 */
	this.placeHoles = function(maze){
		for(var i = 0; i < maze.length; i++)
		{
			for(var j = 0; j < maze[i].length; j++)
			{
				if(maze[i][j] == 'P')
				{
					maze[i][j] = 'H';
				}
			}
		}
		return maze;
	}

	/**
	 * Returns the maze with all non-"dead end" paths replaced with 'V'
	 * @param {array} maze - is a filled 2D randomized array
	 * @param {int} curRow - curRow is the current row index in the maze
	 * @param {int} curCol - curCol is the current column index in the maze
	 * @pre maze is generated, curRow and curCol are indexes in the maze
	 * @return maze with all non-"dead end" paths replaced with 'V'
	 */
	this.recurseMaze = function(maze, curRow, curCol){
		if((maze[curRow-1][curCol] == 'P' || maze[curRow-1][curCol] == 'E') && maze[curRow-1][curCol] != 'V'){
			maze[curRow][curCol] = 'V';
			maze = this.recurseMaze(maze, curRow-1, curCol);
		}
		if((maze[curRow][curCol+1] == 'P' || maze[curRow][curCol+1] == 'E') && maze[curRow][curCol+1] != 'V'){
			maze[curRow][curCol] = 'V';
			maze = this.recurseMaze(maze, curRow, curCol+1);
		}
		if((maze[curRow+1][curCol] == 'P' || maze[curRow+1][curCol] == 'E') && maze[curRow+1][curCol] != 'V'){
			maze[curRow][curCol] = 'V';
			maze = this.recurseMaze(maze, curRow+1, curCol);
		}
		if((maze[curRow][curCol-1] == 'P' || maze[curRow][curCol-1] == 'E') && maze[curRow][curCol-1] != 'V'){
			maze[curRow][curCol] = 'V';
			maze = this.recurseMaze(maze, curRow, curCol-1);
		}
		return maze;

	}

	/**
	 * Returns the given 2D maze as a 1D maze
	 * @param {array} maze - is a filled 2D randomized array
	 * @pre maze is generated
	 * @return maze as a 1D array
	 */
	this.twoToOne = function(maze){
		var temp = [];
		var tempCount = 0;
		for (var i = 0; i < maze.length; i++)
		{
			for (var j = 0; j < maze[i].length; j++)
			{
				temp[tempCount] = maze[i][j];
				tempCount++;
			}
		}
		return temp;
	}

	/**
	 * Prints out the maze to the console in a 2D format
	 * @param {array} maze - is a filled 2D randomized array
	 * @pre maze is generated
	 * @return none
	 */
	this.printMaze = function(maze){
		var temp="";
		for(var i = 0; i < maze[0].length; i++) {
 			for(var z = 0; z < maze.length; z++) {
 				 temp+=maze[i][z];
 			}
 			temp+="\n";
		}
		console.log(temp);
	}

	/**
	 * Returns a random integer between minimum and maximum (both inclusive)
	 * @param {int} min - minimum number that the random int can be
	 * @param {int} max - maximum number that the random int can be
	 * @return random int between min and max
	 */
	this.randomIntFromInterval = function(min,max)
	{
		var x = 0;
		do{
			x = Math.floor(Math.random()*(max-min+1)+min);
		}while(x % 2 != 0)
    	return x;
	}
	
	/**
	 * Returns a randomly generated 2D array that represents the maze
	 * @param {array} maze - 2D array (empty or partially filled) that maze is built from
	 * @param {array} curCoords - Coordinates that the maze is randomly generating next move from
	 * @pre none
	 * @return randomly generated 2D maze array
	 */
	this.makeMaze = function(maze, curCoords) {

		var curRow = curCoords[0];
		var curCol = curCoords[1];
		maze[curRow][curCol]='P';
		var moves = ['u','d','l','r'];
		var moveQueue = [];

		var firstMove;

		for(var i = 0; i < 4; i++)
		{
			firstMove = Math.floor(Math.random() * moves.length);
			moveQueue[i] = moves[firstMove];
			moves.splice(firstMove, 1);
		}
		for(var j = 0; j < 4; j++)
		{
			if(moveQueue[j]=='u')
			{
				if(maze[curRow-2][curCol] != '@' && maze[curRow-2][curCol] == 'U')
				{
					maze[curRow-1][curCol] = 'P';
					maze[curRow-2][curCol] = 'P';
					curRow = curRow-2;
					maze = this.makeMaze(maze, [curRow, curCol]);
					j = 0;
				}
			}
			else if(moveQueue[j]=='d')
			{
				if(maze[curRow+2][curCol] != '@' && maze[curRow+2][curCol] == 'U')
				{
					maze[curRow+1][curCol] = 'P';
					maze[curRow+2][curCol] = 'P';
					curRow = curRow+2;
					maze = this.makeMaze(maze, [curRow, curCol]);
					j = 0;
				}
			}
			else if(moveQueue[j]=='l')
			{
				if(maze[curRow][curCol-2] != '@' && maze[curRow][curCol-2] == 'U')
				{
					maze[curRow][curCol-1] = 'P';
					maze[curRow][curCol-2] = 'P';
					curCol = curCol-2;
					maze = this.makeMaze(maze, [curRow, curCol]);
					j = 0;
				}
			}
			else if(moveQueue[j]=='r')
			{
				if(maze[curRow][curCol+2] != '@' && maze[curRow][curCol+2] == 'U')
				{
					maze[curRow][curCol+1] = 'P';
					maze[curRow][curCol+2] = 'P';
					curCol = curCol+2;
					maze = this.makeMaze(maze, [curRow, curCol]);
					j = 0;
				}
			}
		}
		return maze;

	}

	this.resetMaze = function(maze, startRow, startCol, endRow, endCol){
		for(var i = 0; i < maze.length; i++)
		{
			for(var j = 0; j < maze[i].length; j++)
			{
				if(maze[i][j] == 'X')
				{
					maze[i][j] = 'V';
				}
			}
		}
		maze[startRow][startCol] = 'S';
		maze[endRow][endCol] = 'E';
	}

	/**
	 * Returns the 2D array of coordinate pairs that solves the maze
	 * @return path
	 *
	 *
	 */
	this.pathFinder = function(maze, curRow, curCol){
		var path = [];
		var tempRow = curRow;
		var tempCol = curCol;
		if(maze[tempRow][tempCol] == 'E')
		{
			path.unshift([tempRow, tempCol]);
			return path;
		}
		if(maze[tempRow-1][tempCol] == 'V' || maze[tempRow-1][tempCol] == 'E')
		{
			maze[tempRow][tempCol] = 'X';
			path = this.pathFinder(maze, tempRow-1, tempCol);
			if(path.length != 0)
			{
				path.unshift([tempRow, tempCol]);
				return path;
			}
		}
		if(maze[tempRow][tempCol-1] == 'V' || maze[tempRow][tempCol-1] == 'E')
		{
			maze[tempRow][tempCol] = 'X';
			path = this.pathFinder(maze, tempRow, tempCol-1);
			if(path.length != 0)
			{
				path.unshift([tempRow, tempCol]);
				return path;
			}
		}
		if(maze[tempRow+1][tempCol] == 'V' || maze[tempRow+1][tempCol] == 'E')
		{
			maze[tempRow][tempCol] = 'X';
			path = this.pathFinder(maze, tempRow+1, tempCol);
			if(path.length != 0)
			{
				path.unshift([tempRow, tempCol]);
				return path;
			}
		}
		if(maze[tempRow][tempCol+1] == 'V' || maze[tempRow][tempCol+1] == 'E')
		{
			maze[tempRow][tempCol] = 'X';
			path = this.pathFinder(maze, tempRow, tempCol+1);
			if(path.length != 0)
			{
				path.unshift([tempRow, tempCol]);
				return path;
			}
		}
		return path;
	}
}