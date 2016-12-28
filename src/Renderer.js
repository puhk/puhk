// @flow

import State from './state/State';

export default class Renderer {
    parent: Element;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width = 0;
    height = 0;

    constructor(width: number, height: number, parent: Element) {
        this.width = width;
        this.height = height;
        this.parent = parent;
    }

    init() {
        this.canvas = this.createCanvas();
        
        let ctx = this.canvas.getContext('2d');

        if (ctx == null) {
            throw new Error;
        }

        this.ctx = ctx;
        this.center();
    }

    destroy() {
        this.canvas.remove();
    }

    createCanvas() {
        let canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        // canvas.oncontextmenu = (e: Event) => false;

        this.parent.appendChild(canvas);

        return canvas;
    }

    center() {
        this.ctx.translate(this.width / 2, this.height / 2);
    }

    setWidth(width: number) {
        this.width = width;
        this.canvas.width = width;
        this.center();
    }

    draw(state: State) {
        let area = [-this.width / 2, -this.height / 2, this.width, this.height];

        this.ctx.clearRect(...area);
        this.ctx.fillStyle = '#718c5a';
        this.ctx.fillRect(...area);

        state.stadium.backgrounds.forEach(background => {
            background.draw(this.ctx);
        });

        state.stadium.segments.forEach(segment => {
            segment.draw(this.ctx);
        });

        state.stadium.goals.forEach(goal => {
            goal.draw(this.ctx);
        });

        state.discs.forEach(disc => {
            disc.draw(this.ctx);
        });
    }
}
