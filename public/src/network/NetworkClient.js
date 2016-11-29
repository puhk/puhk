import _ from 'lodash';
import Peer from 'peerjs';
import * as Events from '../state/Events';
import State from '../state/State';

let msgHandlers = {
    init(msg) {
        this.game.simulator.resetState(State.parse(msg.state));
        this.game.simulator.advance();

        this.game.me = _.find(this.game.simulator.currentState.players, {clientId: msg.id});
        this.game.start();
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

        if (predictedState) {
            msg.state.events = predictedState.events;
        }

        this.game.simulator.resetState(State.parse(msg.state));
        this.lastSyncFrame = msg.state.frame;

        if (currentFrame > msg.state.frame) {
            this.game.simulator.fastForward(currentFrame);
        }
    },

    event(msg) {
        let event = new Events[msg.eventType + 'Event'](msg.data);

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
        this.hostConn = this.peer.connect('host', {serialization: 'json'});
        this.hostConn.on('data', this.handleMsg.bind(this));
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
