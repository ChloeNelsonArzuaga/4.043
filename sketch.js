/* /////////////////////////////////////

  4.043 / 4.044 Design Studio: Advanced Interactions
  February  18, 2021
  Marcelo Coelho

  If you come from Processing, there is a Processing version here. 
  Keep in mind that there are some differences between both versions:
  https://github.com/marcelocoelho/Interface1D

*/ /////////////////////////////////////


let displaySize = 30;   // how many pixels are visible in the game
let pixelSize = 20;     // how big should they look on screen

let playerOne;    // Adding 2 players to the game
let enemyOne;
let enemyTwo;
let enemyThree;

let portalOne;       // and one portal for players to catch.
let portalTwo;       // and one portal for players to catch.

let display;      // Aggregates our final visual output before showing it on the screen

let controller;   // This is where the state machine and software logic lives

let moveUp;
let moveDown;

let doorKey;
let doorKeyFound;

let door;
let doors;

let lastTime;





function setup() {

  createCanvas((2+displaySize)*pixelSize, 5*pixelSize);     // dynamically sets canvas size

  
  display = new Display(displaySize, pixelSize);        //Initializing the display

  // Initializing enemies & players
  enemyOne = new Player(color(255,0,0), parseInt(random(0,displaySize)) , displaySize);
  enemyTwo = new Player(color(255,0,0), parseInt(random(0,displaySize)) , displaySize);
  enemyThree = new Player(color(255,0,0), parseInt(random(0,displaySize)) , displaySize);
  playerOne = new Player(color(0,0,255), 1 , displaySize);
  

  // Initializing portals
  portalOne = new Player(color(255,255,0), 15 , displaySize); 
  portalTwo = new Player(color(0,255,0), 15 , displaySize);

  doorKey = new Food(5, color(255,0,255));

  //door = new Door(20, color(255,0,255), "ONE");
  doors = new Array(1);
  doors[0]= new Door(20, color(255,0,255), "ONE");

  moveUp = false;
  moveDown = false;
  lastTime = 0;


  // Initializing controller
  controller = new Controller(); 
  
 
  

}

function draw() {

  // start with a blank screen
  background(0, 0, 0);   
  // Hide the "dead" parts of the canvas  
  fill(color(51,51,51));
  rect(0,0,(displaySize+1)*pixelSize,5*pixelSize);

  // Runs state machine at determined framerate
  controller.update();

  // After we've updated our states, we show the current one 
  display.show();

}


