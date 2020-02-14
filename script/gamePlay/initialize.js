function initialize() {
    updateList = [
        {
            'name': 'my-score',
            'val': 1000,
            'change': -1,
            'interval': 1000,
            'iterations': 20000,
            'time': 0,
        },
        {
            'name': 'timer',
            'val': 0,
            'change': 1,
            'interval': 1000,
            'iterations': 10000,
            'time': 0,
        },
    ];
    toRender = [];

    showBreadcrumbs = false;
    showHint = false;
    displayShortestPath = false;

    for(let i = 0; i < document.getElementsByName('high-score').length; i++) {
        document.getElementsByName(`high-score`)[i].innerHTML = highScores[0];
    }

    canvas = document.getElementById('canvas-main');
    context = canvas.getContext('2d');

    maze = createMaze(ROW, COL);
    loadImages();
    shortestPathEntry();

    myCharacter = loadImagePos('./assets/character.png', startCell);

    window.addEventListener('keydown', function(event) {
        inputBuffer[event.key] = event.key;
    });

    lastTime = performance.now();
    updateList.push()
    requestAnimationFrame(gameLoop);
}