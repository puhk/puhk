import Vec from 'victor';

import { Event } from './event';
import * as Events from './event/events';
import { GoalScored } from '../engine';

import ChatMessage from '../entities/ChatMessage';
import Disc, { JsonDisc } from '../entities/Disc';
import Player, { JsonPlayer } from '../entities/Player';
import Stadium, { JsonStadium, JsonTeam, Goal } from '../entities/Stadium';

export const enum States {
    Kickoff = 0,
    Inplay = 1,
    GoalScored = 2,
    EndGame = 3
}

export interface JsonState {
    frame: number;
    roomName: string;
    scores: [string, number][];
    scoreLimit: number;
    timer: number;
    timeLimit: number;
    playing: boolean;
    matchState: States;
    matchStateTimer: number;

    stadium: JsonStadium;
    discs: JsonDisc[];
    players: JsonPlayer[];
}

export default class State {
    private maxChatMessages = 50;
    private matchState: States = States.Kickoff;
    private matchStateTimer = 0;

    public chatMessages: ChatMessage[] = [];
    public timer = 0;
    public frame = 0;
    public roomName = '';
    public playing = false;
    public scores: Map<string, number> = new Map;
    public scoreLimit = 3;
    public timeLimit = 3;

    public discs: Disc[] = [];
    public players: Player[] = [];

    public constructor(public stadium: Stadium) {}

    public startPlaying(): void {
        if (this.playing) {
            return;
        }

        this.initScores();
        this.createPlayerDiscs();

        this.timer = 0;
        this.playing = true;

        this.kickOffState();
    }

    public initScores(): void {
        this.stadium.teams.forEach(team => {
            this.scores.set(team.name, 0);
        });
    }

    public scoresEqual(): boolean {
        const scores = this.stadium.teams.map(team => {
            return this.scores.get(team.name);
        });

        return scores.every(score => score == scores[0]);
    }

    public update(goalsScored: GoalScored[]): Event | undefined {
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
                    this.goalScored(goalScored.goal);
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

                for (const team of this.stadium.teams) {
                    const score = this.scores.get(team.name);

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
                    return new Events.StopGame(this.frame);
                }

                break;
        }
    }

    private kickOffState(): void {
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

    private setKickOffPositions(): void {
        if (!this.playing) {
            return;
        }

        this.players.forEach(player => {
            const disc = this.getPlayerDisc(player);
            const team = this.stadium.getTeam(player.team);

            if (!disc || !team) {
                return;
            }

            disc.position = Vec.fromArray(team.kickOffPos);
            disc.velocity = new Vec(0, 0);
        });
    }

    public goalScored(goal: Goal): void {
        const team = this.stadium.getTeam(goal.data.teamScored);

        if (this.matchState !== States.Inplay || !team) {
            return;
        }

        this.scores.set(team.name, (this.scores.get(team.name) || 0) + 1);
        this.matchState = States.GoalScored;
        this.matchStateTimer = 150;
    }

    public createPlayerDisc(player: Player): Disc | undefined {
        if (!player.team) {
            return;
        }

        const team = this.stadium.getTeam(player.team);

        if (player.team === null || !team) {
            return;
        }

        const disc = new Disc(
            new Vec(0, 0),
            this.stadium.playerPhysics.radius,
            team.color,
            this.stadium.playerPhysics.damping,
            this.stadium.playerPhysics.invMass
        );

        disc.kickStrength = this.stadium.playerPhysics.kickStrength;
        // disc.isMe = player.clientId == this.me.id;
        disc.text = player.avatar;

        return disc;
    }

    private createPlayerDiscs(): void {
        const discs: Disc[] = [];

        for (const player of this.players) {
            const disc = this.createPlayerDisc(player);

            if (disc) {
                player.discId = disc.id;
                discs.push(disc);
            }
        }

        this.addDiscs(discs);
    }

    public addPlayers(...players: Player[]): void {
        this.players = this.players.concat(players);
    }

    public getPlayerById(id: number): Player | undefined {
        return this.players.find(player => player.clientId == id);
    }

    public getPlayerFromDisc(discId: number): Player | undefined {
        return this.players.find(player => player.discId == discId);
    }

    public getTeamPlayers(team: JsonTeam) {
        return this.players.filter(player => player.team == team.name);
    }

    public getTeamScore(team: JsonTeam) {
        return this.scores.get(team.name);
    }

    public addDiscs(discs: Disc[]): void {
        this.discs = this.discs.concat(discs);
    }

    public addDisc(disc: Disc): void {
        this.discs.push(disc);
    }

    public removeDisc(disc: Disc): void {
        this.discs.splice(this.discs.indexOf(disc), 1);
    }

    public getPlayerDisc(player: Player) {
        return this.discs.find(disc => disc.id == player.discId);
    }

    public addChatMessage(chatMessage: ChatMessage) {
        this.chatMessages.push(chatMessage);

        if (this.chatMessages.length > this.maxChatMessages) {
            this.chatMessages.splice(0, this.chatMessages.length - this.maxChatMessages);
        }
    }

    public clone(): State {
        const clone = new State(this.stadium);
        clone.frame = this.frame;
        clone.roomName = this.roomName;
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

    public pack(): JsonState {
        return {
            frame: this.frame,
            roomName: this.roomName,
            discs: this.discs.map(disc => disc.pack()),
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

    public static parse(json: JsonState) {
        const state = new State(Stadium.parse(json.stadium));
        state.frame = json.frame;
        state.roomName = json.roomName;
        state.scores = new Map(json.scores);
        state.scoreLimit = json.scoreLimit;
        state.timer = json.timer;
        state.timeLimit = json.timeLimit;
        state.playing = json.playing;
        state.matchState = json.matchState;
        state.matchStateTimer = json.matchStateTimer;

        state.players = json.players.map(obj => Player.parse(obj));
        state.discs = json.discs.map(obj => Disc.parse(obj));

        return state;
    }
}
