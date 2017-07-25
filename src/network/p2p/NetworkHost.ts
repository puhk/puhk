import { autobind } from 'core-decorators';
import { AbstractP2PNetwork, Config } from './AbstractP2PNetwork';
import { NetworkInterface, Message } from '../NetworkInterface';

interface Client {
    id: number,
    conn: any
}

declare const Peer: any;

export default class NetworkHost extends AbstractP2PNetwork implements NetworkInterface {
    private clients: Client[] = [];
    private nextClientId = 0;
    public isOpen = false;

    public constructor({ host, path }: Config) {
        super();
        this.peer = new Peer('host', { host, path });
        this.peer.on('open', this.open);
        this.peer.on('connection', this.handleConnection);
    }

    @autobind
    public open() {
        this.isOpen = true;
        this.emit('open', true);
    }

    @autobind
    private handleConnection(conn: any) {
        const id = this.nextClientId++;

        conn.on('open', () => {
            const client = { id, conn };
            this.clients.push(client);
            this.emit('client:joined', id);
        });

        conn.on('data', (msg: Message) => {
            this.emit('client:msg', id, msg);
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

    public disconnect() {
        this.peer.destroy();
    }

    public isDisconnected() {
        return this.peer.destroyed;
    }
}
