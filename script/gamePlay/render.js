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
