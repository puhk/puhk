import { autobind } from 'core-decorators';
import Peer from 'peerjs';
import { AbstractP2PNetwork } from './AbstractP2PNetwork';
import { NetworkInterface, Message } from '../NetworkInterface';

interface Client {
	id: number;
	conn: any;
}

export default class NetworkHost extends AbstractP2PNetwork implements NetworkInterface {
	private clients: Client[] = [];
	private nextClientId = 0;

	public constructor(protected peer: Peer) {
		super();
	}

	public init() {
		this.peer.on('connection', this.handleConnection);
		return this;
	}

	@autobind
	private handleConnection(conn: any) {
		const id = this.nextClientId++;

		conn.on('open', () => {
			this.clients.push({ id, conn });

			this.emit('client:joined', {
				player: conn.metadata,
				id,
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
