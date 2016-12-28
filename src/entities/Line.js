// @flow

import type Vec from 'victor';

export default class Line {
    p0: Vec;
    p1: Vec;

    constructor(p0: Vec, p1: Vec) {
        this.p0 = p0;
        this.p1 = p1;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.moveTo(this.p0.x, this.p0.y);
        ctx.lineTo(this.p1.x, this.p1.y);
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.closePath();
        ctx.stroke();
    }
}