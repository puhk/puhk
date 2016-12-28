// @flow

import Event from './Event';

import type State from '../State';
import type Game from '../../Game';

export default class ClientAdded extends Event {
    type = 'ClientAdded';

    apply(state: State, game: Game) {
        let player = game.createPlayer(this.data.clientId, this.data.nick, state.stadium.teams[1]);
        state.addPlayers(player);

        let disc = game.createPlayerDisc(player);

        if (!disc) {
            throw new Error;
        }
        
        player.discId = disc.id;
        state.addDisc(disc);
    }

    getData() {
        return this.data;
    }

    static parse(sender, data) {
        return new ClientAdded(sender, data);
    }
}