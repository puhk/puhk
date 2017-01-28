// @flow

import Peer from 'peerjs';

import Base from './Base';
import * as Events from '../state/events';
import PlayerJoinedEvent from '../state/events/PlayerJoined';

import type {syncMsg, initMsg, eventMsg, messages} from './Base';
import type Game from '../Game';

export default class Host extends Base {
    peer: Peer;
    game: Game;

    clients: Client[] = [];
    nextClientId = 0;
    nextSync = null;
    syncInterval = 1000 / 10;

    constructor(game: Game) {
        super();
        this.game = game;
        game.network = this;

        this.peer = new Peer('host', {host: 'localhost', path: '/p2p'});
        this.peer.on('connection', this.handleConnection.bind(this));

        // this.nextSync = setInterval(this.sendSync.bind(this), this.syncInterval);
    }

    handleConnection(conn: Peer) {
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

    sendMsg(msg: messages, excludeClient?: Client) {
        for (let client of this.clients) {
            if (!excludeClient || client !== excludeClient) {
                client.conn.send(msg);
            }
        }
    }

    sendSync() {
        if (!this.game.playing) {
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
    event(msg: eventMsg) {
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

class Client {
    id: number;
    conn: Peer;
    game: Game;

    constructor(id: number, conn: Peer, game: Game) {
        this.id = id;
        this.conn = conn;
        this.game = game;

        conn.on('data', this.handleMsg.bind(this));
    }

    handleMsg(msg: messages) {
        if (!msgHandlers[msg.type] || typeof msgHandlers[msg.type] !== 'function') {
            throw new Error('Invalid msg type recieved: ' + msg.type);
        }

        msgHandlers[msg.type].call(this, msg);
    }
}
