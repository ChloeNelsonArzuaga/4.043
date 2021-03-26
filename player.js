
// This holds some player information, like color and position.
// It also has some player methods for managing how a player moves.


class Player {
  
    constructor(_color, _position, _displaySize) {
        this.playerColor = _color;
        this.position = _position;
        this.score = 0;
        this.displaySize = _displaySize;
        this.canGoUp = false;
        this.canGoDown = false;
        this.canGoRight = true;
        this.direction = "right";
        this.armed = false;
        this.canBeArmed = true;
        this.lastArming = 0;
        this.attackDirection = -1;
        this.height = 3;
    }

    set(){
        display.setPixel(this.position, this.playerColor);
    }

    //sets the player to position 1 or
    //checks for the last open door and places player there
    reset(){
        //if the first door has been found, check all the other doors
        if (doors[0].state == "open"){
            let i =0;
            for (i = 0; i < doors.length-1; i++){
                if (doors[i].state == "close"){
                    this.position = doors[i-1].position;
                    return doors[i-1].stage;
                }
            }
            //if all doors are open, go to the last door
            this.position = doors[i].position;
            return doors[i].stage;
        }
        //if no doors have been found open
        else{
            print("and here 2");
            this.position = 1;
            return "ZERO";
        }
    }

    // Move player based on keyboard input
    move(_direction) {

        // increments or decrements player position
        this.position = this.position + _direction;

        if (this.position > this.displaySize-1){
            this.position = this.displaySize-1;
        }

        if (this.position < 0){
            this.position = 0;
        }
         
    } 

    // starts going to the left, hots wall comes back
    attack(_speed){
        
        //display.setPixel(enemyOne.position, enemyOne.playerColor);
      
        if (millis() - lastTime > _speed) {
            this.position = this.position + this.attackDirection;
            
            //if you are on the right
            if (this.position == this.displaySize-1){
                this.attackDirection = -1;
            }
            //if you are on the left
            if (this.position == 0){
                this.attackDirection = 1;
            }
            lastTime = millis();
        }
    }

    // note that if cooldown is less than timeArmed, the player can always be armed
    checkArm(_coolDown, _timeArmed){
        // the player has been armed for the available time
        if (millis()- this.lastArming >= _timeArmed) {
            this.armed = false;
            this.playerColor = color(0,0,255);
            this.canBeArmed = false;
            // if the player cool down has been passed
            if (millis() - this.lastArming >= _coolDown){
                this.canBeArmed = true;
            }
        }
    }

    arm(){
        //this arms the player
        if (this.canBeArmed == true){
            this.armed = true;
            this.lastArming = millis();
            this.playerColor = color(0,255,255);
        }
    }
  }






      /* 
   The function millis() counts up from 0 when the program begins.
   since lastTime is established as 0, millis() - lastTime will be
   false until after 601 milliseconds, at which point, it will be 
   true, triggering the ellipse to be drawn.
   
   The second if statement establishes the length for the ellipse 
   to remain on screen, as the moment millis()-lastTime is more 
   than 1200 milliseconds, the program sets lastTime to the same
   time as millis(), setting millis()-lasttime = 1201-1201 = 0
   redrawing the background over everything for another 600 ms


    */