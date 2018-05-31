import Vec from 'victor';

export default class Line {
    public constructor(public p0: Vec, public p1: Vec) {}

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.moveTo(this.p0.x, this.p0.y);
        ctx.lineTo(this.p1.x, this.p1.y);
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.closePath();
        ctx.stroke();
    }
}
