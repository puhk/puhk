import Vec from 'victor';
import update from 'immutability-helper';
import flow from 'lodash/fp/flow';

import handleCircleCollision from './circle-collision';
import { handleDiscSegmentCollision } from './segment-collision';
import Disc from '../entities/Disc';
import Player from '../entities/Player';
import Stadium from '../entities/Stadium';
import State from '../state/State';
import { getPlayerFromDisc } from '../state/funcs/player';
import { Keys } from '../Keyboard';

const calculatePlayerMovementVector = (player: Player, stadium: Stadium) => {
	const accel = stadium.playerPhysics[player.keys[Keys.kick] ? 'kickingAcceleration' : 'acceleration'];
	const move = new Vec(
		+player.keys[Keys.right] - +player.keys[Keys.left],
		+player.keys[Keys.down] - +player.keys[Keys.up]
	);

	if (move.lengthSq() === 0) {
		return move;
	}

	return move.normalize().multiplyScalar(accel);
};

const moveDisc = (state: State, disc: Disc, discIndex: number): State => {
	const player = getPlayerFromDisc(state, disc);
	let velocity = disc.velocity;

	if (player) {
		const movement = calculatePlayerMovementVector(player, state.stadium);

		if (movement.lengthSq() > 0) {
			velocity = velocity.clone().add(movement);
		}

		state = update(state, {
			discs: {
				[discIndex]: {
					$merge: {
						borderFlash: player.keys[Keys.kick],
						velocity,
					},
				},
			},
		});
	}

	return update(state, {
		discs: {
			[discIndex]: {
				position: (pos: Vec) => pos.clone().add(velocity),
				velocity: (vel: Vec) => vel.clone().multiplyScalar(disc.damping),
			},
		},
	});
};

const applyDiscsMovement = (state: State): State => state.discs.reduce(moveDisc, state);

const collideDiscs = (state: State): State => {
	const orderedDiscs = [...state.discs].sort(a => (a.isBall ? 1 : -1));

	return orderedDiscs
		.map(disc => disc.id)
		.reduce((state, id, i1) => {
			const disc = orderedDiscs.find(disc => disc.id === id)!;
			const shouldCollide = (disc2: Disc, i2: number) => disc2 !== disc && i1 < i2;

			state = orderedDiscs.filter(shouldCollide).reduce(handleCircleCollision(disc), state);

			// quick hack until collision masks to prevent player/segment collision
			if (getPlayerFromDisc(state, disc)) {
				return state;
			}

			return state.stadium.segments.reduce(handleDiscSegmentCollision(disc), state);
		}, state);
};

const runPhysics = flow(applyDiscsMovement, collideDiscs);
export default runPhysics;
