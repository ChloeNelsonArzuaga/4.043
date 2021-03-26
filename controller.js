
// This is where your state machines and game logic lives


class Controller {

    // This is the state we start with.
    constructor() {
        this.gameState = "ZERO";

    }
    
    update() {

        // STATE MACHINE ////////////////////////////////////////////////
        // This is where your game logic lives
        /////////////////////////////////////////////////////////////////
        switch(this.gameState) {

            // This is the main game state, where the playing actually happens
            case "ZERO":
                // clear screen at frame rate so we always start fresh      
                display.clear();

                // ------ sets up the objects in this stage -------------
                playerOne.set();
                playerOne.height = 1;
                portalOne.set();
                enemyOne.set();
                enemyOne.attack(600);

                // ------ checks related to combat ----------------
                playerOne.checkArm(2000,500);
                this.checkPlayerEnemy(playerOne, enemyOne);//checks is a player/enemy colliosin has ocured
                
                // ------- checks related to doors -----------------
                doorKey.showKeyOpenDoor(display,playerOne,1,doors[0], "hidden");

                // ------- checks related to moving from one stage to another --------
                this.rightLeft(playerOne, "ONE", "");
                this.portalUp(playerOne, portalOne, "TWO");

                break;
              

            case "ONE": 

                display.clear();

                // ------ sets up the objects in this stage -------------
                doors[0].setDoor();
                playerOne.set();
                playerOne.height = 1;

                // ------- checks related to doors -----------------
                doorKey.showKeyOpenDoor(display, playerOne,1,doors[0], "inDoor"); //keeps track of and shows the key
                this.checkDoor(playerOne, doors[0], doorKey); 
                
                // ------- checks related to moving from one stage to another --------
                this.rightLeft(playerOne, "THREE", "ZERO");

                break;

            case "TWO":
                display.clear();

                // ------ sets up the objects in this stage -------------
                display.setPixel(playerOne.position, playerOne.playerColor);
                playerOne.height = 0;
                display.setPixel(portalTwo.position, portalTwo.playerColor);
                display.setPixel(doorKey.position, doorKey.color);

                // ------- checks related to doors -----------------
                this.foundKey(playerOne,doorKey)
                doorKey.showKeyOpenDoor(display,playerOne,1,doors[0], "hidden"); //keeps track of if the key should be there

                // ------- checks related to moving from one stage to another --------
                this.portalDown(playerOne, portalTwo, "ZERO");

                break;

            case "THREE":
                display.clear();

                // ------ sets up the objects in this stage -------------
                playerOne.set();
                playerOne.height = 1;

                enemyTwo.set();
                enemyTwo.attack(600);
                enemyThree.set();
                enemyThree.attack(600);

                // ------ checks related to combat ----------------
                playerOne.checkArm(2000,500);
                this.checkPlayerEnemy(playerOne, enemyTwo);//checks is a player/enemy colliosin has ocured
                this.checkPlayerEnemy(playerOne, enemyThree);//checks is a player/enemy colliosin has ocured

                // ------- checks related to moving from one stage to another --------
                this.rightLeft(playerOne, "", "ONE");


                break;

            // Not used, it's here just for code compliance
            default:
                break;

        }
    }

    foundKey(_player, _key){
        if (_player.position == _key.position){
            _key.found = true;
        }
    }

    checkDoor(_player, _door, _key){
        //if you get to the door
        if (_player.position == _door.position){
            //if it is open walk on through
            if (_door.state == "open"){
                _player.canGoRight = true;
                display.setPixel(_key.position, _key.color);
            }
            //if it is locked you cant go unless you have the key
            if (_door.state == "closed"){
                _player.canGoRight = false;
                if (_key.found == true){
                    _player.canGoRight = true;
                    _door.state = "open";
                }
                //if you do not have the key go infront on the door
                else{
                    _player.positon = _player.position -1;
                }
            }  
        }
        else{
            _player.canGoRight = true; 
        }
    }

    portalUp(_player, _portal, _upState){
        //if we are touching the portal let us go up
        if (_player.position == _portal.position){
            //this lets us use the W key
            _player.canGoUp = true;
            //this tells us the W key has been used
            if (moveUp == true){
                moveUp = false;
                _player.canGoUp = false;
                this.gameState = _upState;
            }   
        }
        //Stop letting us go up if we are no longer on the portal
        else{
            _player.canGoUp = false;
        }
    }

    portalDown(_player, _portal, _downState){
        //check if touching the down portal
        if (_player.position == _portal.position){
            //this lets us use the S key
            _player.canGoDown = true;
            //this tells us the S key has been used
            if (moveDown == true){
                moveDown = false;
                _player.canGoDown = false;
                this.gameState = _downState;
            }
        }
        else{
            _player.canGoDown = false;
        }
    }


    checkPlayerEnemy(_player, _enemy){
        if (_player.position == _enemy.position){
            if (_player.armed == true){
                //Enemy dies and it gets sent to the abyss and cant move
                _enemy.attackDirection = 0;
                _enemy.position = display.displaySize;        
            }
            else{
                //Player Dies and gets reset to last save
                print("I am here");
                this.gameState = _player.reset();
            }
        }
    }

    rightLeft(_player, _rightState, _leftState){
        //what happens when the player gets to the right
        if ((playerOne.position == display.displaySize-1)&&( _rightState != "")){
            this.gameState = _rightState;
            playerOne.position = 1;
        }
        if ((playerOne.position == 0)&&(_leftState != "")){
            this.gameState = _leftState;
            playerOne.position = display.displaySize-2;
        }
    }
}



// This function gets called when a key on the keyboard is pressed
function keyPressed() {

    // Move player one to the left if letter A is pressed
    if (key == 'A' || key == 'a') {
        playerOne.move(-1);
        playerOne.direction = "left";
    }
    
    // And so on...
    if ((key == 'D' || key == 'd')&&(playerOne.canGoRight == true)) {
        playerOne.move(1);
        playerOne.direction = "right";
    }   
    
    if ((key == 'W' || key == 'w')&&(playerOne.canGoUp == true)) {
        moveUp = true;
    }

    if ((key == 'S' || key == 's')&&(playerOne.canGoDown == true)) {
        moveDown = true;
    }

    if (key == 'K' || key == 'k'){
        playerOne.arm();
    }
    
    // When you press the letter R, the game resets back to the play state
    if (key == 'R' || key == 'r') {
        controller.gameState = "ZERO";
    }
}