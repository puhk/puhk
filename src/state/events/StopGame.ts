import { Event } from '../Event';
import State from '../State';
import { Disc } from 'entities';

export default class StopGame implements Event {
    public constructor(public frame: number, public sender?: number) { }

    public apply(state: State) {
        if (!state.playing) {
            return;
        }

        state.players.map(state.getPlayerDisc)
            .filter(disc => disc instanceof Disc)
            .forEach(state.removeDisc);

        state.playing = false;
    }
}
