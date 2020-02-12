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

    imgFloor.src = 'static/images/floor.png';
    imgBreadcrumb.src = 'static/images/breadcrumb.png';
    myCharacter.src = './static/images/character.png';
    finishImg.src = './static/images/finish.png';

    myCharacter = loadImagePos('./static/images/character.png', maze[Math.floor(Math.random() * ROW)][Math.floor(Math.random() * COL)]);
    finishImg = loadImagePos('./static/images/finish.png', maze[Math.floor(Math.random() * ROW)][Math.floor(Math.random() * COL)]);
}

