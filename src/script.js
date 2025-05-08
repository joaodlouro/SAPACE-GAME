import Player from "./classes/player.js"; // puxando class player
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const player = new Player(canvas.width, canvas.height); 

const keys = {
    left: false,
    right: false,
}

const gameLoop = () => {         //loop
    ctx.clearRect(0,0, canvas.width, canvas.height)

    if (keys.left) {
        player.position.x -= 6;
    }
    
    if (keys.right) {
        player.position.x += 6;
    }

    player.draw(ctx);

    requestAnimationFrame(gameLoop); //LOOP

};

gameLoop();




//  //

addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase(); 

    if (key === "a"){
       keys.left = true//modifica valores 
    }


    if (key === "d"){
        keys.right = true//modifica valores 
    }
});

//

addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase(); 

    if (key === "a"){
       keys.left = false//modifica valores 
    }


    if (key === "d"){
        keys.right = false//modifica valores 
    }
});