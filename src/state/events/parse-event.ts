import * as Events from '.';
import Event, { JsonEvent } from '../Event';

export default function parseEvent(event: JsonEvent): Event {
    return Events[event.eventType].parse(event.frame, event.sender, event.data);
};
