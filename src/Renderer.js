// @flow

import State from './state/State';

export default class Renderer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    parent: ?HTMLElement;
    width = 0;
    height = 0;

    constructor() {
        this.canvas = this.createCanvas();
        let ctx = this.canvas.getContext('2d');

        if (!ctx) {
            throw new Error;
        }

        this.ctx = ctx;
    }

    setParent(parent: HTMLElement) {
        this.parent = parent;
        return this;
    }

    setWidth(width: number) {
        this.width = width;

        if (this.canvas) {
            this.canvas.width = width;
        }

        return this;
    }

    setHeight(height: number) {
        this.height = height;

        if (this.canvas) {
            this.canvas.height = height;
        }

        return this;
    }

    render() {
        let parent = this.parent;

        if (!parent || parent == this.canvas.parentElement) {
            return;
        }

        this.remove();
        parent.appendChild(this.canvas);
        this.canvas.focus();
        this.center();

        return this;
    }

    remove() {
        if (this.canvas.parentElement) {
            this.canvas.remove();
        }
    }

    createCanvas() {
        let canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        // canvas.oncontextmenu = (e: Event) => false;

        return canvas;
    }

    center() {
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        return this;
    }

    draw(state: State) {
        let area = [-this.canvas.width / 2, -this.canvas.height / 2, this.canvas.width, this.canvas.height];

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
