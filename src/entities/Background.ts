import Vec from 'victor';

enum PitchTypes {
	grass = 'grass',
	hockey = 'hockey',
}

export interface JsonBackground {
	pos: number[];
	width: number;
	height: number;
	type: PitchTypes;
}

export default class Background {
	public static images: Partial<Record<PitchTypes, HTMLImageElement>> = {};

	public constructor(private pos: Vec, private width: number, private height: number, private type: PitchTypes) {}

	public draw(ctx: CanvasRenderingContext2D) {
		const image = Background.images[this.type];

		if (!(image instanceof HTMLImageElement) || !image.complete) {
			return;
		}

		const pattern = ctx.createPattern(image, 'repeat')!!;
		ctx.fillStyle = pattern;
		ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
	}

	public pack(): JsonBackground {
		return {
			pos: this.pos.toArray(),
			width: this.width,
			height: this.height,
			type: this.type,
		};
	}

	public static parse(obj: JsonBackground): Background {
		return new Background(Vec.fromArray(obj.pos), obj.width, obj.height, obj.type);
	}
}
