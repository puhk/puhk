import State from '@src/state/State';

export interface JsonEvent {
    eventType: string;
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
