import _ from 'lodash';
import Vec from 'maxkueng/victor';
import Disc from './entities/Disc';

export default class Engine {
	prevBallPositions = {};

	constructor(game) {
		this.game = game;
	}

	run(state, events) {
		this.state = state;
		this.applyEvents(events);
		this.update();
		this.state = null;
	}

	applyEvents(events) {
		events.forEach(event => event.apply(this.state, this.game));
	}

	update() {
		let normalAccel = 0.1;
		let kickingAccel = 0.07;

		this.state.discs.forEach((disc, i) => {
			let player = _.find(this.state.players, {discId: disc.id});

	        if (player) {
				disc.kicking = player.keys.kick;

				let accel = disc.kicking ? kickingAccel : normalAccel;
				let move = new Vec(0, 0);

				if (player.keys.left) {
	    			move.x -= 1;
	    		}

	    		if (player.keys.right) {
	    			move.x += 1;
	    		}

	    		if (player.keys.up) {
	    			move.y -= 1;
	    		}

	    		if (player.keys.down) {
	    			move.y += 1;
	    		}

				if (move.x != 0 || move.y != 0) {
					disc.velocity.add(move.normalize().multiplyScalar(accel));
				}
			}

	        disc.position.add(disc.velocity);
			disc.velocity.multiplyScalar(disc.damping);
		});

		this.state.discs.sort((a, b) => {
			return a.isBall ? 1 : -1;
		});

		this.state.discs.forEach((disc, i1) => {
			this.state.discs.forEach((disc2, i2) => {
				if (disc2 == disc || i1 >= i2) {
					return;
				}

				this.handleCircleCollision(disc, disc2);
			});

			this.state.stadium.segments.forEach(segment => {
				if (_.find(this.state.players, {discId: disc.id})) {
					return;
				}

				this.handleSegmentCollision(disc, segment);
			});

			if (disc.isBall) {
				this.state.stadium.goals.forEach(goal => {
					if (this.checkGoal(disc, goal)) {
						this.game.goalScored(goal, this.state);
					}
				});

				this.prevBallPositions[disc.id] = disc.position.clone();
			}
		});
	}

	handleCircleCollision(disc, disc2) {
		let distSq = disc.position.distanceSq(disc2.position);

		if (disc2.isBall && disc.position.distance(disc2.position) <= disc.radius + disc2.radius + 4) {
			let player = _.find(this.state.players, {discId: disc.id});

			if (player && player.keys.kick) {
				this.kick(disc, disc2);
				player.keys.kick = false;
				disc.kicking = false;
			}
		}

		if (distSq <= Math.pow(disc.radius + disc2.radius, 2)) {
			this.collideCircles(disc, disc2);
		}
	}

	collideCircles(disc, disc2) {
		let diff = disc.position.clone().subtract(disc2.position);
		let direction = diff.clone().normalize();
		let totalMass = disc.mass + disc2.mass;

		// reposition
		let total = disc.invMass + disc2.invMass;
		let overlap = disc.radius + disc2.radius - diff.length();
		let amount = overlap * (disc.invMass / total);

		disc.position.add(direction.clone().multiplyScalar(amount));
		disc2.position.subtract(direction.clone().multiplyScalar(overlap - amount));

		// bounce?
		let speedDiff = disc.velocity.clone().subtract(disc2.velocity);
		let dot = direction.dot(speedDiff);

		if (dot < 0) {
			let totalBounce = disc.bounce * disc2.bounce;
			let bounceDir = direction.clone().multiplyScalar(dot * (totalBounce + 1));

			let bounce1 = bounceDir.clone().multiplyScalar(disc.invMass / total);
			let bounce2 = bounceDir.clone().multiplyScalar(disc2.invMass / total);

			disc.velocity.subtract(bounce1);
			disc2.velocity.add(bounce2);
		}
	}

	kick(disc, ball) {
		let direction = ball.position.clone()
			.subtract(disc.position)
			.normalize();

		let force = direction.multiplyScalar(disc.kickStrength * ball.invMass);
		ball.velocity.add(force);
	}

	discDistanceToSegment(disc, segment) {
		let seg = segment.p1.clone().subtract(segment.p0);
		let line = disc.position.clone().subtract(segment.p0);

		if (line.dot(seg) < 0) {
			return false;
		}

		if (line.dot(seg) > 0) {
			line = disc.position.clone().subtract(segment.p1);
		}

		if (line.dot(seg) >= 0) {
			return false;
		}

		let direction = seg.clone().normalize();
		let normal = new Vec(-direction.y, direction.x);

		return [normal.dot(line), normal];
	}

	handleSegmentCollision(disc, segment) {
		let result = this.discDistanceToSegment(disc, segment);

		if (result === false) {
			return;
		}

		let [dist, normal] = result;

		// otherside
		if (dist < 0) {
			dist *= -1;
			normal.invert();
		}

		if (dist >= disc.radius) {
			return;
		}

		let sep = normal.clone().multiplyScalar(disc.radius - dist);
		disc.position.add(sep);

		let movement = normal.dot(disc.velocity);

		if (movement < 0) {
			let bounceFactor = movement * (disc.bounce * segment.bounce + 1);
			let bounce = normal.clone().multiplyScalar(bounceFactor);

			disc.velocity.subtract(bounce);
		}
	}

	checkGoal(ball, goal) {
		if (!this.prevBallPositions[ball.id]) {
			return false;
		}

		let distBall = this.discDistanceToSegment(ball, goal);
		let prevPos = this.prevBallPositions[ball.id];
		let prevDist = this.discDistanceToSegment(new Disc(prevPos), goal);

		if (distBall === false || prevDist === false) {
			return;
		}

		return (prevDist[0] > 0 && distBall[0] < 0) || (prevDist[0] < 0 && distBall[0] > 0);
	}
}
