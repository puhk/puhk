// @flow

import Event from './Event';

import type State from '../State';
import type Game from '../../Game';

export default class Keypress extends Event {
    type = 'Keypress';

    apply(state: State, game: Game) {
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