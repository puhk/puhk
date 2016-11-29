import MainLoop from 'mainloop.js';
import Vec from 'maxkueng/victor';

import Engine from './Engine';
import Keyboard from './Keyboard';
import Stadium from './Stadium';
import Simulator from './state/Simulator';
import State from './state/State';
import {KeypressEvent} from './state/Events';
import Disc from './entities/Disc';
import Segment from './entities/Segment';
import classic from './stadiums/classic.json!json';

let fpsCounter = document.getElementById('fpsCounter');

export default class Game {
    renderer = null;

    teams = [];
    scores = [];
    me = null;
    playing = false;

    constructor(renderer) {
        this.engine = new Engine(this);
        this.simulator = new Simulator(this.engine);
        this.renderer = renderer;
    }

    createInitialState() {
        this.me = this.createPlayer('noj', -1);

        let stadium = new Stadium(classic);
        this.createTeams(stadium);

        let playerDisc = this.createPlayerDisc(this.me);
        playerDisc.isMe = true;

        let state = State.createFromStadium(stadium);
        state.addPlayers(this.me);
        state.addDiscs(playerDisc);

        this.simulator.states.unshift(state);
    }

    createTeams(stadium) {
        this.teams = stadium.teams.map(obj => {
            return {
                name: obj.name,
                color: obj.color,
                players: []
            };
        });
    }

    createPlayer(nick, clientId) {
        return {nick, clientId, keys: {}};
    }

    createPlayerDisc(player) {
        let disc = new Disc(new Vec(0, 0), 15, {
        	color: this.teams[0].color,
        	invMass: 0.5
        });

        disc.playerId = player.clientId;
        disc.kickStrength = 4;
        return disc;
    }

    start() {
        if (this.playing || !this.network) {
            return;
        }

        this.simulator.clear();
        this.createInitialState();

        if (this.renderer) {
            this.renderer.init();
            this.renderer.canvas.focus();
        }

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

        MainLoop.stop();
        this.playing = false;

        if (this.renderer) {
            this.renderer.destroy();
        }
    }

    startLoop() {
        MainLoop.setUpdate(() => {
            this.simulator.advance();
        });

        if (this.renderer) {
            MainLoop.setDraw(() => {
                this.renderer.draw(this.simulator.currentState);
            });
        }

        MainLoop.setEnd(fps => {
            fpsCounter.textContent = parseInt(fps, 10) + ' FPS';
        });

        MainLoop.start();
    }
}
