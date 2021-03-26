

class LevelFrame {


    constructor() {
 
        this.numberOfFrames = 30;    // how many frames the animation has 
        this.pixels = 30;            // how wide the animation is
        
        // Multidimensional arrays in javascript are a bit silly
        // I recommend you watch this to understand what is happening next: https://www.youtube.com/watch?v=OTNpiLUSiB4
        this.animation = new Array(this.numberOfFrames);
       
        // populate array with empty/black pixels
        for (let j = 0; j < this.pixels; j++) {
            this.animation[j] = color(0, 0, 0);
        }
        

    }

}
