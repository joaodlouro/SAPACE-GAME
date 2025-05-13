import Player from "./classes/player.js"; 
import Projectile from "./classes/Projectile.js"; 
import Invader from "./classes/invader.js";
import Grid from "./classes/Grid.js";
import Particle from "./classes/Particle.js";

const stars = [];
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
const particles = [];


const backgroundMusic = new Audio('src/assets/audios/spacesound.mp3');

backgroundMusic.loop = true;
backgroundMusic.volume = 0.3;
let musicStarted = false;

ctx.imageSmoothingEnabled = false;

const player = new Player(canvas.width, canvas.height); 
const grid = new Grid(3, 6); 
const playerProjectiles = []; 
const invaderProjectiles = []; 
const invader = new Invader({ x: 150, y: 100 }, 5);

const keys = {
    left: false,
    right: false,
    shoot: { pressed: false, released: true }
};

let currentState = 'PLAYING';

const drawProjectiles = () => {
    const projectiles = [...playerProjectiles, ...invaderProjectiles];
    projectiles.forEach((projectile) => {
        projectile.draw(ctx);
        projectile.update();
    });
};

const drawParticles = () => {   
    particles.forEach((particle) => {
        particle.draw(ctx);
        particle.update();
    });
};

const clearProjectiles = () => {
    playerProjectiles.forEach((projectile, index) => {
        if (projectile.position.y <= 0) {
            playerProjectiles.splice(index, 1);
        }
    });
};

const createExplosion = (position, size) => {
    for (let i = 0; i < size; i++) {
        const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        const particle = new Particle(
            { x: position.x, y: position.y },
            { x: (Math.random() - 0.5) * 4, y: (Math.random() - 0.5) * 4 },
            1.5,
            randomColor
        );
        particles.push(particle);
    }
};

const showGameOverScreen = () => {
    const gameOverScreen = document.createElement('div');
    gameOverScreen.innerText = "Game Over!";
    document.body.append(gameOverScreen);
    gameOverScreen.classList.add("zoom-animation");
};

const gameOver = () => {
    createExplosion({ x: player.position.x + player.width / 2, y: player.position.y + player.height / 2 }, 10);
    player.alive = false;
    currentState = 'GAME_OVER';
    showGameOverScreen();
};

const checkShootInvader = () => {
    grid.invaders.forEach((invader, invaderIndex) => {
        playerProjectiles.forEach((projectile, projectileIndex) => {
            if (invader.hit(projectile)) {
                createExplosion(invader.position, 50);
                grid.invaders.splice(invaderIndex, 1);
                playerProjectiles.splice(projectileIndex, 1);
            }
        });
    });
};

const spawnGrid = () => {
    if (grid.invaders.length === 0) {
        grid.rows = Math.round(Math.random() * 9 + 1);
        grid.cols = Math.round(Math.random() * 9 + 1);
        grid.restart();
    }
};

const checkShootPlayer = () => {
    invaderProjectiles.forEach((projectile, index) => {
        if (player.hit(projectile)) {
            
            invaderProjectiles.splice(index, 1);
            gameOver();
        }
    });
};

const checkPlayerCollidedInvaders = () => {
    grid.invaders.forEach((invader) => {
        if (
            invader.position.x >= player.position.x &&
            invader.position.x <= player.position.x + player.width &&
            invader.position.y >= player.position.y
        ) {
            gameOver();
        }
    });
};

const clearParticles = () => {
    particles.forEach((particle, i) => {
        if (particle.opacity <= 0) {
            particles.splice(i, 1);
        }
    });
};

const gameLoop = () => {
    if (currentState === 'GAME_OVER') return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    spawnGrid();
    drawParticles();
    drawProjectiles();
    clearProjectiles();
    checkShootInvader();
    checkPlayerCollidedInvaders();
    checkShootPlayer();
    clearParticles();

    grid.update(true);
    grid.draw(ctx);

    ctx.save();
    ctx.translate(player.position.x + player.width / 2, player.position.y + player.height / 2);

    if (keys.shoot.pressed && keys.shoot.released) {
        player.shoot(playerProjectiles);
        keys.shoot.released = false;
    }

    if (keys.left && player.position.x >= 0) {
        player.moveLeft();    
        ctx.rotate(-0.20);
    }

    if (keys.right && player.position.x <= canvas.width - player.width) {
        player.moveRight();
        ctx.rotate(0.20);
    }

    ctx.translate(-player.position.x - player.width / 2, -player.position.y - player.height / 2);
    player.draw(ctx);
    ctx.restore();

    requestAnimationFrame(gameLoop);
};

// Inicia música ao interagir
const tryStartMusic = () => {
    if (!musicStarted) {
        backgroundMusic.play();
        musicStarted = true;
    }
};

addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    if (key === "a") keys.left = true;
    if (key === "d") keys.right = true;
    if (key === "enter") keys.shoot.pressed = true;
    tryStartMusic();
});

addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();
    if (key === "a") keys.left = false;
    if (key === "d") keys.right = false;
    if (key === "enter") {
        keys.shoot.pressed = false;
        keys.shoot.released = true;
    }
});

addEventListener("click", tryStartMusic); // funciona com clique

setInterval(() => {
    const invader = grid.getRandomInvader();
    if (invader) {
        invader.shoot(invaderProjectiles);
    }
}, 1000);

gameLoop();
