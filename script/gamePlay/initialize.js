function initialize() {
    updateList = [
        {
            'name': 'my-score',
            'val': 1000,
            'change': -1,
            'interval': 1000,
            'iterations': 20000,
            'time': 1000,
        },
        {
            'name': 'timer',
            'val': 0,
            'change': 1,
            'interval': 1000,
            'iterations': 10000,
            'time': 1000,
        },
    ];
    toRender = [];

    canvas = document.getElementById('canvas-main');
    context = canvas.getContext('2d');

    maze = createMaze(ROW, COL);
    loadImages();

    window.addEventListener('keydown', function(event) {
        inputBuffer[event.key] = event.key;
    });

    lastTime = performance.now();
    updateList.push()
    requestAnimationFrame(gameLoop);
}