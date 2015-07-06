import Vec from 'maxkueng/victor';

export default class Engine {
	constructor(world, keyboard) {
		this.world = world;
		this.keyboard = keyboard;
		
		this.canvas = this.createCanvas();
		this.ctx = this.canvas.getContext('2d');
	}
	
	createCanvas() {
		let canvas = document.createElement('canvas');
		canvas.width = this.world.width;
		canvas.height = this.world.height;
		
		document.body.appendChild(canvas);
		
		return canvas;
	}
	
	run() {
		let loop = () => {
			requestAnimationFrame(loop);
			
			this.update();
			this.draw();
		};
		
		requestAnimationFrame(loop);
	}
	
	update() {
		let accel = 0.1;
		
		this.world.discs.forEach(disc => {
			if (disc.isPlayer) {
				if (this.keyboard.isDown('left')) {
					disc.velocity.x -= accel;
				}
				
				if (this.keyboard.isDown('right')) {
					disc.velocity.x += accel;
				}
				
				if (this.keyboard.isDown('up')) {
					disc.velocity.y -= accel;
				}
				
				if (this.keyboard.isDown('down')) {
					disc.velocity.y += accel;
				}
			}
			
			disc.position.add(disc.velocity);
			disc.velocity.multiply(new Vec(disc.damping, disc.damping));
		});
		
		this.world.discs.forEach((disc, i1) => {
			this.world.discs.forEach((disc2, i2) => {
				if (disc2 == disc || i1 >= i2) {
					return;
				}
				
				let distSq = disc.position.distanceSq(disc2.position);
				
				if (distSq > Math.pow(disc.radius + disc2.radius, 2)) {
					return;
				}
				
				let diff = disc.position.clone().subtract(disc2.position);
				let loc18 = false;
				
				if (distSq < 1) {
					distSq = 1 / distSq;
					loc18 = true;
				}
				
				let distSqCopy = distSq;
				let factor;
				
				if (distSqCopy > 7) {
					if (distSqCopy < 32768) {
						if (distSqCopy < 128) {
							if (distSqCopy < 32) {
								distSqCopy = distSqCopy >> 2;
								
								if (distSqCopy < 4) {
									distSqCopy++;
								}
							}
							else {
								distSqCopy = distSqCopy >> 3;
							}
						}
						else if (distSqCopy < 2048) {
							if (distSqCopy < 512) {
								distSqCopy = distSqCopy >> 4;
							}
							else {
								distSqCopy = distSqCopy >> 5;
							}
						}
						else if (distSqCopy < 8096) {
							distSqCopy = distSqCopy >> 6;
						}
						else {
							distSqCopy = distSqCopy >> 7;
						}
					}
					else if (distSqCopy < 8388608) {
						if (distSqCopy < 524288) {
							if (distSqCopy < 131072) {
								distSqCopy = distSqCopy >> 8;
							}
							else {
								distSqCopy = distSqCopy >> 9;
							}
						}
						else if (distSqCopy < 2097152) {
							distSqCopy = distSqCopy >> 10;
						}
						else {
							distSqCopy = distSqCopy >> 11;
						}
					}
					else if (distSqCopy < 134217728) {
						if (distSqCopy < 33554432) {
							distSqCopy = distSqCopy >> 12;
						}
						else {
							distSqCopy = distSqCopy >> 13;
						}
					}
					else {
						distSqCopy = distSqCopy >> 14;
					}
					
					factor = (distSqCopy + distSq / distSqCopy) * 0.5;
				}
				else if (distSqCopy < 2) {
					factor = distSq * 0.5 + 0.5
				}
				else {
					factor = distSq * 0.25 + 0.1
				}
				
				factor = (factor + distSq / factor) * 0.5;
				factor = (factor + distSq / factor) * 0.5;
				factor = (factor + distSq / factor) * 0.5;
				
				if (loc18) {
				    factor = 1 / factor;
				}
				
				let normal = new Vec(diff.x / factor, diff.y / factor);
				let massRatio = disc.invMass() / (disc.invMass() + disc2.invMass());
				let radius = (disc.radius + disc2.radius) - factor; // loc17
				let massRadius = radius * massRatio; // loc19
				
				diff.x = normal.x * massRadius;
				diff.y = normal.y * massRadius;
				
				disc.position.add(diff);
				
				let test = radius - massRadius;
				
				diff.x = normal.x * test;
				diff.y = normal.y * test;
				
				disc2.position.subtract(diff);
				
				diff = disc.velocity.clone().subtract(disc2.velocity);
				
				let dotProduct = normal.dot(diff);
				
				if (dotProduct < 0) {
					let bounce = disc.bounce * disc2.bounce;
					dotProduct *= (bounce + 1); // loc21
					
					let dotRatio = dotProduct * massRatio; // loc24
					
					diff.x = normal.x * dotRatio;
					diff.y = normal.y * dotRatio;
					
					disc.velocity.subtract(new Vec(normal.x * dotRatio, normal.y * dotRatio));
					
					let loc25 = dotProduct - dotRatio;
					
					diff.x = normal.x * loc25;
					diff.y = normal.y * loc25;
					
					disc2.velocity.add(diff);
				}
				
				if (this.keyboard.isDown('kick')) {
					disc2.velocity.add(new Vec(6 * -normal.x, 6 * -normal.y));
				}
				
				/* ATTEMPT 1
				let dist = Math.sqrt(distSq);
				let nx = (disc2.position.x - disc.position.x) / dist;
				let ny = (disc2.position.y - disc.position.y) / dist;
				let p = 2 * (disc.velocity.x * nx + disc.velocity.y * ny - disc2.velocity.x * nx + disc2.velocity.y * ny) / (disc.mass + disc2.mass);
				
				disc.velocity.x -= p * disc.mass * nx;
				disc.velocity.y -= p * disc.mass * ny;
				disc.position.add(disc.velocity);
				
				disc2.velocity.x += p * disc2.mass * nx;
				disc2.velocity.y += p * disc2.mass * ny;
				disc2.position.add(disc2.velocity);*/
				
				/* ATTEMPT 2 */
				/*let dx = disc2.position.x - disc.position.x;
				let dy = disc2.position.y - disc.position.y;
				
				let normal = new Vec(dx, dy).norm();
				let tangent = new Vec(normal.y * -1, normal.x);
				
				let scalarN1 = normal.clone().dot(disc.velocity);
				let scalarN2 = normal.clone().dot(disc2.velocity);
				
				let scalarT1 = tangent.clone().dot(disc.velocity);
				let scalarT2 = tangent.clone().dot(disc2.velocity);
				
				let scalarNA1 = (scalarN1 * (disc.mass - disc2.mass) + 2 * disc2.mass * scalarN2) / (disc.mass + disc2.mass);
				let scalarNA2 = (scalarN2 * (disc2.mass - disc.mass) + 2 * disc.mass * scalarN1) / (disc.mass + disc2.mass);
				
				let scalarNAV1 = normal.clone().multiply(new Vec(scalarNA1, scalarNA1));
				let scalarNAV2 = normal.clone().multiply(new Vec(scalarNA2, scalarNA2));
				
				let scalarNV1 = tangent.clone().multiply(new Vec(scalarT1, scalarT1));
				let scalarNV2 = tangent.clone().multiply(new Vec(scalarT2, scalarT2));
				
				disc.velocity = scalarNV1.add(scalarNAV1);
				disc2.velocity = scalarNV2.add(scalarNAV2);
				
				disc.position.add(disc.velocity);
				disc2.position.add(disc2.velocity);*/
				
			});
		});
	}
	
	draw() {
		this.ctx.clearRect(0, 0, this.world.width, this.world.height);
		
		this.ctx.fillStyle = '#718c5a';
		this.ctx.fillRect(0, 0, this.world.width, this.world.height);
		
		this.world.discs.forEach(disc => {
			disc.draw(this.ctx);
		});
	}
}