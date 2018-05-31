import { Event } from 'state/event';
import State from 'state/State';
import { Disc } from 'entities';

const isDisc = (disc?: Disc): disc is Disc => disc instanceof Disc;

export default class StopGame implements Event {
    public constructor(public frame: number, public sender?: number) {}

    public apply(state: State) {
        if (!state.playing) {
            return;
        }

        state.players.map(state.getPlayerDisc)
            .filter(isDisc)
            .forEach(state.removeDisc);

        state.playing = false;
    }
}
