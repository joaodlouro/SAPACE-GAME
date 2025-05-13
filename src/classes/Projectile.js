class Projectile {
    constructor(position, velocity, color = "teal") {
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;
        this.color = color;

    }

   draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x - 2, this.position.y, 4, 12);
}

    update() {
        this.position.y += this.velocity;
    }
}

export default Projectile;
