import MainLoop from 'mainloop.js';
import Vec from 'victor';
import { EventAggregator } from 'aurelia-event-aggregator';

import Keyboard from './Keyboard';
import Renderer from './Renderer';
import State, { States } from './state/State';

import {
    Keypress,
    PlayerJoined,
    StartGame,
    StopGame
} from './state/events';

import Disc from './entities/Disc';
import Goal from './entities/Goal';
import Player from './entities/Player';
import Stadium from './entities/Stadium';

import { AbstractNetwork } from './network/AbstractNetwork';
import Event from './state/Event';
import Simulator from './state/Simulator';

export interface PlayerInfo {
    name: string,
    avatar: string | number
}

export interface LocalPlayerInfo extends PlayerInfo {
    id: number
}

export default class Game {
    private keyboard?: Keyboard;
    private network?: AbstractNetwork;
    private renderer?: Renderer;
    private simulator: Simulator;
    private eventApi: EventAggregator;
    private inited = false;

    private me: LocalPlayerInfo = {
        id: -1,
        name: '',
        avatar: ''
    };

    public constructor(simulator: Simulator, renderer?: Renderer) {
        this.simulator = simulator;
        this.renderer = renderer;
        this.eventApi = new EventAggregator;
    }

    public createLocalPlayer(playerInfo: PlayerInfo) {
        if (this.inited) {
            throw new Error('Game already init');
        }

        this.me.name = playerInfo.name;
        this.me.avatar = playerInfo.avatar;

        const event = new PlayerJoined(this.me.id, {
            clientId: this.me.id,
            name: this.me.name,
            avatar: this.me.avatar
        });

        this.addEvent(event, false);
    }

    public init() {
        if (this.inited || !this.network || this.network.isDisconnected()) {
            return;
        }

        this.setupLoop();
        this.startLoop();
        this.inited = true;
    }

    public destroy() {
        if (!this.inited || (this.network && this.network.isDisconnected())) {
            return;
        }

        this.stopLoop();
        this.network.disconnect();
    }

    public isDestroyed() {
        return this.network.isDisconnected();
    }

    public initKeyboard(element: HTMLElement) {
        if (!this.keyboard) {
            this.keyboard = new Keyboard((key, state) => {
                let event = new Keypress(this.me.id, { key, state, clientId: this.me.id });
                this.addEvent(event);
            });
        }

        this.keyboard.bindTo(element);
    }

    public initRenderer() {
        if (this.renderer instanceof Renderer) {
            this.renderer.attach();
        }
    }

    public start() {
        this.addEvent(new StartGame(this.me.id));
    }

    public stop() {
        this.addEvent(new StopGame(this.me.id));
    }

    public addEvent(event: Event, send: boolean = true) {
        this.simulator.addEvent(event);

        if (send) {
            this.network.sendMsg(event.toMessage());
        }
    }

    public createPlayer(clientId: number, name: string) {
        return new Player(clientId, name);
    }

    public createPlayerDisc(player: Player): Disc {
        if (!player.team) {
            return;
        }

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
        disc.isMe = player.clientId == this.me.id;
        disc.text = player.avatar;

        return disc;
    }

    public createPlayerDiscs(state: State) {
        let discs: Disc[] = [];

        for (let player of state.players) {
            let disc = this.createPlayerDisc(player);

            if (!disc) {
                continue;
            }

            player.discId = disc.id;
            discs.push(disc);
        }

        state.addDiscs(discs);
    }

    public kickOffState(state: State) {
        if (!state.playing) {
            return;
        }

        state.matchState = States.Kickoff;

        this.setKickOffPositions(state);

        state.discs.filter(disc => disc.isBall)
            .forEach(ball => {
                ball.position = new Vec(0, 0);
                ball.velocity = new Vec(0, 0);
            });
    }

    private setKickOffPositions(state: State) {
        if (!state.playing) {
            return;
        }

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

    public goalScored(goal: Goal, state: State) {
        let team = state.stadium.getTeam(goal.teamScored);

        if (state.matchState != States.Inplay || !team) {
            return;
        }

        state.scores.set(team.name, state.scores.get(team.name) + 1);
        state.matchState = States.GoalScored;
        state.matchStateTimer = 150;

        this.eventApi.publish('goalScored', { goal, state });
    }

    public scoresEqual() {
        let state = this.simulator.currentState;

        let scores = state.stadium.teams.map(team => {
            return state.scores.get(team.name);
        });

        return scores.every(score => score == scores[0]);
    }

    public update(state: State) {
        switch (state.matchState) {
            case States.Kickoff:
                state.discs.filter(disc => disc.isBall)
                    .forEach(ball => {
                        if (ball.velocity.x != 0 || ball.velocity.y != 0) {
                            state.matchState = States.Inplay;
                        }
                    });

                break;

            case States.Inplay:
                state.timer += 1 / 60;

                if (state.timer >= state.timeLimit * 60 && !this.scoresEqual()) {
                    state.matchState = States.EndGame;
                    state.matchStateTimer = 300;
                }

                break;

            case States.GoalScored:
                --state.matchStateTimer;

                if (state.matchStateTimer > 0) {
                    return;
                }

                if (state.timer >= state.timeLimit * 60 && !this.scoresEqual()) {
                    state.matchState = States.EndGame;
                    state.matchStateTimer = 300;
                    return;
                }

                for (let team of state.stadium.teams) {
                    let score = state.scores.get(team.name);

                    if (score && score >= state.scoreLimit) {
                        state.matchState = States.EndGame;
                        state.matchStateTimer = 300;
                        return;
                    }
                }

                state.matchState = States.Kickoff;
                this.kickOffState(state);

                break;

            case States.EndGame:
                --state.matchStateTimer;

                if (state.matchStateTimer <= 0) {
                    this.stop();
                }

                break;
        }
    }

    private setupLoop() {
        MainLoop.setUpdate(() => {
            this.simulator.advance();
        });

        MainLoop.setDraw(() => {
            if (this.renderer) {
                this.renderer.draw(this.simulator.currentState);
            }
        });
    }

    public startLoop() {
        MainLoop.start();
    }

    public stopLoop() {
        MainLoop.stop();
    }

    public getSimulator() {
        return this.simulator;
    }

    public getEventApi() {
        return this.eventApi;
    }

    public setNetwork(network: AbstractNetwork) {
        this.network = network;
    }

    public getMe() {
        return this.me;
    }

    public setMe(me: LocalPlayerInfo) {
        this.me = me;
    }

    public get state(): State {
        return this.simulator.currentState;
    }
}
