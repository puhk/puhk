import {
    AbstractNetwork,
    Config,
    SyncMsg,
    InitMsg,
    EventMsg,
    Message
} from './AbstractNetwork';
import * as Events from '../state/events';
import Game from '../Game';
import PlayerJoinedEvent from '../state/events/PlayerJoined';

declare const Peer: any;

export default class Host extends AbstractNetwork {
    private game: Game;
    private clients: Client[] = [];
    private nextClientId = 0;
    private nextSync: number = null;

    private static syncInterval = 1000 / 10;

    public constructor(game: Game, { host, path }: Config) {
        super();
        this.game = game;
        game.setNetwork(this);

        this.peer = new Peer('host', { host, path });
        this.peer.on('connection', this.handleConnection.bind(this));

        // this.nextSync = setInterval(this.sendSync.bind(this), this.syncInterval);
    }

    private handleConnection(conn: any) {
        conn.on('open', () => {
            const client = new Client(this.nextClientId++, conn, this.game);
            conn.client = client;
            this.clients.push(client);

            const event = new PlayerJoinedEvent(this.game.getMe().id, {
                clientId: client.id,
                name: 'sock',
                avatar: ':)'
            });

            const simulator = this.game.getSimulator();
            simulator.addEvent(event);

            conn.send({
                type: 'init',
                id: client.id,
                state: simulator.currentState.pack()
            });

            this.sendMsg(event.toMessage(), client);
        });
    }

    public sendMsg(msg: Message, excludeClient?: Client) {
        for (const client of this.clients) {
            if (!excludeClient || client !== excludeClient) {
                client.conn.send(msg);
            }
        }
    }

    private sendSync() {
        if (!this.game.state.playing) {
            return;
        }

        this.sendMsg(<SyncMsg>{
            type: 'sync',
            state: this.game.getSimulator().currentState.pack()
        });
    }
}

const msgHandlers = {
    event(game: Game, client: Client, msg: EventMsg) {
        const event = Events[msg.event.eventType].parse(msg.event.sender, msg.event.data);
        event.frame = msg.event.frame;

        if (event instanceof Events.Keypress) {
            event.data.clientId = client.id;
        }

        const simulator = game.getSimulator();

        if (event.frame >= simulator.currentFrame) {
            simulator.addEvent(event, event.frame);
        } else if (simulator.hasFrameInHistory(event.frame)) {
            const currentFrame = simulator.currentState.frame;

            game.stopLoop();
            simulator.rewind(event.frame);
            simulator.addEvent(event);
            simulator.fastForward(currentFrame);
            game.startLoop();
        }
    }
};

export class Client {
    id: number;
    conn: any;
    game: Game;

    public constructor(id: number, conn: any, game: Game) {
        this.id = id;
        this.conn = conn;
        this.game = game;

        conn.on('data', this.handleMsg.bind(this));
    }

    private handleMsg(msg: Message) {
        if (!msgHandlers[msg.type] || typeof msgHandlers[msg.type] !== 'function') {
            throw new Error('Invalid msg type recieved: ' + msg.type);
        }

        msgHandlers[msg.type](this.game, this, msg);
    }
}
