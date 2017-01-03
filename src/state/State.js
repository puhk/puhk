// @flow

import _ from 'lodash';
import Vec from 'victor';

import * as Events from './events';
import Stadium from '../Stadium';
import Disc from '../entities/Disc';
import Player from '../entities/Player';
import Segment from '../entities/Segment';

import type Event from './events/Event';
import type {JsonStadium, JsonTeam} from '../Stadium';
import type {JsonDisc} from '../entities/Disc';
import type {JsonPlayer} from '../entities/Player';

export default class State {
    static STATE_KICKOFF = 0;
    static STATE_INPLAY = 1;
    static STATE_GOALSCORED = 2;
    static STATE_ENDGAME = 3;

    discs: Disc[] = [];
    events: Event[] = [];
    frame = 0;
    players: Player[] = [];
    playing: boolean = false;
    stadium: Stadium;
    
    scores = {};
    scoreLimit = 3;

    timer = 0;
    timeLimit = 3;

    matchState = State.STATE_KICKOFF;
    matchStateTimer = 0;

    addPlayers(...players: Player[]) {
        this.players = this.players.concat(players);
    }

    getPlayerById(id: number): ?Player {
        return this.players.find(player => player.clientId == id);
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

    clone(): State {
        let clone = new State;
        clone.frame = this.frame;
        clone.stadium = this.stadium;
        clone.scoreLimit = this.scoreLimit;
        clone.scores = _.clone(this.scores);
        clone.timer = this.timer;
        clone.timeLimit = this.timeLimit;
        clone.playing = this.playing;
        clone.matchState = this.matchState;
        clone.matchStateTimer = this.matchStateTimer;

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
            scoreLimit: this.scoreLimit,
            scores: this.scores,
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
        state.stadium = new Stadium(json.stadium);
        state.scoreLimit = json.scoreLimit;
        state.scores = json.scores;
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

        stadium.teams.forEach(team => {
            state.scores[team.name] = 0;
        });

        return state;
    }
}

export type JsonState = {
    frame: number,
    scores: Object,
    scoreLimit: number,
    timer: number,
    timeLimit: number,
    playing: boolean,
    matchState: States,
    matchStateTimer: number,

    stadium: JsonStadium,
    discs: JsonDisc[],
    players: JsonPlayer[],
    events: Object[]
};

type States = 0 | 1 | 2 | 3;