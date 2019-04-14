import Peer from 'peerjs';
import { EventEmitter } from 'eventemitter3';
import { NetworkInterface, Message } from '../NetworkInterface';

export interface Config {
    host: string;
    path: string;
}

export abstract class AbstractP2PNetwork extends EventEmitter implements NetworkInterface {
    protected peer!: Peer;

    public disconnect() {
        this.peer.destroy();
    }

    public isDisconnected() {
        return this.peer.destroyed;
    }

    public abstract send(msg: Message): void;
}
