import Game from '../../Game';
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

    constructor(sender: number, data: EventData) {
        super(sender);
        this.data = data;
    }

    apply(state: State, game: Game) {
        this.message = new ChatMessage(this.sender, this.data.message);
        state.addChatMessage(this.message);

        game.getEventApi().publish(this);
    }

    static parse(sender: number, data: EventData) {
        return new PlayerChat(sender, data);
    }
}
