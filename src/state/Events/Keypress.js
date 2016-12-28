// @flow

import Event from './Event';
import State from '../State';

export default class Keypress extends Event {
    type = 'Keypress';

    apply(state: State) {
        let player = state.players.find(player => player.clientId == this.data.clientId);

        if (!player) {
            throw new Error;
        }

        player.keys[this.data.key] = this.data.state;
    }

    getData() {
        return this.data;
    }

    static parse(sender, data) {
        return new Keypress(sender, data);
    }
}