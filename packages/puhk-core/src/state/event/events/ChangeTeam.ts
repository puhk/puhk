import update from 'immutability-helper';
import { Event } from '..';
import State from '../../State';
import { getPlayerById, getPlayerDisc, createPlayerDisc } from '../../funcs/player';

export interface EventData {
	clientId: number;
	team: string | null;
}

export default class ChangeTeam implements Event {
	public constructor(public frame: number, public sender: number, public data: EventData) {}

	public apply(state: State) {
		const player = getPlayerById(state, this.data.clientId);

		if (!player || player.team === this.data.team) {
			return state;
		}

		if (this.data.team !== null && !state.stadium.getTeam(this.data.team)) {
			return state;
		}

		const index = state.players.indexOf(player);
		let newState = update(state, {
			players: {
				[index]: {
					team: { $set: this.data.team },
				},
			},
		});

		const currentDisc = getPlayerDisc(state, player);

		if (currentDisc) {
			newState = update(newState, {
				discs: { $splice: [[newState.discs.indexOf(currentDisc), 1]] },
				players: {
					[index]: {
						discId: { $set: null },
					},
				},
			});
		}

		if (state.playing && this.data.team !== null) {
			const disc = createPlayerDisc(state, getPlayerById(newState, this.data.clientId)!);

			if (disc) {
				newState = update(newState, {
					discs: { $push: [disc] },
					players: {
						[index]: {
							discId: { $set: disc.id },
						},
					},
				});
			}
		}

		return newState;
	}
}
