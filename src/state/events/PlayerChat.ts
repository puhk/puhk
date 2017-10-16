import ChatMessage from '../../entities/ChatMessage';
import Event from '../Event';
import State from '../State';

export interface EventData {
    message: string
}

export default class PlayerChat extends Event {
    data: EventData;
    message: ChatMessage;
    type = 'PlayerChat';

    constructor(frame: number, sender: number, data: EventData) {
        super(frame, sender);
        this.data = data;
    }

    apply(state: State) {
        this.message = new ChatMessage(this.sender, this.data.message);
        state.addChatMessage(this.message);
    }

    static parse(frame: number, sender: number, data: EventData) {
        return new PlayerChat(frame, sender, data);
    }
}
