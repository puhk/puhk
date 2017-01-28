// @flow

import Event from '../Event';
import Stadium from '../../entities/Stadium';

import type State from '../State';
import type Game from '../../Game';
import type {JsonStadium} from '../../entities/Stadium';

export default class ChangeStadium extends Event {
    data: EventData;
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

        game.eventAggregator.publish(this);
    }

    getData(): JsonEventData {
        return {stadium: this.data.stadium.pack()};
    }

    static parse(sender, data: JsonEventData) {
        let stadium = Stadium.parse(data.stadium);
        return new ChangeStadium(sender, {stadium});
    }
}

type EventData = {
    stadium: Stadium
};

type JsonEventData = {
    stadium: JsonStadium
};
