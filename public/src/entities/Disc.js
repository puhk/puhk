import Vec from 'maxkueng/victor';
import Base from './Base';

export default class Disc extends Base {
	id = 0;
	bounce = 0.5;
	kickStrength = 5;

	constructor(position, radius = 10, {color = '#fff', damping = 0.96, invMass = 1} = {}) {
		super(position);

		this.id = Math.random().toString(36).substring(7);
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
