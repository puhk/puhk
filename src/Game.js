// @flow

import MainLoop from 'mainloop.js';
import Vec from 'victor';
import {EventAggregator} from 'aurelia-event-aggregator';

import Keyboard from './Keyboard';
import Renderer from './Renderer';

import State from './state/State';

import {
    ChangeStadium,
    ChangeTeam,
    Keypress,
    PlayerAvatar,
    PlayerChat,
    PlayerJoined,
    StartGame,
    StopGame
} from './state/events';

import Disc from './entities/Disc';
import Player from './entities/Player';

import type NetworkHost from './network/Host';
import type NetworkClient from './network/Client';
import type Event from './state/Event';
import type Simulator from './state/Simulator';
import type Goal from './entities/Goal';
import type Stadium from './entities/Stadium';

export default class Game {
    keyboard: ?Keyboard;
    network: NetworkHost | NetworkClient;
    renderer: ?Renderer;
    simulator: Simulator;
    eventAggregator: EventAggregator;

    inited = false;

    me: LocalPlayerInfo = {
        id: -1,
        name: '',
        avatar: ''
    };

    constructor(simulator: Simulator, renderer?: Renderer) {
        this.simulator = simulator;
        this.renderer = renderer;
        this.eventAggregator = new EventAggregator;
    }

    setLocalPlayer(playerInfo: PlayerInfo) {
        if (this.inited) {
            throw new Error('Game already init');
        }

        this.me.name = playerInfo.name;
        this.me.avatar = playerInfo.avatar;
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

    initKeyboard(element: HTMLElement) {
        if (!this.keyboard) {
            const handler = (key, state) => {
                let event = new Keypress(this.me.id, {key, state, clientId: this.me.id});
                this.addEvent(event);
            };

            this.keyboard = new Keyboard(handler);
        }

        this.keyboard.bindTo(element);
    }

    initRenderer() {
        if (this.renderer instanceof Renderer) {
            this.renderer.render();
        }
    }

    addEvent(event: Event, send?: boolean) {
        this.simulator.addEvent(event);

        if (send) {
            this.network.sendMsg(event.toMessage());
        }
    }

    initLocalPlayer() {
        let event = new PlayerJoined(this.me.id, {
            clientId: this.me.id,
            name: this.me.name,
            avatar: this.me.avatar
        });

        this.addEvent(event, false);
    }

    createPlayer(clientId: number, name: string) {
        return new Player(clientId, name);
    }

    createPlayerDisc(player: Player): ?Disc {
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

    createPlayerDiscs(state: State) {
        let discs: Disc[] = [];

        for (let player of state.players) {
            let disc = this.createPlayerDisc(player);

            if (!disc) {
                return;
            }

            player.discId = disc.id;
            discs.push(disc);
        }

        state.addDiscs(discs);
    }

    kickOffState(state: State) {
        if (!state.playing) {
            return;
        }

        state.matchState = State.STATE_KICKOFF;

        this.setKickOffPositions(state);

        state.discs.filter(disc => disc.isBall)
            .forEach(ball => {
                ball.position = new Vec(0, 0);
                ball.velocity = new Vec(0, 0);
            });
    }

    setKickOffPositions(state: State) {
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

    goalScored(goal: Goal, state: State) {
        let team = state.stadium.getTeam(goal.teamScored);

        if (state.matchState != State.STATE_INPLAY || !team) {
            return;
        }

        state.scores.set(team.name, state.scores.get(team.name) + 1);
        state.matchState = State.STATE_GOALSCORED;
        state.matchStateTimer = 150;

        this.eventAggregator.publish('goalScored', {goal, state});
    }

    scoresEqual(state: State) {
        let scores = state.stadium.teams.map(team => {
            return state.scores.get(team.name);
        });

        return scores.every(score => score == scores[0]);
    }

    update(state: State) {
        switch (state.matchState) {
            case State.STATE_KICKOFF:
                state.discs.filter(disc => disc.isBall)
                    .forEach(ball => {
                        if (ball.velocity.x != 0 || ball.velocity.y != 0) {
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

                if (state.timer >= state.timeLimit * 60 && !this.scoresEqual(state)) {
                    state.matchState = State.STATE_ENDGAME;
                    state.matchStateTimer = 300;
                    return;
                }

                for (let team of state.stadium.teams) {
                    let score = state.scores.get(team.name);

                    if (score && score >= state.scoreLimit) {
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

                if (state.matchStateTimer <= 0) {
                    this.stop();
                }

                break;
        }
    }

    setupLoop() {
        MainLoop.setUpdate(() => {
            this.simulator.advance();
        });

        MainLoop.setDraw(() => {
            if (this.renderer) {
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

    /** API */

    start() {
        this.addEvent(new StartGame(this.me.id));
    }

    stop() {
        this.addEvent(new StopGame(this.me.id));
    }

    isPlaying() {
        return this.simulator.currentState.playing;
    }

    getPlayerById(id: number) {
        return this.simulator.currentState.getPlayerById(id);
    }

    getTeams() {
        return this.simulator.currentState.stadium.getTeams();
    }

    getTeamPlayers(name: string) {
        let state = this.simulator.currentState;
        let team = state.stadium.getTeam(name);
        return team && state.getTeamPlayers(team);
    }

    getTimer() {
        return this.simulator.currentState.timer;
    }

    getScore(team: string) {
        return this.simulator.currentState.scores.get(team);
    }

    getScores() {
        return this.simulator.currentState.scores;
    }

    movePlayerToTeam(clientId: number, team: ?string) {
        this.addEvent(new ChangeTeam(this.me.id, {clientId, team}))
    }

    getChatMessages() {
        return this.simulator.currentState.chatMessages;
    }

    sendChatMessage(message: string) {
        this.addEvent(new PlayerChat(this.me.id, {message}));
    }

    changeStadium(stadium: Stadium) {
        this.addEvent(new ChangeStadium(this.me.id, {stadium}));
    }

    changeAvatar(avatar: string) {
        this.addEvent(new PlayerAvatar(this.me.id, {avatar}));
    }
}

type PlayerInfo = {
    name: string,
    avatar: string
};

type LocalPlayerInfo = PlayerInfo & {
    id: number
};
