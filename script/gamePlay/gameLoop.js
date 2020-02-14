function processInput() {
  for (input in inputBuffer) {

    moveCharacter(inputBuffer[input], myCharacter);

    if (inputBuffer[input] === 'b')
      showBreadcrumbs = !showBreadcrumbs;
    if (inputBuffer[input] === 'p')
      displayShortestPath = !displayShortestPath;
    if (inputBuffer[input] === 'h')
      showHint = !displayShortestPath;
  }
  inputBuffer = {};
}


function update(elapsedTime) {
  for(let i = 0; i < updateList.length; i++) {
    updateList[i].time -= elapsedTime;
    if (updateList[i].time <= 0) {
      updateList[i].iterations--;
      updateList[i].time += Number(updateList[i].interval);

      updateList[i].val += updateList[i].change;

      if(updateList[i].val >= 0) {
        toRender.push({
          name: updateList[i].name, 
          val: updateList[i].val,
        });
      }
      else {
        toRender.push({
          name: updateList[i].name, 
          val: 0,
        });
      }
    }
  }
}


function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    renderMaze(ROW, COL);
    renderCharacter(finishImg);
    renderCharacter(myCharacter);

    if(showHint)
      showShortestPath(myCharacter.location, false);

    if(displayShortestPath)
      showShortestPath(myCharacter.location, true);

    while(toRender.length) {
      rend = toRender.pop();
      document.getElementById(rend.name).innerHTML = rend.val;
    }

    while(breadcrumbList.length) {
      renderCharacter(breadcrumbList.pop());
    }
}


function gameLoop(time) {
  let elapsedTime = time - lastTime;

  processInput();
  update(elapsedTime);
  render();


  if(document.getElementById('game-play').classList.contains('active')) {
    lastTime = time;
    requestAnimationFrame(gameLoop);
  }
}
