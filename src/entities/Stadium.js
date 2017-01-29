// @flow

import Vec from 'victor';

import Background from './Background';
import Disc from './Disc';
import Goal from './Goal';
import Segment from './Segment';

import type {JsonBackground} from './Background';
import type {JsonDisc} from './Disc';
import type {JsonGoal} from './Goal';
import type {JsonSegment} from './Segment';

export default class Stadium {
    name: string;
    backgrounds: Background[] = [];
    discs: Disc[] = [];
    goals: Goal[] = [];
    planes = [];
    segments: Segment[] = [];
    teams: JsonTeam[];
    playerPhysics: JsonPlayerPhysics;

    constructor(name: string) {
        this.name = name;
    }

    getTeam(name: ?string): ?JsonTeam {
        return this.teams.find(team => team.name == name);
    }

    getTeams() {
        return this.teams;
    }

    pack(): JsonStadium {
        return {
            name: this.name,
            backgrounds: this.backgrounds.map(background => background.pack()),
            discs: this.discs.map(disc => disc.pack()),
            goals: this.goals.map(goal => goal.pack()),
            segments: this.segments.map(segment => segment.pack()),
            teams: this.teams,
            player: this.playerPhysics
        };
    }

    static parse(json: JsonStadium) {
        let stadium = new Stadium(json.name);
        stadium.teams = json.teams;
        stadium.playerPhysics = json.player;

        stadium.backgrounds = json.backgrounds.map(obj => Background.parse(obj));
        stadium.discs = json.discs.map(obj => Disc.parse(obj));
        stadium.goals = json.goals.map(obj => Goal.parse(obj));
        stadium.segments = json.segments.map(obj => Segment.parse(obj));

        return stadium;
    }
}

export type JsonStadium = {
    name: string,
    backgrounds: JsonBackground[],
    discs: JsonDisc[],
    goals: JsonGoal[],
    player: JsonPlayerPhysics,
    segments: JsonSegment[],
    teams: JsonTeam[]
};

export type JsonTeam = {
    name: string,
    color: string,
    kickOffPos?: [number, number]
};

type JsonPlayerPhysics = {
    acceleration: number,
    damping: number,
    kickingAcceleration: number,
    kickStrength: number,
    invMass: number,
    radius: number
};
