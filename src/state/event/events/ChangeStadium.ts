import { Event } from '..';
import State from '../../State';
import Stadium, { JsonStadium } from '../../../entities/Stadium';

export interface EventData {
    stadium: Stadium;
}

export interface JsonEvent {
    frame: number;
    sender: number;
    data: {
        stadium: JsonStadium;
    };
}

export default class ChangeStadium implements Event {
    private stadium: Stadium;

    public constructor(public frame: number, public sender: number, public data: EventData) {}

    public apply(state: State) {
        if (state.playing) {
            throw new Error('Cant change stadium while game playing');
        }

        state.stadium = this.data.stadium;
        state.discs = this.data.stadium.discs.map(disc => disc.clone());
        state.initScores();

        this.stadium = this.data.stadium;
    }

    static parse(event: JsonEvent) {
        let stadium = Stadium.parse(event.data.stadium);
        return new String('ddsada');
    }
}
