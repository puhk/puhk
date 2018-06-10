import mapValues from 'lodash/mapValues';
import { isPackable } from '@src/entities/Packable';
import { Event, EventNames, JsonEvent } from '@src/state/event';

const mapper = (value: any) => isPackable(value) ? value.pack() : value;

export default function pack(event: Event): JsonEvent {
    const data = mapValues(event.data, mapper);

    return {
        eventType: <EventNames>(event.constructor.name),
        frame: event.frame,
        sender: event.sender,
        data
    };
}
