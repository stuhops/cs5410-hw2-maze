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

let myCharacter = loadImagePos('./static/images/character.png', maze[Math.floor(Math.random() * ROW)][Math.floor(Math.random() * COL)]);
let finishImg = loadImagePos('./static/images/finish.png', maze[Math.floor(Math.random() * ROW)][Math.floor(Math.random() * COL)]);
