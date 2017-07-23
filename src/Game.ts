import { EventAggregator } from 'aurelia-event-aggregator';
import { autobind } from 'core-decorators';
import Vec from 'victor';

import Engine from 'Engine';
import Disc from './entities/Disc';
import Goal from './entities/Goal';
import Player from './entities/Player';
import Stadium from './entities/Stadium';
import Simulator from './state/Simulator';
import State, { States } from './state/State';
import StopGame from './state/events/StopGame';

export default class Game {
    public constructor(private simulator: Simulator, private engine: Engine, private eventApi: EventAggregator) {}

    public initEngineListeners() {
        this.engine.on('goalScored', this.goalScored);
        this.engine.on('update', this.update);
    }

    public createPlayer(clientId: number, name: string) {
        return new Player(clientId, name);
    }

    public createPlayerDisc(state: State, player: Player): Disc {
        if (!player.team) {
            return;
        }

        const team = state.stadium.getTeam(player.team);

        if (player.team === null || !team) {
            return;
        }

        const disc = new Disc(new Vec(0, 0), state.stadium.playerPhysics.radius, {
            color: team.color,
            damping: state.stadium.playerPhysics.damping,
            invMass: state.stadium.playerPhysics.invMass
        });

        disc.kickStrength = state.stadium.playerPhysics.kickStrength;
        // disc.isMe = player.clientId == this.me.id;
        disc.text = player.avatar;

        return disc;
    }

    public createPlayerDiscs(state: State) {
        let discs: Disc[] = [];

        for (let player of state.players) {
            let disc = this.createPlayerDisc(state, player);

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

    @autobind
    private goalScored(state: State, goal: Goal) {
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

    @autobind
    private update(state: State) {
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
                    this.simulator.addEvent(new StopGame);
                }

                break;
        }
    }

    public getEventApi() {
        return this.eventApi;
    }
}
