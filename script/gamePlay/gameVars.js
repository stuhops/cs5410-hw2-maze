let inputBuffer = {};
let canvas = null;
let context = null;

let route = 'main-menu';
document.getElementById(route).classList.add('active');

const COORD_SIZE = 1024;
let ROW = 9;
let COL = 9;

let maze = [[]];

let showBreadcrumbs = false;
let breadcrumbList = [];

let imgFloor = new Image();
let imgBreadcrumb = new Image();
let myCharacter = new Image();
let finishImg = new Image();

imgFloor.isReady = false;
imgBreadcrumb.isReady = false;
myCharacter.image.isReady = false;
finishImg.isReady = false;
