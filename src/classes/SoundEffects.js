class SoundEffects {
    constructor() {
        this.backgroundMusic = new Audio("src/assets/audios/spacesound.mp3");
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.3;

        this.shootSounds = [
            new Audio("src/assets/audios/shoot.mp3"),
            new Audio("src/assets/audios/shoot.mp3"),
            new Audio("src/assets/audios/shoot.mp3"),
            new Audio("src/assets/audios/shoot.mp3"),
            new Audio("src/assets/audios/shoot.mp3"),
        ];

        this.hitSounds = [
            new Audio("src/assets/audios/hit.mp3"),
            new Audio("src/assets/audios/hit.mp3"),
            new Audio("src/assets/audios/hit.mp3"),
            new Audio("src/assets/audios/hit.mp3"),
            new Audio("src/assets/audios/hit.mp3"),
        ];

        this.explosionSound = new Audio("src/assets/audios/explosion.mp3");
        this.nextLevelSound = new Audio("src/assets/audios/next_level.mp3");

        this.currentShootSound = 0;
        this.currentHitSound = 0;

        this.adjustVolumes();
    }

    // Método para tocar a música de fundo
    playBackgroundMusic() {
        if (this.backgroundMusic.paused) {
            this.backgroundMusic.play(); // Toca a música de fundo
        }
    }

    playShootSound() {
        this.shootSounds[this.currentShootSound].currentTime = 0;
        this.shootSounds[this.currentShootSound].play();
        this.currentShootSound =
            (this.currentShootSound + 1) % this.shootSounds.length;
    }

    playHitSound() {
        this.hitSounds[this.currentHitSound].currentTime = 0;
        this.hitSounds[this.currentHitSound].play();
        this.currentHitSound = (this.currentHitSound + 1) % this.hitSounds.length;
    }

    playExplosionSound() {
        this.explosionSound.play();
    }

    playNextLevelSound() {
        this.nextLevelSound.play();
    }

    adjustVolumes() {
        this.hitSounds.forEach((sound) => (sound.volume = 0.2));
        this.shootSounds.forEach((sound) => (sound.volume = 0.5));
        this.explosionSound.volume = 0.2;
        this.nextLevelSound.volume = 0.4;
    }
}

export default SoundEffects;
