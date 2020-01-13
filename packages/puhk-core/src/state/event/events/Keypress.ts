import update from 'immutability-helper';
import { Event } from '..';
import State from '../../State';
import { getPlayerById } from '../../funcs/player';
import { Keys } from '../../../Keyboard';

export interface EventData {
	clientId: number;
	key: Keys;
	state: boolean;
}

export default class Keypress implements Event {
	public shouldPredict = true;

	public constructor(public frame: number, public sender: number, public data: EventData) {}

	public apply(state: State) {
		const player = getPlayerById(state, this.data.clientId);

		if (!player) {
			throw new Error();
		}

		return update(state, {
			players: {
				[state.players.indexOf(player)]: {
					keys: {
						[this.data.key]: { $set: this.data.state },
					},
				},
			},
		});
	}
}
