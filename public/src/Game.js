import Vec from 'maxkueng/victor';
import MainLoop from 'mainloop.js';

import Engine from './Engine';
import Renderer  from './Renderer';
import Keyboard from './Keyboard';
import Stadium from './Stadium';
import Simulator from './state/Simulator';
import State from './state/State';
import {KeypressEvent} from './state/Events';
import Disc from './entities/Disc';
import classic from './stadiums/classic.json!json';

let fpsCounter = document.getElementById('fpsCounter');

export default class Game {
    me = null;
    playing = false;

    constructor() {
        this.engine = new Engine(this);
        this.simulator = new Simulator(this.engine);
    }

    createInitialState() {
        this.me = this.createPlayer('noj', -1);
        let playerDisc = this.createPlayerDisc(this.me);
        playerDisc.isMe = true;

        let ball = new Disc(new Vec(50, 50), 10, {
        	color: '#fff',
        	damping: 0.99
        });

        let stadium = Stadium.parse(classic);

        let state = new State;
        state.addPlayers(this.me);
        state.addDiscs(playerDisc, ball);
        this.simulator.states.unshift(state);
    }

    createPlayer(nick, clientId) {
        return {nick, clientId, keys: {}};
    }

    createPlayerDisc(player) {
        let disc = new Disc(new Vec(0, 0), 15, {
        	color: '#e56e56',
        	mass: 2
        });

        disc.playerId = player.clientId;
        disc.kickStrength = 4;
        return disc;
    }

    start() {
        if (this.playing) {
            return;
        }

        this.renderer = new Renderer(900, 500);
        this.renderer.canvas.focus();

        this.keyboard = new Keyboard((key, state) => {
            let event = new KeypressEvent({key, state, clientId: this.me.clientId});
            this.simulator.addEvent(event);
            this.network.sendMsg(event.format());
        });

        this.startLoop();
        this.playing = true;
    }

    stop() {
        if (!this.playing) {
            return;
        }

        this.stopLoop();
        this.renderer = null;
        this.playing = false;
    }

    startLoop() {
        MainLoop.setUpdate(() => {
            this.simulator.advance();
        });

        MainLoop.setDraw(() => {
            this.renderer.draw(this.simulator.currentState);
        });

        MainLoop.setEnd(fps => {
            fpsCounter.textContent = parseInt(fps, 10) + ' FPS';
        });

        MainLoop.start();
    }

    stopLoop() {
        MainLoop.stop();
    }
}
