import update from 'immutability-helper';
import { Event } from '..';
import State, { initScores } from '../../State';
import Stadium, { JsonStadium } from '../../../entities/Stadium';

export interface EventData {
	stadium: Stadium;
}

export interface JsonEvent {
	frame: number;
	sender: number;
	data: {
		stadium: JsonStadium;
	};
}

export default class ChangeStadium implements Event {
	public constructor(public frame: number, public sender: number, public data: EventData) {}

	public apply(state: State) {
		if (state.playing) {
			throw new Error('Cant change stadium while game playing');
		}

		const { stadium } = this.data;
		const newState = update(state, {
			$merge: {
				stadium,
				discs: stadium.discs,
			},
		});

		return initScores(newState);
	}

	static parse(event: JsonEvent) {
		const stadium = Stadium.parse(event.data.stadium);
		return new ChangeStadium(event.frame, event.sender, { stadium });
	}
}
