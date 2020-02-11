

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
        breadcrumb: false,
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


let createMaze = (row, col) => {
  let maze = createBlankMaze(row, col);

  maze = primsMaze(maze);
  return maze;
}

// <<<<<<<<<<<<<<< End Maze Creation >>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<< Begin Initialization >>>>>>>>>>>>>>>>>>>

let inputBuffer = {};
let canvas = null;
let context = null;

const COORD_SIZE = 1024;
const ROW = 9;
const COL = 9;

let imgFloor = new Image();
let imgBreadcrumb = new Image();
imgFloor.isReady = false;
imgBreadcrumb.isReady = false;
imgFloor.onload = function() {
    this.isReady = true;
};
imgBreadcrumb.onload = function() {
    this.isReady = true;
};
imgFloor.src = 'static/images/floor.png';
imgBreadcrumb.src = 'static/images/breadcrumb.png';

let maze = createMaze(ROW, COL);
let showBreadcrumbs = false;
let breadcrumbList = [];

// <<<<<<<<<<<<<<< End Initialization >>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<< Begin Image Rendering >>>>>>>>>>>>>>>>>>

function loadImagePos(imageSource, location) {
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
}

let myCharacter = loadImagePos('./static/images/character.png', maze[Math.floor(Math.random() * ROW)][Math.floor(Math.random() * COL)]);
let finishImg = loadImagePos('./static/images/finish.png', maze[Math.floor(Math.random() * ROW)][Math.floor(Math.random() * COL)]);


function drawCell(cell) {

  if (imgFloor.isReady) {
    context.drawImage(imgFloor,
    cell.x * (COORD_SIZE / ROW), cell.y * (COORD_SIZE / COL),
    COORD_SIZE / ROW + 0.5, COORD_SIZE / COL + 0.5);
  }

  if (cell.edges.n === null) {
    context.moveTo(cell.x * (COORD_SIZE / ROW), cell.y * (COORD_SIZE / COL));
    context.lineTo((cell.x + 1) * (COORD_SIZE / ROW), cell.y * (COORD_SIZE / COL));
  }

  if (cell.edges.s === null) {
    context.moveTo(cell.x * (COORD_SIZE / ROW), (cell.y + 1) * (COORD_SIZE / COL));
    context.lineTo((cell.x + 1) * (COORD_SIZE / ROW), (cell.y + 1) * (COORD_SIZE / COL));
  }

  if (cell.edges.e === null) {
    context.moveTo((cell.x + 1) * (COORD_SIZE / ROW), cell.y * (COORD_SIZE / COL));
    context.lineTo((cell.x + 1) * (COORD_SIZE / ROW), (cell.y + 1) * (COORD_SIZE / COL));
  }

  if (cell.edges.w === null) {
    context.moveTo(cell.x * (COORD_SIZE / ROW), cell.y * (COORD_SIZE / COL));
    context.lineTo(cell.x * (COORD_SIZE / ROW), (cell.y + 1) * (COORD_SIZE / COL));
  }

  if(showBreadcrumbs && cell.breadcrumb && imgBreadcrumb.isReady) {
    context.drawImage(imgBreadcrumb,
                      cell.x * (COORD_SIZE / ROW) + .25 * (COORD_SIZE / ROW),
                      cell.y * (COORD_SIZE / COL) + .25 * (COORD_SIZE / COL),
                      COORD_SIZE / (ROW*2) + 0.5,
                      COORD_SIZE / (COL*2) + 0.5
                     );
  }
}


function renderCharacter(character) {
  if (character.image.isReady) {
    context.drawImage(character.image,
                      character.location.x * (COORD_SIZE / ROW),
                      character.location.y * (COORD_SIZE / COL),
                      COORD_SIZE / ROW + 0.5, COORD_SIZE / ROW + 0.5
    );
  }
}


function moveCharacter(key, character) {
    if (key === 'ArrowDown') {
        if (character.location.edges.s) {
            character.location.breadcrumb = true;
            character.location = character.location.edges.s;
        }
    }
    if (key == 'ArrowUp') {
        if (character.location.edges.n) {
            character.location.breadcrumb = true;
            character.location = character.location.edges.n;
        }
    }
    if (key == 'ArrowRight') {
        if (character.location.edges.e) {
            character.location.breadcrumb = true;
            character.location = character.location.edges.e;
        }
    }
    if (key == 'ArrowLeft') {
        if (character.location.edges.w) {
            character.location.breadcrumb = true;
            character.location = character.location.edges.w;
        }
    }
}


function renderMaze() {
  context.strokeStyle = 'rgb(255, 255, 255)';
  context.lineWidth = 6;

  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      drawCell(maze[i][j], showBreadcrumbs);
    }
  }
  context.stroke();

  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(COORD_SIZE - 1, 0);
  context.lineTo(COORD_SIZE - 1, COORD_SIZE - 1);
  context.lineTo(0, COORD_SIZE - 1);
  context.closePath();
  context.strokeStyle = 'rgb(0, 0, 0)';
  context.stroke();
}


// <<<<<<<<<<<<<<< End Image Rendering >>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<< Begin Game Loop >>>>>>>>>>>>>>>>>>>>>

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    renderMaze(ROW, COL);
    renderCharacter(finishImg);
    renderCharacter(myCharacter);

    while(breadcrumbList.length) {
      renderCharacter(breadcrumbList.pop());
    }
}


function processInput() {
    for (input in inputBuffer) {

        moveCharacter(inputBuffer[input], myCharacter);

        if (inputBuffer[input] === 'b') {
          showBreadcrumbs = !showBreadcrumbs;
        }
    }
    inputBuffer = {};
}


function gameLoop() {
    processInput();
    render();

    requestAnimationFrame(gameLoop);

}

// <<<<<<<<<<<<<<<<< End Game Loop >>>>>>>>>>>>>>>>>>>>>>

function initialize() {
    canvas = document.getElementById('canvas-main');
    context = canvas.getContext('2d');

    window.addEventListener('keydown', function(event) {
        inputBuffer[event.key] = event.key;
    });

    requestAnimationFrame(gameLoop);
}
