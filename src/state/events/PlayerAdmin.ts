import Event from '../Event';
import State from '../State';

export interface EventData {
    player: number,
    isAdmin: boolean
}

export default class PlayerAdmin extends Event {
    data: EventData;
    type = 'PlayerAdmin';

    constructor(frame: number, sender: number, data: EventData) {
        super(frame, sender);
        this.data = data;
    }

    apply(state: State) {
        if (this.data.player === -1) {
            throw new Error('Cant change admin of host');
        }

        let player = state.getPlayerById(this.data.player);

        if (!player) {
            throw new Error(`Invalid player ${this.data.player}`);
        }

        player.admin = this.data.isAdmin;
    }

    static parse(frame: number, sender: number, data: EventData) {
        return new PlayerAdmin(frame, sender, data);
    }
}
