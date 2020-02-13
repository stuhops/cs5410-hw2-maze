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

function loadImages() {
    imgFloor.onload = function() {
        this.isReady = true;
    };
    imgBreadcrumb.onload = function() {
        this.isReady = true;
    };
    myCharacter.onload = function() {
        this.isReady = true;
    };
    finishImg.onload = function() {
        this.isReady = true;
    };

    imgFloor.src = './assets/floor.png';
    imgBreadcrumb.src = './assets/breadcrumb.png';
    myCharacter.src = './assets/character.png';
    finishImg.src = './assets/finish.png';

    myCharacter = loadImagePos('./assets/character.png', maze[Math.floor(Math.random() * ROW)][Math.floor(Math.random() * COL)]);
    finishImg = loadImagePos('./assets/finish.png', maze[Math.floor(Math.random() * ROW)][Math.floor(Math.random() * COL)]);
}

