import update from 'immutability-helper';
import Vec from 'victor';
import State from '../State';
import { getPlayerDisc } from './player';

export default (state: State) => {
	const newState = state.discs.reduce((state, disc, i) => {
		return !disc.isBall
			? state
			: update(state, {
					discs: {
						[i]: {
							$merge: {
								position: new Vec(0, 0),
								velocity: new Vec(0, 0),
							},
						},
					},
			  });
	}, state);

	return state.players.reduce((state, player) => {
		if (!player.team) {
			return state;
		}

		const disc = getPlayerDisc(state, player);
		const team = state.stadium.getTeam(player.team);

		if (!disc || !team) {
			return state;
		}

		return update(state, {
			discs: {
				[state.discs.indexOf(disc)]: {
					$merge: {
						position: Vec.fromArray(team.kickOffPos),
						velocity: new Vec(0, 0),
					},
				},
			},
		});
	}, newState);
};
