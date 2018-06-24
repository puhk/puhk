import { Event } from './index';
import pack from './pack';
import { EventMsg, MessageType } from '../../network/NetworkInterface';

export default function toMessage(event: Event): EventMsg {
    return {
        type: MessageType.Event,
        event: pack(event)
    };
}
