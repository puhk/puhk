// @flow

import Event from '../Event';

import type State from '../State';
import type Game from '../../Game';

export default class ChangeRoomName extends Event {
    data: EventData;
    type = 'ChangeRoomName';

    constructor(sender: number, data: EventData) {
        super(sender);
        this.data = data;
    }

    apply(state: State, game: Game) {
        state.roomName = this.data.name;
        game.eventAggregator.publish(this);
    }

    static parse(sender, data: EventData) {
        return new ChangeRoomName(sender, data);
    }
}

type EventData = {
    name: string
};
