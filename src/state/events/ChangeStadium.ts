import Event from '../Event';
import State from '../State';
import Game from 'src/Game';
import Stadium, { JsonStadium } from 'src/entities/Stadium';

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

    constructor(sender: number, data: EventData) {
        super(sender);
        this.data = data;
    }

    apply(state: State, game: Game) {
        if (state.playing) {
            throw new Error('Cant change stadium while game playing');
        }

        state.stadium = this.data.stadium;
        state.discs = this.data.stadium.discs.map(disc => disc.clone());
        state.initScores();

        this.stadium = this.data.stadium;
        game.eventAggregator.publish(this);
    }

    getData(): JsonEventData {
        return { stadium: this.data.stadium.pack() };
    }

    static parse(sender: number, data: JsonEventData) {
        let stadium = Stadium.parse(data.stadium);
        return new ChangeStadium(sender, { stadium });
    }
}
