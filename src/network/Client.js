// @flow

import _ from 'lodash';
import Peer from 'peerjs';

import type Game from '../Game';
import Base from './Base';
import * as Events from '../state/events';
import State from '../state/State';
import Disc from '../entities/Disc';

import type {syncMsg, initMsg, eventMsg, messages} from './Base';

let msgHandlers = {
    init(msg: initMsg) {
        let state = State.parse(msg.state);

        Disc.nextDiscId = _.max(state.discs, disc => disc.id).id + 1;

        this.game.simulator.resetState(state);
        let newState = this.game.simulator.advance();

        let player = newState.getPlayerById(msg.id);
        let myDisc = newState.getPlayerDisc(player);

        if (myDisc) {
            myDisc.isMe = true;
        }

        this.game.me.id = player.clientId;
        this.game.init();
        this.game.initRenderer();
    },

    sync(msg: syncMsg) {
        let currentFrame = this.game.simulator.currentFrame;

        // if sync state is earlier than the last synced state, we can ignore it
        if (msg.state.frame <=  this.lastSyncFrame) {
            console.log('frame earlier than last sync');
            return;
        }

        // if sync state is before the current state we need to check if we have the states
        // after it so we can simulate forward again (ie oldest state should at least be the one after)
        if (msg.state.frame < currentFrame && this.game.simulator.oldestFrame > msg.state.frame + 1) {
            console.log('sync frame too far behind', currentFrame, msg.state.frame);
            return;
        }

        let predictedState = this.game.simulator.findStateFromFrame(msg.state.frame);

        /*if (predictedState) {
            msg.state.events = msg.state.events.concat(predictedState.events.map(event => event.pack()));
        }*/

        let syncState = State.parse(msg.state);
        this.game.simulator.resetState(syncState);
        this.lastSyncFrame = msg.state.frame;

        if (currentFrame > msg.state.frame) {
            this.game.simulator.fastForward(currentFrame);
        }
    },

    event(msg: eventMsg) {
        let event = Events[msg.event.eventType].parse(msg.event.sender, msg.event.data);
        event.frame = msg.event.frame;

        if (event.frame >= this.game.simulator.currentFrame) {
            this.game.simulator.addEvent(event, event.frame);
        }
        else if (this.game.simulator.hasFrameInHistory(event.frame)) {
            let currentFrame = this.game.simulator.currentFrame;

            this.game.simulator.rewind(event.frame);
            this.game.simulator.addEvent(event);
            this.game.simulator.fastForward(currentFrame);
        }
    }
};

export default class Client extends Base {
    id: number;
    game: Game;
    peer: Peer;
    hostConn: any;
    name = 'sock';
    lastSyncFrame = 0;

    constructor(game: Game) {
        super();
        this.game = game;
        game.network = this;

        let ident = Math.random().toString(36).substring(7);
        this.peer = new Peer(ident, {host: 'localhost', path: '/p2p'});
    }

    connectTo(host: string) {
        this.hostConn = this.peer.connect(host);
        this.hostConn.on('data', this.handleMsg.bind(this));

        this.hostConn.on('close', () => {
            this.game.destroy();
        });
    }

    handleMsg(msg: messages) {
        if (!msgHandlers[msg.type] || typeof msgHandlers[msg.type] !== 'function') {
            throw new Error('Invalid msg type recieved: ' + msg.type);
        }

        msgHandlers[msg.type].call(this, msg);
    }

    sendMsg(msg: messages) {
        this.hostConn.send(msg);
    }
}
