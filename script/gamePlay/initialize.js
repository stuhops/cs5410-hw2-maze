function initialize() {
    canvas = document.getElementById('canvas-main');
    context = canvas.getContext('2d');

    maze = createMaze(ROW, COL);
    loadImages();

    window.addEventListener('keydown', function(event) {
        inputBuffer[event.key] = event.key;
    });

    requestAnimationFrame(gameLoop);
}