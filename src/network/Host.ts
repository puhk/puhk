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

    public constructor(game: Game, {host, path}: Config) {
        super();
        this.game = game;
        game.network = this;

        this.peer = new Peer('host', {host, path});
        this.peer.on('connection', this.handleConnection.bind(this));

        // this.nextSync = setInterval(this.sendSync.bind(this), this.syncInterval);
    }

    private handleConnection(conn: any) {
        conn.on('open', () => {
            let client = new Client(this.nextClientId++, conn, this.game);
            conn.client = client;
            this.clients.push(client);

            let event = new PlayerJoinedEvent(this.game.me.id, {
                clientId: client.id,
                name: 'sock',
                avatar: ':)'
            });

            this.game.simulator.addEvent(event);

            conn.send({
                type: 'init',
                id: client.id,
                state: this.game.simulator.currentState.pack()
            });

            this.sendMsg(event.toMessage(), client);
        });
    }

    public sendMsg(msg: Message, excludeClient?: Client) {
        for (let client of this.clients) {
            if (!excludeClient || client !== excludeClient) {
                client.conn.send(msg);
            }
        }
    }

    private sendSync() {
        if (!this.game.state.playing) {
            return;
        }

        let msg = {
            type: 'sync',
            state: this.game.simulator.currentState.pack()
        };

        this.sendMsg(msg);
    }
}

let msgHandlers = {
    event(msg: EventMsg) {
        let event = Events[msg.event.eventType].parse(msg.event.sender, msg.event.data);
        event.frame = msg.event.frame;

        if (event instanceof Events.Keypress) {
            event.data.clientId = this.id;
        }

        if (event.frame >= this.game.simulator.currentFrame) {
            this.game.simulator.addEvent(event, event.frame);
        } else if (this.game.simulator.hasFrameInHistory(event.frame)) {
            let currentFrame = this.game.simulator.currentState.frame;

            this.game.stopLoop();
            this.game.simulator.rewind(event.frame);
            this.game.simulator.addEvent(event);
            this.game.simulator.fastForward(currentFrame);
            this.game.startLoop();
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

        msgHandlers[msg.type].call(this, msg);
    }
}
