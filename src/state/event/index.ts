import State from '@src/state/State';
import * as Events from '@src/state/event/events';

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
