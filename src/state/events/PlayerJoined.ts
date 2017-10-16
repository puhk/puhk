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

    constructor(frame: number, sender: number, data: EventData) {
        super(frame, sender);
        this.data = data;
    }

    apply(state: State) {
        this.player = new Player(this.data.clientId, this.data.name);
        this.player.setAvatar(this.data.avatar);

        state.addPlayers(this.player);
    }

    static parse(frame: number, sender: number, data: EventData) {
        return new PlayerJoined(frame, sender, data);
    }
}
