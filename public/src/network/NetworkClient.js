import _ from 'lodash';
import Peer from 'peerjs';

import * as Events from '../state/Events/Events';
import State from '../state/State';
import Disc from '../entities/Disc';

let msgHandlers = {
    init(msg) {
        let state = State.parse(msg.state);

        Disc.nextDiscId = _.max(state.discs, disc => disc.id).id + 1;

        this.game.simulator.resetState(state);
        let newState = this.game.simulator.advance();

        let player = newState.getPlayerById(msg.id);
        let myDisc = newState.getPlayerDisc(player);
        
        if (myDisc) {
            myDisc.isMe = true;
        }

        this.game.myId = player.clientId;
        this.game.init();
    },

    sync(msg) {
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

    event(msg) {
        let event = Events[msg.eventType].parse(msg.sender, msg.data);
        event.frame = msg.frame;

        if (msg.frame >= this.game.simulator.currentFrame) {
            this.game.simulator.addEvent(event, msg.frame);
        }
        else if (this.game.simulator.hasFrameInHistory(msg.frame)) {
            let currentFrame = this.game.simulator.currentFrame;

            this.game.simulator.rewind(msg.frame);
            this.game.simulator.addEvent(event);
            this.game.simulator.fastForward(currentFrame);
        }
    }
};

export default class NetworkClient {
    id = null;
    game = null;
    peer = null;
    hostConn = null;
    nick = 'sock';
    lastSyncFrame = 0;

    constructor(game) {
        this.game = game;
        game.network = this;

        let ident = Math.random().toString(36).substring(7);
        this.peer = new Peer(ident, {host: 'localhost', path: '/p2p'});
    }

    connectTo(host) {
        this.hostConn = this.peer.connect('host');
        this.hostConn.on('data', this.handleMsg.bind(this));

        this.hostConn.on('close', () => {
            this.game.destroy();
        });
    }

    handleMsg(msg) {
        if (!msgHandlers[msg.type] || typeof msgHandlers[msg.type] !== 'function') {
            throw new Error('Invalid msg type recieved: ' + msg.type);
        }

        msgHandlers[msg.type].call(this, msg);
    }

    sendMsg(msg) {
        this.hostConn.send(msg);
    }
}
