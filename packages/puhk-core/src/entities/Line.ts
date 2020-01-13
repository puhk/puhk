import Vec from 'victor';

interface JsonObj {
	p0: [number, number];
	p1: [number, number];
	[key: string]: any;
}

export default class Line<T extends object = {}> {
	public constructor(public p0: Vec, public p1: Vec, public data: T) {}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.moveTo(this.p0.x, this.p0.y);
		ctx.lineTo(this.p1.x, this.p1.y);
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
		ctx.closePath();
		ctx.stroke();
	}

	public pack() {
		return this.data;
	}

	public static parse<T extends JsonObj>(obj: T) {
		return new Line(Vec.fromArray(obj.p0), Vec.fromArray(obj.p1), obj);
	}
}
