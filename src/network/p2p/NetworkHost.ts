import { autobind } from 'core-decorators';
import { AbstractP2PNetwork, Config } from './AbstractP2PNetwork';
import { NetworkInterface, Message } from '../NetworkInterface';

interface Client {
    id: number;
    conn: any;
}

declare const Peer: any;

const OPEN_TIMEOUT = 10000;

export default class NetworkHost extends AbstractP2PNetwork implements NetworkInterface {
    private clients: Client[] = [];
    private nextClientId = 0;
    public ready: Promise<void>;

    public constructor({ host, path }: Config) {
        super();
        this.peer = new Peer('host', { host, path });
        this.peer.on('connection', this.handleConnection);

        this.ready = new Promise((resolve, reject) => {
            const openTimeout = setTimeout(() => reject(), OPEN_TIMEOUT);

            this.peer.on('open', () => {
                clearTimeout(openTimeout);
                resolve();
            });
        });
    }

    @autobind
    private handleConnection(conn: any) {
        const id = this.nextClientId++;

        conn.on('open', () => {
            this.clients.push({ id, conn });

            this.emit('client:joined', {
                player: conn.metadata,
                id
            });
        });

        conn.on('data', (msg: Message) => {
            this.emit(`client:msg:${msg.type}`, id, msg);
        });
    }

    public send(msg: Message) {
        this.broadcast(msg);
    }

    public broadcast(msg: Message, excludeClient?: number) {
        for (const client of this.clients) {
            if (typeof excludeClient === 'undefined' || client.id !== excludeClient) {
                client.conn.send(msg);
            }
        }
    }

    public sendToClient(id: number, msg: Message) {
        const client = this.clients.find(client => client.id == id);

        if (client) {
            client.conn.send(msg);
        }
    }
}
