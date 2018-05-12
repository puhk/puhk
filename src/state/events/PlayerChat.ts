import ChatMessage from '../../entities/ChatMessage';
import { Event } from '../Event';
import State from '../State';

export interface EventData {
    message: string;
}

export interface ApplyResult {
    message: ChatMessage;
}

export default class PlayerChat implements Event {
    public constructor(public frame: number, public sender: number, public data: EventData) { }

    public apply(state: State): ApplyResult {
        const message = new ChatMessage(this.sender, this.data.message);
        state.addChatMessage(message);

        return { message };
    }
}
