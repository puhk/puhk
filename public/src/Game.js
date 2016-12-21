import MainLoop from 'mainloop.js';
import Vec from 'maxkueng/victor';

import Engine from './Engine';
import Keyboard from './Keyboard';
import Stadium from './Stadium';
import Renderer from './Renderer';

import Simulator from './state/Simulator';
import State from './state/State';
import {ClientAdded, Keypress} from './state/Events/Events';

import Disc from './entities/Disc';
import Player from './entities/Player';
import Segment from './entities/Segment';

import classic from './stadiums/classic.json!json';

let fpsCounter = document.getElementById('fpsCounter');
let scoreDiv = document.getElementById('scores');

export default class Game {
    inited = false;
    renderer = null;
    myId = -1;

    /**
     * @param {Renderer} renderer
     */
    constructor(renderer) {
        this.engine = new Engine(this);
        this.simulator = new Simulator(this.engine);
        this.renderer = renderer;
    }

    init() {
        if (this.inited || !this.network) {
            return;
        }

        if (this.renderer) {
            this.renderer.init();
            this.renderer.canvas.focus();
        }

        this.keyboard = new Keyboard((key, state) => {
            let event = new Keypress(this.myId, {key, state, clientId: this.myId});
            this.simulator.addEvent(event);
            this.network.sendMsg(event.pack());
        });

        this.setupLoop();
        this.startLoop();
        this.inited = true;
    }

    destroy() {
        if (!this.inited) {
            return;
        }

        if (this.renderer) {
            this.renderer.destroy();
        }

        this.stopLoop();
        this.keyboard = null;
        this.inited = false;
    }

    start() {
        let state = this.simulator.currentState;
        
        if (state.playing) {
            return;
        }

        this.createPlayerDiscs();
        this.kickOffState(state);
        state.playing = true;
    }

    stop() {
        if (!this.simulator.currentState.playing) {
            return;
        }
    }

    createInitialState() {
        let stadium = new Stadium(classic);

        let state = State.createFromStadium(stadium);
        this.simulator.states.unshift(state);

        let me = this.createPlayer(this.myId, 'noj', stadium.teams[0]);
        state.addPlayers(me);
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
        let stadium = this.simulator.currentState.stadium;

        let disc = new Disc(new Vec(0, 0), stadium.playerPhysics.radius, {
            color: stadium.getTeam(player.team).color,
            damping: stadium.playerPhysics.damping,
        	invMass: stadium.playerPhysics.invMass
        });

        disc.kickStrength = stadium.playerPhysics.kickStrength;
        return disc;
    }
    
    createPlayerDiscs() {
        let state = this.simulator.currentState;

        let discs = state.players.filter(player => player.team)
            .map(player => {
                let disc = this.createPlayerDisc(player);
                player.discId = disc.id;

                if (player.clientId == this.myId) {
                    disc.isMe = true;
                }

                return disc;
            });
        
        state.addDiscs(discs);
    }

    /*movePlayerToTeam(player, team) {
        let event = new ChangeTeam(player, team);
        this.simulator.addEvent(event);
    }*/

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
        let team = state.stadium.getTeam(goal.teamScored);

        if (!team) {
            return;
        }

        ++state.scores[team.name];
        this.kickOffState(state);

        if (state.scores[team.name] == state.scoreLimit) {
            this.stop();
        }
    }

    setupLoop() {
        MainLoop.setUpdate(() => {
            this.simulator.advance();
        });

        if (this.renderer) {
            MainLoop.setDraw(() => {
                if (this.simulator.currentState.playing) {
                    this.renderer.draw(this.simulator.currentState);
                }
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
