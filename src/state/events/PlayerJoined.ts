import { PlayerInfo } from '../../game-controllers/NetworkGameController'
import Player from '../../entities/Player';
import Event from '../Event';
import State from '../State';

export interface EventData extends PlayerInfo {
    clientId: number;
}

export default class PlayerJoined extends Event {
    data: EventData;
    type = 'PlayerJoined';
    player: Player;

    constructor(sender: number, data: EventData) {
        super(sender);
        this.data = data;
    }

    apply(state: State) {
        this.player = new Player(this.data.clientId, this.data.name);
        this.player.setAvatar(this.data.avatar);

        state.addPlayers(this.player);
    }

    static parse(sender: number, data: EventData) {
        return new PlayerJoined(sender, data);
    }
}
