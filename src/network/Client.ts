import _ from 'lodash';

import {
    AbstractNetwork,
    Config,
    SyncMsg,
    InitMsg,
    EventMsg,
    Message
} from './AbstractNetwork';
import Game, { PlayerInfo } from '../Game';
import * as Events from '../state/events';
import State from '../state/State';
import Disc from '../entities/Disc';

declare const Peer: any;

const CONNECT_TIMEOUT = 10000;

export enum States {
    Unconnected = 0,
    Connecting = 1,
    Connected = 2
}

const msgHandlers = {
    init(game: Game, client: Client, msg: InitMsg) {
        const simulator = game.getSimulator();
        const state = State.parse(msg.state);

        Disc.nextDiscId = _.maxBy(state.discs, disc => disc.id).id + 1;

        simulator.resetState(state);
        const newState = simulator.advance();

        const player = newState.getPlayerById(msg.id);
        const myDisc = newState.getPlayerDisc(player);

        if (myDisc) {
            myDisc.isMe = true;
        }

        game.setMe({
            id: player.clientId,
            name: player.name,
            avatar: player.avatar
        })

        game.initRenderer();
        game.init();

        client.setState(States.Connected);
    },

    sync(game: Game, client: Client, msg: SyncMsg) {
        const simulator = game.getSimulator();
        const currentFrame = simulator.currentFrame;

        // if sync state is earlier than the last synced state, we can ignore it
        if (msg.state.frame <= client.lastSyncFrame) {
            console.log('frame earlier than last sync');
            return;
        }

        // if sync state is before the current state we need to check if we have the states
        // after it so we can simulate forward again (ie oldest state should at least be the one after)
        if (msg.state.frame < currentFrame && simulator.oldestFrame > msg.state.frame + 1) {
            console.log('sync frame too far behind', currentFrame, msg.state.frame);
            return;
        }

        const predictedState = simulator.findStateFromFrame(msg.state.frame);

        /*if (predictedState) {
            msg.state.events = msg.state.events.concat(predictedState.events.map(event => event.pack()));
        }*/

        const syncState = State.parse(msg.state);
        simulator.resetState(syncState);
        client.lastSyncFrame = msg.state.frame;

        if (currentFrame > msg.state.frame) {
            simulator.fastForward(currentFrame);
        }
    },

    event(game: Game, client: Client, msg: EventMsg) {
        const simulator = game.getSimulator();
        const event = Events[msg.event.eventType].parse(msg.event.sender, msg.event.data);
        event.frame = msg.event.frame;

        if (event.frame >= simulator.currentFrame) {
            simulator.addEvent(event, event.frame);
        } else if (simulator.hasFrameInHistory(event.frame)) {
            const currentFrame = simulator.currentFrame;

            simulator.rewind(event.frame);
            simulator.addEvent(event);
            simulator.fastForward(currentFrame);
        }
    }
};

export default class Client extends AbstractNetwork {
    private game: Game;
    private hostConn: any;
    private state: States;
    public lastSyncFrame = 0;

    public constructor(game: Game, { host, path }: Config) {
        super();
        this.game = game;
        game.setNetwork(this);

        const ident = Math.random().toString(36).substring(7);
        this.peer = new Peer(ident, { host, path });
    }

    public connectTo(host: string, playerInfo: PlayerInfo): Promise<Game> {
        this.state = States.Connecting;
        this.hostConn = this.peer.connect(host);

        this.hostConn.on('close', () => {
            this.game.destroy();
        });

        return new Promise((resolve, reject) => {
            let timeout = setTimeout(() => reject(), CONNECT_TIMEOUT);

            this.hostConn.on('data', (msg: Message) => {
                this.handleMsg(msg);

                if (timeout && this.state == States.Connected) {
                    clearTimeout(timeout);
                    timeout = null;
                    resolve(this.game);
                }
            });
        });
    }

    private handleMsg(msg: Message) {
        if (!msgHandlers[msg.type] || typeof msgHandlers[msg.type] !== 'function') {
            throw new Error(`Invalid msg type recieved: ${msg.type}`);
        }

        msgHandlers[msg.type](this.game, this, msg);
    }

    public sendMsg(msg: Message) {
        this.hostConn.send(msg);
    }

    public setState(state: States) {
        this.state = state;
    }
}
