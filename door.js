// this is a class that create a door with a 1 wide opening (could change this in the future)


class Door{
    constructor(_position, _color, _stage){
        this.position = _position;
        this.color = _color;
        this.state = "closed"
        this.stage = _stage;
    }

    setDoor(){
        display.setPixel(this.position, this.color);
        display.setPixel(this.position+2, this.color);
    }
}