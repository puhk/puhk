import { Event } from 'state/event';
import pack from 'state/event/pack';

export default function toMessage(event: Event) {
    return {
        type: 'event',
        event: pack(event)
    };
}
