
// <<<<<<<<<<<<<<< Begin Game Loop >>>>>>>>>>>>>>>>>>>>>>

let prevTime = performance.now();


let processInput = elapsedTime => {
}


let update = elapsedTime => {
}


let render = elapsedTime => {
}

let gameLoop = time => {
  let elapsedTime = time - prevTime;
  prevTime = time;

  processInput(elapsedTime);
  update(elapsedTime);
  render(elapsedTime);

  requestAnimationFrame(gameLoop);
}

// <<<<<<<<<<<<<<<<< End Game Loop >>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<< Begin Maze Creation >>>>>>>>>>>>>>>>>>>

createBlankMaze = (row, col) => {
  let maze = [];
  for(let i = 0; i < row; i++) {
    maze.push([]);
    for(let j = 0; j < col; j++) {
      maze[i].push({
        edges: {
          n: null,
          s: null,
          w: null,
          e: null,
        },
      });
      
      if(i === 0)
        maze[i][j].edges.n = 1;
      else if(i-1 === row)
        maze[i][j].edges.s = 1;

      if(j === 0)
        maze[i][j].edges.w = 1;
      else if(j-1 === col)
        maze[i][j].edges.e = 1;
        
    }
  }

  return maze;
}


let primsMaze = (maze, startX, startY) => {
  let currX = 0;
  let currY = 0;
  let adjList = [];
  let finishedList = [];

  if(startX)
    currX = startX;
  if(startY)
    currY = startY;
  
  let cnt = 0;  // TEMPORARY DELETE WHEN DEBUGGING IS DONE
  while(true) {
    cnt++;  // TEMPORARY DELETE WHEN DEBUGGING IS DONE
    if(cnt === 1000) break;  // TEMPORARY DELETE WHEN DEBUGGING IS DONE
    break;

    for(let i = -1; i < 2; i += 2) {
      for(let j = -1; j < 2; j += 2) {
        if(maze[currX + i][currY + j] !== 'undefined') {
          adjList.push({
            x: currX + i,
            y: currY + j,
          });
        }
      }
    }
    break;


  }

  return maze;
}


let createMaze = (row, col) => {
  let maze = createBlankMaze(row, col);

  maze = primsMaze(maze);


  return maze;
}


maze = createMaze(3, 3);
// gameLoop();