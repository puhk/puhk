import { PlayerInfo } from '../../game-controllers/NetworkGameController'
import Player from '../../entities/Player';
import { Event } from '../Event';
import State from '../State';

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
