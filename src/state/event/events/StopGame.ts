import { Event } from '..';
import State from '../../State';
import Disc from '../../../entities/Disc';

const isDisc = (disc?: Disc): disc is Disc => disc instanceof Disc;

export default class StopGame implements Event {
    public constructor(public frame: number, public sender?: number) {}

    public apply(state: State) {
        if (!state.playing) {
            return;
        }

        state.players.map(player => state.getPlayerDisc(player))
            .filter(isDisc)
            .forEach(disc => state.removeDisc(disc));

        state.playing = false;
    }
}
