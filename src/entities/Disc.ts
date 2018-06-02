import Vec from 'victor';

export interface JsonDisc {
    id: number;
    pos: number[];
    velocity: number[];
    ball: boolean;
    color: string;
    damping: number;
    invMass: number;
    radius: number;
    text: string;
}

export default class Disc {
    public id: number;
    public bounce = 0.5;
    public kickStrength = 5;
    public kicking = false;
    public isMe = false;
    public isBall = false;
    public text = '';
    public velocity = new Vec(0, 0);

    public static nextDiscId = 0;

    public constructor(
        public position: Vec,
        public radius: number = 10,
        private color = '#fff',
        public damping  = 0.96,
        public invMass = 1,
        id?: number
    ) {
        this.id = typeof id !== 'undefined' ? id : Disc.nextDiscId++;
    }

    public get mass(): number {
        return 1 / this.invMass;
    }

    public clone(): Disc {
        const clone = new Disc(
            this.position.clone(),
            this.radius,
            this.color,
            this.damping,
            this.invMass,
            this.id
        );

        clone.velocity = this.velocity.clone();
        clone.isMe = this.isMe;
        clone.isBall = this.isBall;
        clone.text = this.text;

        return clone;
    }

    public pack(): JsonDisc {
        return {
            id: this.id,
            pos: this.position.toArray(),
            velocity: this.velocity.toArray(),
            radius: this.radius,
            color: this.color,
            damping: this.damping,
            invMass: this.invMass,
            ball: this.isBall,
            text: this.text
        };
    }

    public static parse(obj: JsonDisc): Disc {
        const disc = new Disc(
            Vec.fromArray(obj.pos),
            obj.radius,
            obj.color,
            obj.damping,
            obj.invMass,
            obj.id
        );

        if (obj.velocity) {
            disc.velocity = Vec.fromArray(obj.velocity);
        }

        disc.isBall = obj.ball;
        disc.text = obj.text;

        return disc;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        const { x, y } = this.position;

        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.kicking ? '#fff' : '#000';
        ctx.fill();
        ctx.closePath();
        ctx.stroke();

        if (this.isMe) {
            ctx.beginPath();
            ctx.arc(x, y, this.radius + 10, 0, 2 * Math.PI);
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.closePath();
            ctx.stroke();
        }

        if (this.text) {
            ctx.beginPath();
            ctx.fillStyle = '#fff';
            ctx.font = '16px \'Open Sans\'';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.text, x, y);
        }
    }
}
