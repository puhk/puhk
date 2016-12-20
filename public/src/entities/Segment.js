export default class Segment {
    bounce = 1;
    
    constructor(p0, p1) {
        this.p0 = p0;
        this.p1 = p1;
    }

    clone() {
        return new Segment(this.p0.clone(), this.p1.clone());
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.p0.x, this.p0.y);
        ctx.lineTo(this.p1.x, this.p1.y);
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.closePath();
        ctx.stroke();
    }

    pack() {
        return {
            p0: this.p0.toArray(),
            p1: this.p1.toArray(),
            bounce: this.bounce
        };
    }
}
