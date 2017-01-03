// @flow

import State from './state/State';

export default class Renderer {
    parent: ?HTMLElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width = 0;
    height = 0;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    init() {
        let canvas = this.createCanvas();
        let ctx = canvas.getContext('2d');

        if (ctx == null) {
            throw new Error;
        }

        this.canvas = canvas;
        this.ctx = ctx;
        this.center();

        if (this.parent) {
            this.render();
        }
    }

    setParent(parent: HTMLElement) {
        this.parent = parent;

        if (this.canvas) {
            this.render();
        }
    }

    render() {
        let parent = this.parent;
        
        if (!this.canvas || !parent) {
            return;
        }

        this.remove();
        parent.appendChild(this.canvas);
        this.canvas.focus();
    }

    remove() {
        this.canvas.remove();
    }

    createCanvas() {
        let canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        // canvas.oncontextmenu = (e: Event) => false;

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
