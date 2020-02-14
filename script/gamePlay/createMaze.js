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
        breadcrumb: false,
        adj: [],
        shortestPath: {
          distance: -1,
          next: null,
        }
      });
    }
  }
  return maze;
}


let primsMaze = (maze, startX, startY) => {
  let currX = 0;
  let currY = 0;
  let adjList = [];

  if(startX)
    currX = startX;
  if(startY)
    currY = startY;
  
  // Add cells to the adjacency lists
  while(true) {

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


    if(adjList.length === 0)
      break;

    let adj = adjList.splice(Math.random() * adjList.length, 1);

    // Clean up the previous cell
    maze[currX][currY].used = 2;
    delete(maze[currX][currY].adj);

    // Move to the new current
    currX = adj[0].x;
    currY = adj[0].y;

    // Create walls
    if(maze[currX][currY].adj.length) {
      let tmpAdj = maze[currX][currY].adj.splice(Math.random() * maze[currX][currY].adj.length, 1)[0][0];

      if(currX < tmpAdj.x) {
        maze[currX][currY].edges.e = maze[tmpAdj.x][tmpAdj.y];
        maze[tmpAdj.x][tmpAdj.y].edges.w = maze[currX][currY];
      }
      else if(currX > tmpAdj.x) {
        maze[currX][currY].edges.w = maze[tmpAdj.x][tmpAdj.y];
        maze[tmpAdj.x][tmpAdj.y].edges.e = maze[currX][currY];
      }
      else if(currY < tmpAdj.y) {
        maze[currX][currY].edges.s = maze[tmpAdj.x][tmpAdj.y];
        maze[tmpAdj.x][tmpAdj.y].edges.n = maze[currX][currY];
      }
      else if(currY > tmpAdj.y) {
        maze[currX][currY].edges.n = maze[tmpAdj.x][tmpAdj.y];
        maze[tmpAdj.x][tmpAdj.y].edges.s = maze[currX][currY];
      }
    }
  }

  return maze;
}

function shortestPathEntry() {
  curr = finishImg.location;
  curr.shortestPath.distance = 0;

  if (curr.edges.n) {
    shortestPathRec(curr, curr.edges.n)
  }
  if (curr.edges.s) {
    shortestPathRec(curr, curr.edges.s)
  }
  if (curr.edges.e) {
    shortestPathRec(curr, curr.edges.e)
  }
  if (curr.edges.w) {
    shortestPathRec(curr, curr.edges.w)
  }
}


function shortestPathRec(from, curr) {
  // Do shortest path on the current
  if(curr.shortestPath.distance == -1 || curr.shortestPath.distance > from.shortestPath.distance) {
    curr.shortestPath.distance = 1 + from.shortestPath.distance;
    curr.shortestPath.next = from;
  }
  else {
    return;
  }

  // Do shortest path on the children
  if (curr.edges.n) {
    shortestPathRec(curr, curr.edges.n)
  }
  if (curr.edges.s) {
    shortestPathRec(curr, curr.edges.s)
  }
  if (curr.edges.e) {
    shortestPathRec(curr, curr.edges.e)
  }
  if (curr.edges.w) {
    shortestPathRec(curr, curr.edges.w)
  }

}


let createMaze = (row, col) => {
  let maze = createBlankMaze(row, col);

  maze = primsMaze(maze);
  return maze;
}