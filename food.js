// food is both what makes 

class Food{
    constructor (_position, _color){
        this.position = _position;
        this.color = _color;
        this.found = false;
    }

    set(){
        display.setPixel(this.position, this.playerColor);
    }

    followPlayer(_player, _distance){
        if (_player.direction == "left"){
            this.position = _player.position + _distance;
        }
        if (_player.direction == "right"){
            this.position = _player.position - _distance;
        }
    }

    //lets us control the repetitive code in controller better
    //keeps track of if the key should be there
    showKeyOpenDoor(_display, _player,_distance, _door, _finalPosition){
        //if the key is found have it follow the player
        if ((this.found == true)&&(_door.state =="closed")){
            this.followPlayer(_player, _distance);
            display.setPixel(this.position, this.color);
        }
        // if the door is open the key should be in the door not behind the player
        else if ((this.found == true)&&(_door.state =="open")){
            if (_finalPosition == "hidden"){
                this.position = _display.dispalySize;
            }
            else if (_finalPosition == "inDoor"){
                this.position = _door.position+1;
            }
            else{
                this.position = _finalPosition;
            }
            
            display.setPixel(this.position, this.color);
        }
    }
}