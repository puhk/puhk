import mapValues from 'lodash/mapValues';
import { isPackable } from '@src/entities/Packable';
import { Event, JsonEvent } from '@src/state/event';

export default function pack(event: Event): JsonEvent {
    const mapper = (value: any) => isPackable(value) ? value.pack() : value;
    const data = mapValues(event.data, mapper);

    return {
        eventType: event.constructor.name,
        frame: event.frame,
        sender: event.sender,
        data
    };
}
