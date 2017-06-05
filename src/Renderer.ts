import Vec from 'victor';

import State from './state/State';
import Disc from './entities/Disc';

export default class Renderer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    parent: HTMLElement;
    cameraPos = new Vec(0, 0);
    cameraLerp = 0.04;

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
        this.canvas.width = width;
        this.translate();

        return this;
    }

    setHeight(height: number) {
        this.canvas.height = height;
        this.translate();

        return this;
    }

    attach() {
        let parent = this.parent;

        if (!parent || parent == this.canvas.parentElement) {
            return;
        }

        this.remove();
        parent.appendChild(this.canvas);
        this.canvas.focus();
        this.translate();

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

    get centerPos(): Vec {
        return new Vec(this.canvas.width / 2, this.canvas.height / 2);
    }

    translate() {
        let center = this.centerPos;
        this.ctx.translate(center.x - this.cameraPos.x, center.y - this.cameraPos.y);
        return this;
    }

    draw(state: State) {
        this.lerpCamera(state);

        let area = [
            (-this.canvas.width / 2) + this.cameraPos.x,
            (-this.canvas.height / 2) + this.cameraPos.y,
            this.canvas.width,
            this.canvas.height
        ];

        (<any>this.ctx.clearRect)(...area);
        this.ctx.fillStyle = '#718c5a';
        (<any>this.ctx.fillRect)(...area);

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

    lerpCamera(state: State) {
        let { width, height } = this.canvas;
        let { cameraConstraints } = state.stadium;

        if (width >= cameraConstraints[0] * 2 && height >= cameraConstraints[1] * 2) {
            this.resetCamera();
            return;
        }

        let ball = state.discs.find(disc => disc.isBall);
        let player = state.discs.find(disc => disc.isMe);
        let target = new Vec(0, 0);

        if (ball) {
            target = ball.position.clone();

            if (player) {
                let diff = player.position.clone().subtract(ball.position);
                target.add((<any>diff).divideScalar(2));
            }
        } else if (player) {
            target = player.position.clone();
        }

        let diff = target.clone().subtract(this.cameraPos);
        let lerp = diff.multiplyScalar(this.cameraLerp);

        if ((width / 2) + Math.abs(this.cameraPos.x) + (lerp.x * Math.sign(this.cameraPos.x)) > cameraConstraints[0]) {
            lerp.x = (cameraConstraints[0] - (width / 2) - Math.abs(this.cameraPos.x)) * Math.sign(this.cameraPos.x);
        }

        if ((height / 2) + Math.abs(this.cameraPos.y) + (lerp.y * Math.sign(this.cameraPos.y)) > cameraConstraints[1]) {
            lerp.y = (cameraConstraints[1] - (height / 2) - Math.abs(this.cameraPos.y)) * Math.sign(this.cameraPos.y);
        }

        this.ctx.translate(-lerp.x, -lerp.y);
        this.cameraPos.add(lerp);
    }

    resetCamera() {
        this.ctx.translate(this.cameraPos.x, this.cameraPos.y);
        (<any>this.cameraPos).zero();
    }
}
