import Event from '../Event';
import State from '../State';
import Stadium, { JsonStadium } from '../../entities/Stadium';

export interface EventData {
    stadium: Stadium
}

export interface JsonEventData {
    stadium: JsonStadium
}

export default class ChangeStadium extends Event {
    data: EventData;
    stadium: Stadium;
    type = 'ChangeStadium';

    constructor(frame: number, sender: number, data: EventData) {
        super(frame, sender);
        this.data = data;
    }

    apply(state: State) {
        if (state.playing) {
            throw new Error('Cant change stadium while game playing');
        }

        state.stadium = this.data.stadium;
        state.discs = this.data.stadium.discs.map(disc => disc.clone());
        state.initScores();

        this.stadium = this.data.stadium;
    }

    getData(): JsonEventData {
        return { stadium: this.data.stadium.pack() };
    }

    static parse(frame: number, sender: number, data: JsonEventData) {
        let stadium = Stadium.parse(data.stadium);
        return new ChangeStadium(frame, sender, { stadium });
    }
}
