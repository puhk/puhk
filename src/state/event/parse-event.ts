import { JsonEvent, Event, EventClass } from '@src/state/event';
import * as Events from '@src/state/event/events';

interface CustomParseableEvent extends EventClass {
    parse(event: JsonEvent): Event;
}

export default function parseEvent(jsonEvent: JsonEvent): Event {
    const eventClass = <EventClass>(Events[jsonEvent.eventType]);

    if (hasCustomParse(eventClass)) {
        return eventClass.parse(jsonEvent);
    }

    return new eventClass(jsonEvent.frame, jsonEvent.sender, jsonEvent.data);
}

function hasCustomParse(eventClass: EventClass): eventClass is CustomParseableEvent {
    return eventClass.hasOwnProperty('parse');
}
