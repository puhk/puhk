import Peer from 'peerjs';
import { AbstractP2PNetwork } from './AbstractP2PNetwork';
import { NetworkInterface, Message, MessageType } from '../NetworkInterface';
import { PlayerInfo } from '../../controller/NetworkController';

export enum States {
	Unconnected = 0,
	Connecting = 1,
	Connected = 2,
}

export default class NetworkClient extends AbstractP2PNetwork implements NetworkInterface {
	private static CONNECT_TIMEOUT = 10000;
	private state = States.Unconnected;
	private hostConn?: Peer.DataConnection;

	public constructor(protected peer: Peer) {
		super();
	}

	public connectTo(host: string, player: PlayerInfo): Promise<void> {
		this.state = States.Connecting;
		const hostConn = (this.hostConn = this.peer.connect(host, { metadata: player }));

		return new Promise((resolve, reject) => {
			const fail = (err?: string) => {
				cancelTimeout();
				this.state = States.Unconnected;
				reject(err);
			};

			let timeout: number | null = window.setTimeout(fail, NetworkClient.CONNECT_TIMEOUT);

			const cancelTimeout = () => {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
			};

			hostConn.on('open', () => {
				hostConn.on('data', (msg: Message) => {
					if (msg.type === MessageType.Init && timeout) {
						cancelTimeout();
						this.state = States.Connected;
						resolve();
					}

					this.emit(`host:msg:${msg.type}`, msg);
				});
			});

			hostConn.on('close', () => {
				fail();
				this.emit('host:disconnect');
			});

			hostConn.on('error', err => {
				fail(err);
				this.emit('host:error');
			});
		});
	}

	public send(msg: Message) {
		if (!this.hostConn) {
			throw new Error('Client isnt connected');
		}

		this.hostConn.send(msg);
	}
}
