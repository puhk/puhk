import * as Events from './events';
import State from '../State';

export type EventNames = keyof typeof Events;

export interface JsonEvent {
    eventType: EventNames;
    frame: number;
    sender?: number;
    data?: any;
}

export interface EventClass {
    new (frame: number, sender?: number, data?: any): Event;
}

export interface Event {
    frame: number;
    sender?: number;
    data?: any;
    apply(state: State): object | void;
    shouldPredict?: boolean;
}
