// @flow

import Vec from 'victor';

export class Background {
    pos: Vec;
    width: number;
    height: number;
    type: Types;
    loaded = false;
    img: Image;

    constructor(pos: Vec, width: number, height: number, type: Types) {
        this.pos = pos;
        this.width = width;
        this.height = height;
        this.type = type;
    }

    load() {
        this.img = new Image;
        this.img.src = `images/backgrounds/${this.type}.png`;

        this.img.onload = () => {
            this.loaded = true;
        };
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (!this.loaded) {
            return;
        }
        
        let pattern = ctx.createPattern(this.img, 'repeat');
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
        let background = new Background(Vec.fromArray(obj.pos), obj.width, obj.height, obj.type);
        background.load();
        return background;
    }
}

type Types = 'grass';

export type JsonBackground = {
    pos: {
        x: number,
        y: number
    },
    width: number,
    height: number,
    type: Types
};