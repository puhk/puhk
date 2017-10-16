import Event from '../Event';
import State from '../State';

export interface EventData {
    avatar: string
}

export default class PlayerAvatar extends Event {
    data: EventData;
    type = 'PlayerAvatar';

    constructor(frame: number, sender: number, data: EventData) {
        super(frame, sender);
        this.data = data;
    }

    apply(state: State) {
        let player = state.getPlayerById(this.sender);

        if (!player) {
            throw new Error(`Can't set avatar for player ${this.sender}`);
        }

        player.setAvatar(this.data.avatar);
        let disc = state.getPlayerDisc(player);

        if (disc) {
            disc.text = player.avatar;
        }
    }

    static parse(frame: number, sender: number, data: EventData) {
        return new PlayerAvatar(frame, sender, data);
    }
}
