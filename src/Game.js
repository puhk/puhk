// @flow

import MainLoop from 'mainloop.js';
import Vec from 'victor';
import {EventAggregator} from 'aurelia-event-aggregator';

import Engine from './Engine';
import Keyboard from './Keyboard';
import Stadium from './Stadium';
import Renderer from './Renderer';

import Simulator from './state/Simulator';
import State from './state/State';
import {ChangeTeam, ClientAdded, Keypress, StartGame, StopGame} from './state/events';

import Disc from './entities/Disc';
import Goal from './entities/Goal';
import Player from './entities/Player';
import Segment from './entities/Segment';

import classic from './stadiums/classic.json';

import type NetworkHost from './network/Host';
import type NetworkClient from './network/Client';
import type Event from './state/events/Event';

export default class Game {
    engine: Engine;
    keyboard: Keyboard;
    network: NetworkHost | NetworkClient;
    renderer: ?Renderer;
    simulator: Simulator;
    eventAggregator: EventAggregator;

    inited = false;
    myId = -1;

    constructor(renderer?: Renderer) {
        this.engine = new Engine(this);
        this.simulator = new Simulator(this.engine);
        this.renderer = renderer;
        this.eventAggregator = new EventAggregator;

        this.keyboard = new Keyboard((key, state) => {
            let event = new Keypress(this.myId, {key, state, clientId: this.myId});
            this.addEvent(event);
        });
    }

    init() {
        if (this.inited || !this.network) {
            return;
        }

        this.setupLoop();
        this.startLoop();
        this.inited = true;
    }

    destroy() {
        if (!this.inited) {
            return;
        }

        this.stopLoop();
        this.inited = false;
    }

    initRenderer() {
        if (this.renderer instanceof Renderer) {
            this.renderer.init();
        }
    }

    addEvent(event: Event, send?: boolean) {
        this.simulator.addEvent(event);

        if (send) {
            this.network.sendMsg(event.toMessage());
        }
    }

    start() {
        this.addEvent(new StartGame(this.myId));
    }

    stop(state: State) {
        this.addEvent(new StopGame(this.myId));
    }

    createInitialState() {
        let stadium = new Stadium(classic);

        let state = State.createFromStadium(stadium);
        this.simulator.states.unshift(state);

        let me = this.createPlayer(this.myId, 'noj', stadium.teams[0]);
        state.addPlayers(me);
    }

    createPlayer(clientId: number, nick: string, team: Object) {
        return new Player(clientId, nick, team.name);
    }

    createPlayerDisc(player: Player): ?Disc {
        let stadium = this.simulator.currentState.stadium;
        let team = stadium.getTeam(player.team);
        
        if (player.team === null || !team) {
            return;
        }

        let disc = new Disc(new Vec(0, 0), stadium.playerPhysics.radius, {
            color: team.color,
            damping: stadium.playerPhysics.damping,
            invMass: stadium.playerPhysics.invMass
        });

        disc.kickStrength = stadium.playerPhysics.kickStrength;
        disc.isMe = player.clientId == this.myId;
        return disc;
    }
    
    createPlayerDiscs(state: State) {
        let discs: Disc[] = [];

        for (let player of state.players) {
            let disc = this.createPlayerDisc(player);

            if (!disc) {
                return;
            }

            player.discId = disc.id;

            if (player.clientId == this.myId) {
                disc.isMe = true;
            }

            discs.push(disc);
        }
        
        state.addDiscs(discs);
    }

    movePlayerToTeam(clientId: number, team: Object) {
        this.addEvent(new ChangeTeam(this.myId, {clientId, team}))
    }

    kickOffState(state: State) {
        state.matchState = State.STATE_KICKOFF;

        this.setKickOffPositions(state);

        state.discs.filter(disc => disc.isBall)
            .forEach(ball => {
                ball.position = new Vec(0, 0);
                ball.velocity = new Vec(0, 0);
            });
    }

    setKickOffPositions(state: State) {
        state.players.forEach(player => {
            let disc = state.getPlayerDisc(player);
            let team = state.stadium.getTeam(player.team);

            if (!disc || !team) {
                return;
            }

            disc.position = Vec.fromArray(team.kickOffPos);
            disc.velocity = new Vec(0, 0);
        });
    }

    goalScored(goal: Goal, state: State) {
        let team = state.stadium.getTeam(goal.teamScored);

        if (state.matchState != State.STATE_INPLAY || !team) {
            return;
        }

        ++state.scores[team.name];
        state.matchState = State.STATE_GOALSCORED;
        state.matchStateTimer = 150;
    }

    scoresEqual(state: State) {
        let scores = state.stadium.teams.map(team => {
            return state.scores[team.name];
        });

        return scores.every(score => score == scores[0]);
    }

    update(state: State) {
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
                state.timer += 1 / 60;

                if (state.timer >= state.timeLimit * 60 && !this.scoresEqual(state)) {
                    state.matchState = State.STATE_ENDGAME;
                    state.matchStateTimer = 300;
                }

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

        MainLoop.setDraw(() => {
            if (this.renderer && this.simulator.currentState.playing) {
                this.renderer.draw(this.simulator.currentState);
            }
        });
    }

    startLoop() {
        MainLoop.start();
    }

    stopLoop() {
        MainLoop.stop();
    }
}
