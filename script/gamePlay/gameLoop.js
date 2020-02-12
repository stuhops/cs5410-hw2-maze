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


    if(document.getElementById(route).classList.contains('active'))
      requestAnimationFrame(gameLoop);
}
