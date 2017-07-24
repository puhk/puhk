import { EventAggregator } from 'aurelia-event-aggregator';
import Vec from 'victor';

import * as Events from './events';
import Event, { JsonEvent } from './Event';
import { GoalScored } from '../Engine';

import Stadium, { JsonStadium, JsonTeam } from '../entities/Stadium';
import ChatMessage from '../entities/ChatMessage';
import Disc, { JsonDisc } from '../entities/Disc';
import Goal from '../entities/Goal';
import Player, { JsonPlayer } from '../entities/Player';

export const enum States {
    Kickoff = 0,
    Inplay = 1,
    GoalScored = 2,
    EndGame = 3
}

export interface JsonState {
    frame: number,
    roomName: string,
    scores: [string, number][],
    scoreLimit: number,
    timer: number,
    timeLimit: number,
    playing: boolean,
    matchState: States,
    matchStateTimer: number,

    stadium: JsonStadium,
    discs: JsonDisc[],
    players: JsonPlayer[],
    events: JsonEvent[]
}

export default class State {
    frame = 0;
    roomName = '';
    playing = false;

    discs: Disc[] = [];
    events: Event[] = [];
    players: Player[] = [];
    stadium: Stadium;

    chatMessages: ChatMessage[] = [];
    maxChatMessages = 50;
    matchState: States = States.Kickoff;
    matchStateTimer = 0;
    scores: Map<string, number> = new Map;
    scoreLimit = 3;
    timer = 0;
    timeLimit = 3;

    initScores() {
        this.stadium.teams.forEach(team => {
            this.scores.set(team.name, 0);
        });
    }

    public scoresEqual() {
        const scores = this.stadium.teams.map(team => {
            return this.scores.get(team.name);
        });

        return scores.every(score => score == scores[0]);
    }

    public update(eventApi: EventAggregator, goalsScored: GoalScored[]) {
        switch (this.matchState) {
            case States.Kickoff:
                this.discs.filter(disc => disc.isBall)
                    .forEach(ball => {
                        if (ball.velocity.x != 0 || ball.velocity.y != 0) {
                            this.matchState = States.Inplay;
                        }
                    });

                break;

            case States.Inplay:
                this.timer += 1 / 60;

                for (const goalScored of goalsScored) {
                    this.goalScored(goalScored.goal, eventApi);
                }

                if (this.timer >= this.timeLimit * 60 && !this.scoresEqual()) {
                    this.matchState = States.EndGame;
                    this.matchStateTimer = 300;
                }

                break;

            case States.GoalScored:
                --this.matchStateTimer;

                if (this.matchStateTimer > 0) {
                    return;
                }

                if (this.timer >= this.timeLimit * 60 && !this.scoresEqual()) {
                    this.matchState = States.EndGame;
                    this.matchStateTimer = 300;
                    return;
                }

                for (let team of this.stadium.teams) {
                    let score = this.scores.get(team.name);

                    if (score && score >= this.scoreLimit) {
                        this.matchState = States.EndGame;
                        this.matchStateTimer = 300;
                        return;
                    }
                }

                this.matchState = States.Kickoff;
                this.kickOffState();

                break;

            case States.EndGame:
                --this.matchStateTimer;

                if (this.matchStateTimer <= 0) {
                    return new Events.StopGame;
                }

                break;
        }
    }

    public kickOffState() {
        if (!this.playing) {
            return;
        }

        this.matchState = States.Kickoff;
        this.setKickOffPositions();

        this.discs.filter(disc => disc.isBall)
            .forEach(ball => {
                ball.position = new Vec(0, 0);
                ball.velocity = new Vec(0, 0);
            });
    }

    private setKickOffPositions() {
        if (!this.playing) {
            return;
        }

        this.players.forEach(player => {
            let disc = this.getPlayerDisc(player);
            let team = this.stadium.getTeam(player.team);

            if (!disc || !team) {
                return;
            }

            disc.position = Vec.fromArray(team.kickOffPos);
            disc.velocity = new Vec(0, 0);
        });
    }

