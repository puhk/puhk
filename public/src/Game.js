import MainLoop from 'mainloop.js';
import Vec from 'maxkueng/victor';

import Engine from './Engine';
import Keyboard from './Keyboard';
import Stadium from './Stadium';
import Renderer from './Renderer';

import Simulator from './state/Simulator';
import State from './state/State';
import {ChangeTeam, ClientAdded, Keypress} from './state/events/Events';

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

        this.stopLoop();
        this.keyboard = null;
        this.inited = false;
    }

    initRenderer() {
        if (this.renderer) {
            this.renderer.init();
            this.renderer.canvas.focus();
        }
    }

    start() {
        let state = this.simulator.currentState;
        
        if (state.playing) {
            return;
        }

        this.initRenderer();
        this.createPlayerDiscs();
        this.kickOffState(state);
        state.playing = true;
    }

    stop(state) {
        if (!state.playing) {
            return;
        }

        if (this.renderer) {
            this.renderer.destroy();
        }

        state.playing = false;

        state.players.filter(player => player.team)
            .forEach(player => {
                state.removeDisc(state.getPlayerDisc(player));
            });
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
        if (player.team === null) {
            return;
        }

        let stadium = this.simulator.currentState.stadium;

        let disc = new Disc(new Vec(0, 0), stadium.playerPhysics.radius, {
            color: stadium.getTeam(player.team).color,
            damping: stadium.playerPhysics.damping,
        	invMass: stadium.playerPhysics.invMass
        });

        disc.kickStrength = stadium.playerPhysics.kickStrength;
        disc.isMe = player.clientId == this.myId;
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

    movePlayerToTeam(clientId, team) {
        let event = new ChangeTeam(this.myId, {clientId, team});
        this.simulator.addEvent(event);
        this.network.sendMsg(event.pack());
    }

    kickOffState(state) {
        state.matchState = State.STATE_KICKOFF;

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

        if (state.matchState != State.STATE_INPLAY || !team) {
            return;
        }

        ++state.scores[team.name];
        state.matchState = State.STATE_GOALSCORED;
        state.matchStateTimer = 150;
    }

    update(state) {
        switch (state.matchState) {
            case State.STATE_KICKOFF:
                state.discs.filter(disc => disc.isBall)
                    .forEach(ball => {
                        if (ball.velocity.x > 0 || ball.velocity.y > 0) {
                            state.matchState = State.STATE_INPLAY;
                        }
                    });

                break;
            
            case State.STATE_INPLAY:
                // increase match timer
                break;
            
            case State.STATE_GOALSCORED:
                --state.matchStateTimer;

                if (state.matchStateTimer > 0) {
                    return;
                }

                for (let team of state.stadium.teams) {
                    let score = state.scores[team.name];

                    if (score >= state.scoreLimit) {
                        state.matchState = State.STATE_ENDGAME;
                        state.matchStateTimer = 300;
                        return;
                    }
                }

                state.matchState = State.STATE_KICKOFF;
                this.kickOffState(state);

                break;
            
            case State.STATE_ENDGAME:
                --state.matchStateTimer;

                if (state.matchStateTimer == 0) {
                    this.stop(state);
                }

                break;
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
