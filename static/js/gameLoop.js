

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

    maze[currX][currY].used = 2;

    if(adjList.length === 0)
      break;

    let adj = adjList.splice(Math.random() * adjList.length, 1);
    currX = adj[0].x;
    currY = adj[0].y;
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
      else
        console.log(`ERROR: No walls were defined at x: ${currX}, y: ${currY}`)
    }

    // // Make a wall on every other thing in the list
    // while(maze[currX][currY].adj.length > 0) {
    //   let tmpAdj = maze[currX][currY].adj.pop()[0];
    //   if(currX < tmpAdj.x)
    //     maze[currX][currY].edges.e = maze[tmpAdj.x][tmpAdj.y];
    //   else if(currX > tmpAdj.x)
    //     maze[currX][currY].edges.w = maze[tmpAdj.x][tmpAdj.y];
    //   else if(currY < tmpAdj.y)
    //     maze[currX][currY].edges.n = maze[tmpAdj.x][tmpAdj.y];
    //   else if(currY > tmpAdj.y)
    //     maze[currX][currY].edges.s = maze[tmpAdj.x][tmpAdj.y];
    //   else
    //     console.log(`ERROR: No walls were defined at x: ${currX}, y: ${currY}`)
    // }
    // delete maze[currX][currY].adj;
  }

  console.log(maze);
  return maze;
}


let createMaze = (row, col) => {
  let maze = createBlankMaze(row, col);

  maze = primsMaze(maze);

  return maze;
}

// <<<<<<<<<<<<<<< End Maze Creation >>>>>>>>>>>>>>>>>>>>


let inputBuffer = {};
let canvas = null;
let context = null;

const COORD_SIZE = 1024;
const ROW = 9;
const COL = 9;

let imgFloor = new Image();
imgFloor.isReady = false;
imgFloor.onload = function() {
    this.isReady = true;
};
imgFloor.src = 'static/images/floor.png';

let maze = createMaze(ROW, COL);

// <<<<<<<<<<<<< Begin Initialization >>>>>>>>>>>>>>>>>>>

function drawCell(cell) {

    if (imgFloor.isReady) {
        context.drawImage(imgFloor,
        cell.x * (COORD_SIZE / ROW), cell.y * (COORD_SIZE / COL),
        COORD_SIZE / ROW + 0.5, COORD_SIZE / COL + 0.5);
    }

    if (cell.edges.n === null) {
        context.moveTo(cell.x * (COORD_SIZE / ROW), cell.y * (COORD_SIZE / COL));
        context.lineTo((cell.x + 1) * (COORD_SIZE / ROW), cell.y * (COORD_SIZE / COL));
        // context.stroke();
    }

    if (cell.edges.s === null) {
        context.moveTo(cell.x * (COORD_SIZE / ROW), (cell.y + 1) * (COORD_SIZE / COL));
        context.lineTo((cell.x + 1) * (COORD_SIZE / ROW), (cell.y + 1) * (COORD_SIZE / COL));
        // context.stroke();
    }

    if (cell.edges.e === null) {
        context.moveTo((cell.x + 1) * (COORD_SIZE / ROW), cell.y * (COORD_SIZE / COL));
        context.lineTo((cell.x + 1) * (COORD_SIZE / ROW), (cell.y + 1) * (COORD_SIZE / COL));
        //context.stroke();
    }

    if (cell.edges.w === null) {
        context.moveTo(cell.x * (COORD_SIZE / ROW), cell.y * (COORD_SIZE / COL));
        context.lineTo(cell.x * (COORD_SIZE / ROW), (cell.y + 1) * (COORD_SIZE / COL));
        //context.stroke();
    }

    //
    // Can do all the moveTo and lineTo commands and then render them all with a single .stroke() call.
    context.stroke();
}


function renderCharacter(character) {
    if (character.image.isReady) {
        context.drawImage(character.image,
        character.location.x * (COORD_SIZE / ROW), character.location.y * (COORD_SIZE / COL));
    }
}


function moveCharacter(key, character) {
    if (key === 'ArrowDown') {
        if (character.location.edges.s) {
            character.location = character.location.edges.s;
        }
    }
    if (key == 'ArrowUp') {
        if (character.location.edges.n) {
            character.location = character.location.edges.n;
        }
    }
    if (key == 'ArrowRight') {
        if (character.location.edges.e) {
            character.location = character.location.edges.e;
        }
    }
    if (key == 'ArrowLeft') {
        if (character.location.edges.w) {
            character.location = character.location.edges.w;
        }
    }
}


function renderMaze() {
  context.strokeStyle = 'rgb(255, 255, 255)';
  context.lineWidth = 6;

  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      drawCell(maze[i][j]);
    }
  }

  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(COORD_SIZE - 1, 0);
  context.lineTo(COORD_SIZE - 1, COORD_SIZE - 1);
  context.lineTo(0, COORD_SIZE - 1);
  context.closePath();
  context.strokeStyle = 'rgb(0, 0, 0)';
  context.stroke();
}


//
// Immediately invoked anonymous function
//
let myCharacter = function(imageSource, location) {
    let image = new Image();
    image.isReady = false;
    image.onload = function() {
        this.isReady = true;
    };
    image.src = imageSource;
    return {
        location: location,
        image: image
    };
}('./static/images/character.png', maze[1][1]);


function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    renderMaze(ROW, COL);
    renderCharacter(myCharacter);
}


function processInput() {
    for (input in inputBuffer) {
        moveCharacter(inputBuffer[input], myCharacter);
    }
    inputBuffer = {};
}


function gameLoop() {
    processInput();
    render();

    requestAnimationFrame(gameLoop);

}


function initialize() {
    canvas = document.getElementById('canvas-main');
    context = canvas.getContext('2d');

    window.addEventListener('keydown', function(event) {
        inputBuffer[event.key] = event.key;
    });

    requestAnimationFrame(gameLoop);
}
