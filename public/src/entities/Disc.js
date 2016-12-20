import Vec from 'maxkueng/victor';
import Base from './Base';

export default class Disc extends Base {
	id = 0;
	bounce = 0.5;
	kickStrength = 5;

	static nextDiscId = 0;

	constructor(position, radius = 10, {id = null, color = '#fff', damping = 0.96, invMass = 1} = {}) {
		super(position);

		this.id = id !== null ? id : Disc.nextDiscId++;
		this.velocity = new Vec(0, 0);
		this.radius = radius;
		this.color = color;
		this.damping = damping;
		this.invMass = invMass;
	}

	get mass() {
		return 1 / this.invMass;
	}

	clone() {
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

	pack() {
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

	static parse(obj) {
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

	draw(ctx) {
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
