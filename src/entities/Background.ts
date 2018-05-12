import Vec from 'victor';

export type PitchTypes =
    'grass' |
    'hockey';

export interface JsonBackground {
    pos: number[];
    width: number;
    height: number;
    type: PitchTypes;
}

export default class Background {
    static images = new Map<PitchTypes, HTMLImageElement>();

    pos: Vec;
    width: number;
    height: number;
    type: PitchTypes;

    constructor(pos: Vec, width: number, height: number, type: PitchTypes) {
        this.pos = pos;
        this.width = width;
        this.height = height;
        this.type = type;
    }

    draw(ctx: CanvasRenderingContext2D) {
        let image = Background.images.get(this.type);

        if (!(image instanceof HTMLImageElement) || !image.complete) {
            return;
        }

        let pattern = ctx.createPattern(image, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }

    pack(): JsonBackground {
        return {
            pos: this.pos.toArray(),
            width: this.width,
            height: this.height,
            type: this.type
        };
    }

    static parse(obj: JsonBackground): Background {
        return new Background(Vec.fromArray(obj.pos), obj.width, obj.height, obj.type);
    }
}
