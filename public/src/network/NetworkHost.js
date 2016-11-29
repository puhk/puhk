import Peer from 'peerjs';
import * as Events from '../state/Events';
import {ClientAddedEvent} from '../state/Events';

export default class NetworkHost {
    peer = null;
    game = null;

    clients = [];
    nextClientId = 0;
    nextSync = null;
    syncInterval = 1000 / 10;

    constructor(game) {
        this.game = game;
        game.network = this;

        this.peer = new Peer('host', {host: 'localhost', path: '/p2p'});
        this.peer.on('connection', this.handleConnection.bind(this));

        this.nextSync = setInterval(this.sendSync.bind(this), this.syncInterval);
    }

    handleConnection(conn) {
        conn.on('open', () => {
            let client = new Client(this.nextClientId++, conn, this.game);
            conn.client = client;
            this.clients.push(client);

            let event = new ClientAddedEvent({id: client.id, nick: 'sock'});
            this.game.simulator.addEvent(event);

            conn.send({
                type: 'init',
                id: client.id,
                state: this.game.simulator.currentState
            });

            this.sendMsg(event.format(), client);
        });
    }

    sendMsg(msg, excludeClient) {
        for (let client of this.clients) {
            if (!excludeClient || client !== excludeClient) {
                client.conn.send(msg);
            }
        }
    }

    sendSync() {
        let msg = {
            type: 'sync',
            state: this.game.simulator.currentState
        };

        this.sendMsg(msg);
    }
}

class Client {
    constructor(id, conn, game) {
        this.id = id;
        this.conn = conn;
        this.game = game;

        conn.on('data', this.handleMsg.bind(this));
    }

    handleMsg(msg) {
        switch (msg.type) {
            case 'event':
                let event = new Events[msg.eventType + 'Event'](msg.data);

                if (msg.frame >= this.game.simulator.currentFrame) {
                    this.game.simulator.addEvent(event, msg.frame);
                }
                else if (this.game.simulator.hasFrameInHistory(msg.frame)) {
                    let currentFrame = this.game.simulator.currentState.frame;

                    this.game.stopLoop();
                    this.game.simulator.rewind(msg.frame);
                    this.game.simulator.addEvent(event);
                    this.game.simulator.fastForward(currentFrame);
                    this.game.startLoop();
                }

                break;
        }
    }
}
