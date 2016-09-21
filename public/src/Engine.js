import _ from 'lodash';
import Vec from 'maxkueng/victor';

export default class Engine {
	constructor(game) {
		this.game = game;
	}

	run(state, events) {
		this.applyEvents(state, events);
		this.update(state);
	}

	applyEvents(state, events) {
		events.forEach(event => event.apply(state, this.game));
	}

	update(state) {
		let accel = 0.1;

		state.discs.forEach((disc, i) => {
	        if (typeof disc.playerId !== 'undefined') {
				let keys = _.find(state.players, {clientId: disc.playerId}).keys;

				if (keys.left) {
	    			disc.velocity.x -= accel;
	    		}

	    		if (keys.right) {
	    			disc.velocity.x += accel;
	    		}

	    		if (keys.up) {
	    			disc.velocity.y -= accel;
	    		}

	    		if (keys.down) {
	    			disc.velocity.y += accel;
	    		}
			}

	        disc.position.add(disc.velocity);
			disc.velocity.multiply(new Vec(disc.damping, disc.damping));
		});

		state.discs.forEach((disc, i1) => {
			state.discs.forEach((disc2, i2) => {
				if (disc2 == disc || i1 >= i2) {
					return;
				}

				let distSq = disc.position.distanceSq(disc2.position);

				if (distSq <= Math.pow(disc.radius + disc2.radius, 2)) {
					this.collide(disc, disc2, distSq);
				}

				if (disc.position.distance(disc2.position) <= disc.radius + disc2.radius + 5 && disc.playerId) {
					let keys = _.find(state.players, {clientId: disc.playerId}).keys;

					if (keys.kick) {
						this.kick(disc, disc2);
						keys.kick = false;
					}
				}
			});
		});
	}

	collide(disc, disc2, distSq) {
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
		let massRatio = disc.invMass / (disc.invMass + disc2.invMass);
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
	}

	kick(disc, disc2) {
		let normal = disc.position.clone().subtract(disc2.position).normalize();
		disc2.velocity.add(new Vec(normal.x * -disc.kickStrength, normal.y * -disc.kickStrength));
	}
}
