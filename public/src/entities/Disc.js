import Base from './Base';

export default class Disc extends Base {
	bounce = 0.5;
	damping = 0.96;
	radius = 10;
	kickStrength = 5;

	constructor(position, radius, {color = '#fff', damping = 0.96, mass = 1} = {}) {
		super(position);
		this.radius = radius;
		this.color = color;
		this.damping = damping;
		this.mass = mass;
	}

	get invMass() {
		return 1 / this.mass;
	}

	clone() {
		let clone = new Disc(this.position.clone(), this.radius, {
			color: this.color,
			damping: this.damping,
			mass: this.mass
		});

		clone.velocity = this.velocity.clone();

		return clone;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#000';
		ctx.fill();
		ctx.stroke();

		if (this.isMe) {
			ctx.beginPath();
			ctx.arc(this.position.x, this.position.y, this.radius + 5, 0, 2 * Math.PI);
			ctx.lineWidth = 3;
			ctx.strokeStyle = '#fff';
			ctx.stroke();
		}
	}
}
