// @flow

import Vec from 'victor';

import Background from './entities/Background';
import Disc from './entities/Disc';
import Goal from './entities/Goal';
import Segment from './entities/Segment';

import type {JsonBackground} from './entities/Background';
import type {JsonDisc} from './entities/Disc';
import type {JsonGoal} from './entities/Goal';
import type {JsonSegment} from './entities/Segment';

export default class Stadium {
    backgrounds: Background[] = [];
    discs: Disc[] = [];
    goals: Goal[] = [];
    planes = [];
    segments: Segment[] = [];
    teams: JsonTeam[];
    playerPhysics: JsonPlayerPhysics;

    constructor(json: JsonStadium) {
        this.teams = json.teams;
        this.playerPhysics = json.player;

        this.backgrounds = json.backgrounds.map(obj => Background.parse(obj));
        this.discs = json.discs.map(obj => Disc.parse(obj));
        this.goals = json.goals.map(obj => Goal.parse(obj));
        this.segments = json.segments.map(obj => Segment.parse(obj));
    }

    pack(): JsonStadium {
        return {
            backgrounds: this.backgrounds.map(background => background.pack()),
            discs: this.discs.map(disc => disc.pack()),
            goals: this.goals.map(goal => goal.pack()),
            segments: this.segments.map(segment => segment.pack()),
            teams: this.teams,
            player: this.playerPhysics
        };
    }

    getTeam(name: ?string): ?JsonTeam {
        return this.teams.find(team => team.name == name);
    }

    getTeams() {
        return this.teams;
    }
}

export type JsonStadium = {
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
