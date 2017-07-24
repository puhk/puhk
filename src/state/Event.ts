import State from './State';
import { EventMsg } from '../network/NetworkInterface';

export interface JsonEvent {
    eventType: string,
    frame: number,
    sender: number,
    data: any
}

export default abstract class Event {
    data: any = null;
    sender: number;
    type: string;
    frame: number;

    constructor(sender?: number) {
        this.sender = sender;
    }

    abstract apply(state: State): void;

    pack(): JsonEvent {
        return {
            eventType: this.type,
            frame: this.frame,
            sender: this.sender,
            data: this.getData()
        };
    }

    getData() {
        return this.data;
    }

    toMessage(): EventMsg {
        return {
            type: 'event',
            event: this.pack()
        };
    }
}
