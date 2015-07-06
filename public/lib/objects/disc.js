import Base from './base';

export default class Disc extends Base {
	bounce = 0.5;
	damping = 0.96;
	radius = 10;
	
	constructor(position, radius, {color = '#fff', damping = 0.96, mass = 1} = {}) {
		super(position, radius);
		this.radius = radius;
		this.color = color;
		this.damping = damping;
		this.mass = mass;
	}
	
	invMass() {
		return 1 / this.mass;
	}
	
	draw(ctx) {
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
		
		ctx.fillStyle = this.color;
		ctx.fill();
		
		ctx.stroke();
		ctx.closePath();
	}
}