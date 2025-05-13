class Particle {
    constructor(position, velocity, radius, color) {
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
        this.color = color;
        this.opacity = 1;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity; 
        ctx.fill();
        ctx.globalAlpha = 1; 
        ctx.closePath();
        ctx.restore();
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.opacity = this.opacity - 0.0009 <= 0 ? 0  :  this.opacity -  0.0009 ;
    }
}

export default Particle;