class Particle {
    constructor(position, velocity, radius) {
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
        this.color = this.generateRandomColor(); 
        this.opacity = 1;
    }

   
    generateRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.globalAlpha = this.opacity;
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 5);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        
        this.opacity = this.opacity - 0.0010 <= 0 ? 0 : this.opacity - 0.0010;
    }
}

export default Particle;
