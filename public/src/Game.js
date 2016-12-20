import MainLoop from 'mainloop.js';
import Vec from 'maxkueng/victor';

import Engine from './Engine';
import Keyboard from './Keyboard';
import Stadium from './Stadium';
import Renderer from './Renderer';

import Simulator from './state/Simulator';
import State from './state/State';
import {KeypressEvent} from './state/Events';

import Disc from './entities/Disc';
import Player from './entities/Player';
import Segment from './entities/Segment';

import classic from './stadiums/classic.json!json';

let fpsCounter = document.getElementById('fpsCounter');
let scoreDiv = document.getElementById('scores');

export default class Game {
    renderer = null;
    me = null;
    playing = false;

    /**
     * @param {Renderer} renderer
     */
    constructor(renderer) {
        this.engine = new Engine(this);
        this.simulator = new Simulator(this.engine);
        this.renderer = renderer;
    }

    createInitialState() {
        let stadium = new Stadium(classic);

        let state = State.createFromStadium(stadium);
        this.simulator.states.unshift(state);

        this.me = this.createPlayer(-1, 'noj', stadium.teams[0]);

        let playerDisc = this.createPlayerDisc(this.me);
        this.me.discId = playerDisc.id;
        playerDisc.isMe = true;

        state.addPlayers(this.me);
        state.addDiscs(playerDisc);

        this.kickOffState(state);
    }

    /**
     * @param {number} clientId
     * @param {string} nick
     * @param {Object} team
     * @returns {Player}
     */
    createPlayer(clientId, nick, team) {
        return new Player(clientId, nick, team.name);
    }

    /**
     * @param {Player} player
     * @returns {Disc}
     */
    createPlayerDisc(player) {
        let disc = new Disc(new Vec(0, 0), 15, {
            color: this.simulator.currentState.stadium.getTeam(player.team).color,
        	invMass: 0.5
        });

        disc.kickStrength = 4;
        return disc;
    }

    kickOffState(state) {
        this.setKickOffPositions(state);

        state.discs.filter(disc => disc.isBall)
            .forEach(ball => {
                ball.position = new Vec(0, 0);
                ball.velocity = new Vec(0, 0);
            });
    }

    setKickOffPositions(state) {
        state.players.forEach(player => {
            let disc = state.getPlayerDisc(player);
            let team = state.stadium.getTeam(player.team);

            disc.position = Vec.fromArray(team.kickOffPos);
            disc.velocity = new Vec(0, 0);
        });
    }

    goalScored(goal, state) {
        let team = state.stadium.getTeam(goal.team);

        if (!team) {
            return;
        }

        ++state.scores[team.name];
        this.kickOffState(state);

        if (state.scores[team.name] == state.scoreLimit) {
            this.stop();
        }
    }

    start() {
        if (this.playing || !this.network) {
            return;
        }

        // this.simulator.clear();

        if (this.renderer) {
            this.renderer.init();
            this.renderer.canvas.focus();
        }

        this.keyboard = new Keyboard((key, state) => {
            let event = new KeypressEvent(this.me.clientId, {key, state, clientId: this.me.clientId});
            this.simulator.addEvent(event);
            this.network.sendMsg(event.pack());
        });

        this.setupLoop();
        this.startLoop();
        this.playing = true;
    }

    stop() {
        if (!this.playing) {
            return;
        }

        this.stopLoop();
        this.playing = false;

        if (this.renderer) {
            this.renderer.destroy();
        }
    }

    setupLoop() {
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

            let state =  this.simulator.currentState;

            let text = state.stadium.teams.map(team => {
                return `${team.name}: ${state.scores[team.name]}`;
            });

            scoreDiv.innerHTML = text.join(' ');
        });
    }

    startLoop() {
        MainLoop.start();
    }

    stopLoop() {
        MainLoop.stop();
    }
}
