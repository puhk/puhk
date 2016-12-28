// @flow

import Vec from 'victor';
import Base from './Base';

type opts = {
    id?: number,
    color?: string,
    damping?: number,
    invMass?: number
};

export default class Disc extends Base {
    id = 0;
    bounce = 0.5;
    color: string;
    damping = 0.96;
    kickStrength = 5;
    kicking = false;
    invMass = 0.5;
    isMe = false;
    isBall = false;
    radius: number;
    velocity: Vec;

    static nextDiscId = 0;

    constructor(position: Vec, radius: number = 10, {id = -1, color = '#fff', damping = 0.96, invMass = 1}: opts = {}) {
        super(position);

        this.id = id !== -1 ? id : Disc.nextDiscId++;
        this.velocity = new Vec(0, 0);
        this.radius = radius;
        this.color = color;
        this.damping = damping;
        this.invMass = invMass;
    }

    get mass(): number {
        return 1 / this.invMass;
    }

    clone(): Disc {
        let clone = new Disc(this.position.clone(), this.radius, {
            id: this.id,
            color: this.color,
            damping: this.damping,
            invMass: this.invMass
        });

        clone.id = this.id;
        clone.velocity = this.velocity.clone();
        clone.isMe = this.isMe;
        clone.isBall = this.isBall;

        return clone;
    }

    pack(): JsonDisc {
        return {
            id: this.id,
            pos: this.position.toArray(),
            velocity: this.velocity.toArray(),
            radius: this.radius,
            color: this.color,
            damping: this.damping,
            invMass: this.invMass,
            ball: this.isBall
        };
    }

    static parse(obj): Disc {
        let disc = new Disc(Vec.fromArray(obj.pos), obj.radius, {
            id: obj.id,
            color: obj.color,
            damping: obj.damping,
            invMass: obj.invMass
        });

        if (obj.velocity) {
            disc.velocity = Vec.fromArray(obj.velocity);
        }

        disc.isBall = obj.ball;

        return disc;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.kicking ? '#fff' : '#000';
        ctx.fill();
        ctx.closePath();
        ctx.stroke();

        if (this.isMe) {
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.radius + 10, 0, 2 * Math.PI);
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.closePath();
            ctx.stroke();
        }
    }
}

export type JsonDisc = {
    pos: {
        x: number,
        y: number
    },
    ball: ?boolean,
    color: string,
    damping: number,
    invMass: number,
    radius: number
};