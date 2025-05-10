import { PATH_ENGINE_IMAGE, 
    PATH_ENGINE_SPRITES, PATH_SPACESHIP_IMAGE } 
from  "../utils/constants.js"; //sempre por extenção do arquivo 

const INITIAL_FRAMES = 6;

class Player{

    constructor(canvaswidth, canvasheight) {

        this.width = 48 *2;
        this.height = 48 *2;
        this.velocity = 8;

        this.position = {
            x: canvaswidth / 2 - this.width / 2,
            y: canvasheight - this.height - 30,
        };
 // fecha constructor / player



  this.image = new Image();
this.image.src = PATH_SPACESHIP_IMAGE;


this.engineImage = new Image();
this.engineImageLoaded = false;
this.engineImage.onload = () => {
  this.engineImageLoaded = true;

};
this.engineImage.src = PATH_ENGINE_IMAGE;


this.engineSprites = new Image();
this.engineSpritesLoaded = false;
this.engineSprites.onload = () => {
  this.engineSpritesLoaded = true;
};

this.engineSprites.src = PATH_ENGINE_SPRITES;
    this.sx = 0;

   this.initialFrames = INITIAL_FRAMES;
   this.framesCounter = this.initialFrames;

  }
    

    moveLeft(){
        this.position.x -= this.velocity;
    }

    moveRight() {
        this.position.x += this.velocity;
    };

    


      draw(ctx) {
    
    ctx.drawImage(
      this.image,
      this.position.x ,
      this.position.y,
      this.width,
      this.height
    );

   
    if (this.engineImageLoaded) {
      ctx.drawImage(
        this.engineImage ,
        this.position.x,
        this.position.y + 10, 
        this.width,
        this.height
      );
    }

   
    if (this.engineSpritesLoaded) {    //animation 
      ctx.drawImage(
        this.engineSprites,
        this.sx, -5,       
        48,48,           
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }

    this.update(); 
  }

   update() { //animation
    
    if (this.framesCounter === 0) {
      this.sx = (this.sx === 96) ? 0 : this.sx + 48; 
      this.framesCounter = this.initialFrames; 
    } else {
      this.framesCounter--; 
    }
  }


   shoot(projectilesArray) {
  const p = {
    position: {
      x: this.position.x + this.width / 2 - 2,
      y: this.position.y + 2,
    },
    velocity: -10,
    width: 4,
    height: 10
  };

  projectilesArray.push(p); 
}
    hit(projectile) {
    return (
      projectile.position.x >= this.position.x + 20 &&
      projectile.position.x <= this.position.x + 20 + this.width - 38 &&
      projectile.position.y + projectile.height >= this.position.y + 22 &&
      projectile.position.y + projectile.height <=
        this.position.y + 22 + this.height - 34
    );
  }
}

export default Player;