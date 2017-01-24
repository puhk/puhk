// @flow

import Event from './Event';
import ChatMessage from '../../entities/ChatMessage';

import type State from '../State';
import type Game from '../../Game';

export default class PlayerChat extends Event {
    data: data;
    message: ?ChatMessage;
    type = 'PlayerChat';

    apply(state: State, game: Game) {
        this.message = new ChatMessage(this.sender, this.data.message);
        state.addChatMessage(this.message);

        game.eventAggregator.publish(this);
    }

    getData() {
        return this.data;
    }

    static parse(sender, data) {
        return new PlayerChat(sender, data);
    }
}

type data = {
    message: string
};
