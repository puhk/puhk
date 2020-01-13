import update from 'immutability-helper';
import { Event } from '..';
import State from '../../State';
import ChatMessage from '../../../entities/ChatMessage';

export interface EventData {
	message: string;
}

export default class PlayerChat implements Event {
	public constructor(public frame: number, public sender: number, public data: EventData) {}

	public apply(state: State) {
		const message = new ChatMessage(this.sender, this.data.message);

		return update(state, {
			chatMessages: { $push: [message] },
		});
	}
}
