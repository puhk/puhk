// @flow

import Event from '../Event';
import ChatMessage from '../../entities/ChatMessage';

import type State from '../State';
import type Game from '../../Game';

export default class PlayerChat extends Event {
    data: EventData;
    message: ?ChatMessage;
    type = 'PlayerChat';

    constructor(sender: number, data: EventData) {
        super(sender);
        this.data = data;
    }

    apply(state: State, game: Game) {
        this.message = new ChatMessage(this.sender, this.data.message);
        state.addChatMessage(this.message);

        game.eventAggregator.publish(this);
    }

    static parse(sender, data: EventData) {
        return new PlayerChat(sender, data);
    }
}

type EventData = {
    message: string
};
