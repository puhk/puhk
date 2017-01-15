// @flow

import Event from './Event';

import type State from '../State';
import type Game from '../../Game';
import type Player from '../../entities/Player';

export default class PlayerJoined extends Event {
    type = 'PlayerJoined';
    player: Player;

    apply(state: State, game: Game) {
        this.player = game.createPlayer(this.data.clientId, this.data.nick);
        state.addPlayers(this.player);

        game.eventAggregator.publish(this);
    }

    getData() {
        return this.data;
    }

    static parse(sender, data) {
        return new PlayerJoined(sender, data);
    }
}
