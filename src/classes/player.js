import { PATH_ENGINE_IMAGE, 
    PATH_ENGINE_SPRITES, PATH_SPACESHIP_IMAGE } 
from  "../utils/constants.js"; //sempre por extenção do arquivo 

class Player {

    constructor(canvaswidth, canvasheight) {

        this.width = 48 *2;
        this.height = 48 *2;
        this.velocity = 8;

        this.position = {
            x: canvaswidth / 2 - this.width / 2,
            y: canvasheight - this.height - 30,
        };
 // fecha constructor / player



    this.image = this.getImage(PATH_SPACESHIP_IMAGE);
    this.engineImage = this.getImage(PATH_ENGINE_IMAGE);
    this.engineSprites = this.getImage(PATH_ENGINE_SPRITES);
    }

     getImage(path) {
        const image = new Image();   
        image.src = path;
        return image;
    }


    
    

    moveLeft() {
        this.position.x -= this.velocity;
    }

    moveRight() {
        this.position.x += this.velocity;
    }
    //


    draw(ctx) {

       ctx.drawImage(
        this.image,
         this.position.x,
         this.position.y,
         this.height,
         this.width
    
       );

       ctx.drawImage(
        this.engineImage,
         this.position.x, // order matters
         this.position.y +10,
        this.width,
         this.height,
         

       );

       ctx.drawImage(
        this.engineImage,
        0, 0,
        48, 48,
        this.position.x,
        this.position.y,
        this.width,
        this.height
       )

        

       
    }
}

export default Player;