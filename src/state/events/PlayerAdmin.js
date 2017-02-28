// @flow

import Event from '../Event';

import type State from '../State';
import type Game from '../../Game';

export default class PlayerAdmin extends Event {
    data: EventData;
    type = 'PlayerAdmin';

    constructor(sender: number, data: EventData) {
        super(sender);
        this.data = data;
    }

    apply(state: State, game: Game) {
        if (this.data.player === -1) {
            throw new Error('Cant change admin of host');
        }

        let player = state.getPlayerById(this.data.player);

        if (!player) {
            throw new Error(`Invalid player ${this.data.player}`);
        }

        player.admin = this.data.isAdmin;

        game.eventAggregator.publish(this);
    }

    static parse(sender, data: EventData) {
        return new PlayerAdmin(sender, data);
    }
}

type EventData = {
    player: number,
    isAdmin: boolean
};
