import { Event } from '@src/state/event';
import State from '@src/state/State';
import { PlayerInfo } from '@src/controller/NetworkController'
import Player from '@src/entities/Player';

export interface EventData extends PlayerInfo {
    clientId: number;
}

export default class PlayerJoined implements Event {
    public constructor(public frame: number, public sender: number, public data: EventData) {}

    public apply(state: State) {
        const player = new Player(this.data.clientId, this.data.name);
        player.setAvatar(this.data.avatar);

        state.addPlayers(player);
    }
}