    public goalScored(goal: Goal, eventApi: EventAggregator) {
        const team = this.stadium.getTeam(goal.teamScored);

        if (this.matchState !== States.Inplay || !team) {
            return;
        }

        this.scores.set(team.name, this.scores.get(team.name) + 1);
        this.matchState = States.GoalScored;
        this.matchStateTimer = 150;

        eventApi.publish('goalScored', { state: this, goal });
    }

    public createPlayerDisc(player: Player): Disc {
        if (!player.team) {
            return;
        }

        const team = this.stadium.getTeam(player.team);

        if (player.team === null || !team) {
            return;
        }

        const disc = new Disc(new Vec(0, 0), this.stadium.playerPhysics.radius, {
            color: team.color,
            damping: this.stadium.playerPhysics.damping,
            invMass: this.stadium.playerPhysics.invMass
        });

        disc.kickStrength = this.stadium.playerPhysics.kickStrength;
        // disc.isMe = player.clientId == this.me.id;
        disc.text = player.avatar;

        return disc;
    }

    public createPlayerDiscs() {
        let discs: Disc[] = [];

        for (let player of this.players) {
            let disc = this.createPlayerDisc(player);

            if (disc) {
                player.discId = disc.id;
                discs.push(disc);;
            }
        }

        this.addDiscs(discs);
    }

    addPlayers(...players: Player[]) {
        this.players = this.players.concat(players);
    }

    getPlayerById(id: number): Player {
        return this.players.find(player => player.clientId == id);
    }

    getPlayerFromDisc(discId: number): Player {
        return this.players.find(player => player.discId == discId);
    }

    getTeamPlayers(team: JsonTeam) {
        return this.players.filter(player => player.team == team.name);
    }

    getTeamScore(team: JsonTeam) {
        return this.scores.get(team.name);
    }

    addDiscs(discs: Disc[]) {
        this.discs = this.discs.concat(discs);
    }

    addDisc(disc: Disc) {
        this.discs.push(disc);
    }

    removeDisc(disc: Disc) {
        this.discs.splice(this.discs.indexOf(disc), 1);
    }

    getPlayerDisc(player: Player): Disc {
        return this.discs.find(disc => disc.id == player.discId);
    }

    addChatMessage(chatMessage: ChatMessage) {
        this.chatMessages.push(chatMessage);

        if (this.chatMessages.length > this.maxChatMessages) {
            this.chatMessages.splice(0, this.chatMessages.length - this.maxChatMessages);
        }
    }

    clone(): State {
        let clone = new State;
        clone.frame = this.frame;
        clone.roomName = this.roomName;
        clone.stadium = this.stadium;
        clone.scores = new Map(this.scores);
        clone.scoreLimit = this.scoreLimit;
        clone.timer = this.timer;
        clone.timeLimit = this.timeLimit;
        clone.playing = this.playing;
        clone.matchState = this.matchState;
        clone.matchStateTimer = this.matchStateTimer;

        clone.chatMessages = [...this.chatMessages];
        clone.players = this.players.map(player => player.clone());
        clone.discs = this.discs.map(disc => disc.clone());

        return clone;
    }

    pack(): JsonState {
        return {
            frame: this.frame,
            roomName: this.roomName,
            discs: this.discs.map(disc => disc.pack()),
            events: this.events.map(event => event.pack()),
            players: this.players.map(player => player.pack()),
            stadium: this.stadium.pack(),
            scores: Array.from(this.scores),
            scoreLimit: this.scoreLimit,
            timer: this.timer,
            timeLimit: this.timeLimit,
            playing: this.playing,
            matchState: this.matchState,
            matchStateTimer: this.matchStateTimer
        };
    }

    static parse(json: JsonState) {
        let state = new State;
        state.frame = json.frame;
        state.roomName = json.roomName;
        state.stadium = Stadium.parse(json.stadium);
        state.scores = new Map(json.scores);
        state.scoreLimit = json.scoreLimit;
        state.timer = json.timer;
        state.timeLimit = json.timeLimit;
        state.playing = json.playing;
        state.matchState = json.matchState;
        state.matchStateTimer = json.matchStateTimer;

        state.players = json.players.map(obj => Player.parse(obj));
        state.discs = json.discs.map(obj => Disc.parse(obj));

        state.events = json.events.map(e => {
            let event = Events[e.eventType].parse(e.sender, e.data);
            event.frame = e.frame;
            return event;
        });

        return state;
    }
}
