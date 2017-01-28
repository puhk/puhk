// @flow

import * as Events from './events';
import Stadium from '../entities/Stadium';
import ChatMessage from '../entities/ChatMessage';
import Disc from '../entities/Disc';
import Player from '../entities/Player';
import Segment from '../entities/Segment';

import type Event, {JsonEvent} from './Event';
import type {JsonStadium, JsonTeam} from '../entities/Stadium';
import type {JsonDisc} from '../entities/Disc';
import type {JsonPlayer} from '../entities/Player';

export default class State {
    static STATE_KICKOFF = 0;
    static STATE_INPLAY = 1;
    static STATE_GOALSCORED = 2;
    static STATE_ENDGAME = 3;

    frame = 0;
    playing = false;

    discs: Disc[] = [];
    events: Event[] = [];
    players: Player[] = [];
    stadium: Stadium;

    chatMessages: ChatMessage[] = [];
    maxChatMessages = 50;
    matchState = State.STATE_KICKOFF;
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

    addPlayers(...players: Player[]) {
        this.players = this.players.concat(players);
    }

    getPlayerById(id: number): ?Player {
        return this.players.find(player => player.clientId == id);
    }

    getPlayerFromDisc(discId: number): ?Player {
        return this.players.find(player => player.discId == discId);
    }

    getTeamPlayers(team: JsonTeam) {
        return this.players.filter(player => player.team == team.name);
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

    getPlayerDisc(player: Player): ?Disc {
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

    static createFromStadium(stadium: Stadium) {
        let state = new State;

        state.stadium = stadium;
        state.discs = stadium.discs.map(disc => disc.clone());
        state.initScores();

        return state;
    }
}

export type JsonState = {
    frame: number,
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
};

type States = 0 | 1 | 2 | 3;
