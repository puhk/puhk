import { Event } from '..';
import State from '../../State';

export interface EventData {
    avatar: string;
}

export default class PlayerAvatar implements Event {
    public constructor(public frame: number, public sender: number, public data: EventData) { }

    public apply(state: State) {
        const player = state.getPlayerById(this.sender);

        if (!player) {
            throw new Error(`Can't set avatar for player ${this.sender}`);
        }

        player.setAvatar(this.data.avatar);
        const disc = state.getPlayerDisc(player);

        if (disc) {
            disc.text = player.avatar;
        }
    }
}
