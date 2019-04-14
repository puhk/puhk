import { AbstractP2PNetwork, Config } from './AbstractP2PNetwork';
import { NetworkInterface, Message, MessageType } from '../NetworkInterface';
import { PlayerInfo } from '../../controller/NetworkController';

declare const Peer: any;

export enum States {
    Unconnected = 0,
    Connecting = 1,
    Connected = 2
}

export default class NetworkClient extends AbstractP2PNetwork implements NetworkInterface {
    private hostConn: any;
    private state = States.Unconnected;
    private static CONNECT_TIMEOUT = 10000;

    public constructor({ host, path }: Config) {
        super();
        const ident = Math.random().toString(36).substring(7);
        this.peer = new Peer(ident, { host, path });
    }

    public connectTo(host: string, player: PlayerInfo): Promise<void> {
        this.state = States.Connecting;
        this.hostConn = this.peer.connect(host, { metadata: player });

        return new Promise((resolve, reject) => {
            const fail = () => {
                cancelTimeout();
                this.state = States.Unconnected;
                reject();
            };

            let timeout: number | null = window.setTimeout(fail, NetworkClient.CONNECT_TIMEOUT);

            const cancelTimeout = () => {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
            };

            this.hostConn.on('open', () => {
                this.hostConn.on('data', (msg: Message) => {
                    if (msg.type === MessageType.Init && timeout) {
                        cancelTimeout();
                        this.state = States.Connected;
                        resolve();
                    }

                    this.emit(`host:msg:${msg.type}`, msg);
                });
            });

            this.hostConn.on('close', () => {
                fail();
                this.emit('host:disconnect');
            });

            this.hostConn.on('error', () => {
                fail();
                this.emit('host:error');
            });
        });
    }

    public send(msg: Message) {
        this.hostConn.send(msg);
    }
}
