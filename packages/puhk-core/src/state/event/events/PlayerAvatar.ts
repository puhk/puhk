import update, { Spec } from 'immutability-helper';
import { Event } from '..';
import State from '../../State';
import { getPlayerById, getPlayerDisc } from '../../funcs/player';

export interface EventData {
	avatar: string;
}

export default class PlayerAvatar implements Event {
	public constructor(public frame: number, public sender: number, public data: EventData) {}

	public apply(state: State) {
		const player = getPlayerById(state, this.sender);

		if (!player) {
			throw new Error(`Can't set avatar for player ${this.sender}`);
		}

		const spec: Spec<typeof state> = {
			players: {
				[state.players.indexOf(player)]: {
					avatar: { $set: this.data.avatar },
				},
			},
		};

		const disc = getPlayerDisc(state, player);

		if (disc) {
			spec.discs = {
				[state.discs.indexOf(disc)]: {
					text: { $set: player.avatar },
				},
			};
		}

		return update(state, spec);
	}
}
