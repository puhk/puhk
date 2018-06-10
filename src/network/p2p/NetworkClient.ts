import { Message } from '@src/network/NetworkInterface';
import NetworkClientInterface from '@src/network/NetworkClientInterface';
import { AbstractP2PNetwork, Config } from '@src/network/p2p/AbstractP2PNetwork';

declare const Peer: any;

export enum States {
    Unconnected = 0,
    Connecting = 1,
    Connected = 2
}

export default class NetworkClient extends AbstractP2PNetwork implements NetworkClientInterface {
    private hostConn: any;
    private state = States.Unconnected;
    private static CONNECT_TIMEOUT = 10000;

    public constructor({ host, path }: Config) {
        super();
        const ident = Math.random().toString(36).substring(7);
        this.peer = new Peer(ident, { host, path });
    }

    public connectTo(host: string): Promise<void> {
        this.state = States.Connecting;
        this.hostConn = this.peer.connect(host);

        this.hostConn.on('close', () => {
            this.emit('host:disconnect');
        });

        return new Promise((resolve, reject) => {
            let timeout: number | null = window.setTimeout(() => reject(), NetworkClient.CONNECT_TIMEOUT);

            this.hostConn.on('data', (msg: Message) => {
                if (timeout && this.state == States.Connecting) {
                    clearTimeout(timeout);
                    timeout = null;
                    resolve();
                }

                this.emit(`host:msg:${msg.type}`, msg);
            });
        });
    }

    public send(msg: Message) {
        this.hostConn.send(msg);
    }
}
