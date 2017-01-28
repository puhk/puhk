// @flow

import Event from '../Event';

import type State from '../State';
import type Game from '../../Game';
import type Player from '../../entities/Player';

export default class PlayerJoined extends Event {
    data: EventData;
    type = 'PlayerJoined';
    player: Player;

    constructor(sender: number, data: EventData) {
        super(sender);
        this.data = data;
    }

    apply(state: State, game: Game) {
        this.player = game.createPlayer(this.data.clientId, this.data.name);
        this.player.setAvatar(this.data.avatar);

        state.addPlayers(this.player);

        game.eventAggregator.publish(this);
    }

    static parse(sender, data: EventData) {
        return new PlayerJoined(sender, data);
    }
}

type EventData = {
    clientId: number,
    name: string,
    avatar: string
};
