
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
        x: i,
        y: j,
        used: 0,
        adj: [],
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
    // cnt++;  // TEMPORARY DELETE WHEN DEBUGGING IS DONE
    // if(cnt === 5) break;  // TEMPORARY DELETE WHEN DEBUGGING IS DONE

    for(let i = -1; i < 2; i++) {
      if(currX+i >= 0 && currX+i < maze.length) {
        for(let j = -1; j < 2; j++) {
          if(currY+j >= 0 && currY+j < maze[currX+i].length && Math.abs(i + j) === 1){
            if(maze[currX+i][currY+j].used < 2) {
              if(!maze[currX+i][currY+j].used) {
                adjList.push({
                  x: currX + i,
                  y: currY + j,
                });
                maze[currX + i][currY + j].used = 1;
              }
              maze[currX + i][currY + j].adj.push([{x: currX, y: currY}]);
            }
          }
        }
      }
    }

    maze[currX][currY].used = 2;

    if(adjList.length === 0)
      break;

    let adj = adjList.splice(Math.random() * adjList.length, 1);
    currX = adj[0].x;
    currY = adj[0].y;
    console.log(maze[currX][currY]);
    if(maze[currX][currY].adj.length) 
      maze[currX][currY].adj.splice(Math.random() * maze[currX][currY].adj.length, 1);

    // Make a wall on every other thing in the list
    while(maze[currX][currY].adj.length > 0) {
      let tmpAdj = maze[currX][currY].adj.pop()[0];
      if(currX < tmpAdj.x)
        maze[currX][currY].edges.e = 1;
      else if(currX > tmpAdj.x)
        maze[currX][currY].edges.w = 1;
      else if(currY < tmpAdj.y)
        maze[currX][currY].edges.n = 1;
      else if(currY > tmpAdj.y)
        maze[currX][currY].edges.s = 1;
      else
        console.log(`ERROR: No walls were defined at x: ${currX}, y: ${currY}`)
    }
    // delete maze[currX][currY].adj;
  }

  console.log(adjList);
  console.log(maze);
  return maze;
}


let createMaze = (row, col) => {
  let maze = createBlankMaze(row, col);

  maze = primsMaze(maze);


  return maze;
}


maze = createMaze(3, 3);
// gameLoop();