import { Event } from '@src/state/event';
import State from '@src/state/State';
import Disc from '@src/entities/Disc';

const isDisc = (disc?: Disc): disc is Disc => disc instanceof Disc;

export default class StopGame implements Event {
    public constructor(public frame: number, public sender?: number) {}

    public apply(state: State) {
        if (!state.playing) {
            return;
        }

        state.players.map(state.getPlayerDisc)
            .filter(isDisc)
            .forEach(disc => state.removeDisc(disc));

        state.playing = false;
    }
}
