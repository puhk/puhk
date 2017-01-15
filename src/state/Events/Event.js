// @flow

import type State from '../State';
import type Game from '../../Game';
import type {eventMsg} from '../../network/Base';

export default class Event {
    sender: number;
    data: any;
    type: string;
    frame: number;

    constructor(sender: number, data?: any) {
        this.sender = sender;
        this.data = data;
    }

    apply(state: State, game: Game) {
        
    }

    getData(): any {
        return '';
    }

    pack(): JsonEvent {
        return {
            eventType: this.type,
            frame: this.frame,
            sender: this.sender,
            data: this.getData()
        };
    }

    toMessage(): eventMsg {
        return {
            type: 'event',
            event: this.pack()
        };
    }
}

export type JsonEvent = {
    eventType: string,
    frame: number,
    sender: number,
    data: any
};
