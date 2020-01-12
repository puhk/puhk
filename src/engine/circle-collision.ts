import update from 'immutability-helper';
import Vec from 'victor';
import { curry } from 'lodash/fp';

import Disc from '../entities/Disc';
import State from '../state/State';
import { getPlayerFromDisc } from '../state/funcs/player';
import { Keys } from '../Keyboard';

export default curry((disc: Disc, state: State, disc2: Disc) => {
	const distSq = disc.position.distanceSq(disc2.position);

	if (disc2.isBall && disc.position.distance(disc2.position) <= disc.radius + disc2.radius + 4) {
		const player = getPlayerFromDisc(state, disc);

		if (player && player.keys[Keys.kick]) {
			const kickForce = kick(disc, disc2);

			state = update(state, {
				discs: {
					[state.discs.indexOf(disc)]: {
						borderFlash: { $set: false },
					},
					[state.discs.indexOf(disc2)]: {
						velocity: (vel: Vec) => vel.clone().add(kickForce),
					},
				},
				players: {
					[state.players.indexOf(player)]: {
						keys: {
							[Keys.kick]: { $set: false },
						},
					},
				},
			});
		}
	}

	if (distSq > Math.pow(disc.radius + disc2.radius, 2)) {
		return state;
	}

	return collideCircles(state, disc, disc2);
});

function collideCircles(state: State, disc: Disc, disc2: Disc) {
	const diff = disc.position.clone().subtract(disc2.position);
	const direction = diff.clone().normalize();

	// reposition
	const total = disc.invMass + disc2.invMass;
	const overlap = disc.radius + disc2.radius - diff.length();
	const amount = overlap * (disc.invMass / total);

	const getIndex = (disc: Disc) => state.discs.findIndex(d => d.id === disc.id);

	state = update(state, {
		discs: {
			[getIndex(disc)]: {
				position: (pos: Vec) => pos.clone().add(direction.clone().multiplyScalar(amount)),
			},
			[getIndex(disc2)]: {
				position: (pos: Vec) => pos.clone().subtract(direction.clone().multiplyScalar(overlap - amount)),
			},
		},
	});

	// bounce?
	const speedDiff = disc.velocity.clone().subtract(disc2.velocity);
	const dotProduct = direction.dot(speedDiff);

	if (dotProduct >= 0) {
		return state;
	}

	const totalBounce = disc.bounce * disc2.bounce;
	const bounceDir = direction.clone().multiplyScalar(dotProduct * (totalBounce + 1));

	const bounce1 = bounceDir.clone().multiplyScalar(disc.invMass / total);
	const bounce2 = bounceDir.clone().multiplyScalar(disc2.invMass / total);

	return update(state, {
		discs: {
			[getIndex(disc)]: {
				velocity: (vel: Vec) => vel.clone().subtract(bounce1),
			},
			[getIndex(disc2)]: {
				velocity: (vel: Vec) => vel.clone().add(bounce2),
			},
		},
	});
}

function kick(disc: Disc, ball: Disc) {
	return ball.position
		.clone()
		.subtract(disc.position)
		.normalize()
		.multiplyScalar(disc.kickStrength * ball.invMass);
}
