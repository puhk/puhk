// @flow

import Event from './Event';

import type State from '../State';
import type Game from '../../Game';
import type {keys} from '../../Keyboard';

export default class Keypress extends Event {
    data: EventData;
    type = 'Keypress';

    constructor(sender: number, data: EventData) {
        super(sender);
        this.data = data;
    }

    apply(state: State, game: Game) {
        let player = state.getPlayerById(this.data.clientId);

        if (!player) {
            throw new Error;
        }

        player.keys[this.data.key] = this.data.state;
    }

    static parse(sender, data: EventData) {
        return new Keypress(sender, data);
    }
}

type EventData = {
    clientId: number,
    key: $Keys<keys>,
    state: boolean
};
