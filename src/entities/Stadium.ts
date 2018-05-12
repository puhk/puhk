import Vec from 'victor';

import Background, { JsonBackground } from 'entities/Background';
import Disc, { JsonDisc } from 'entities/Disc';
import Goal, { JsonGoal } from 'entities/Goal';
import Segment, { JsonSegment } from 'entities/Segment';
import { Packable } from 'entities/Packable';

export interface JsonStadium {
    name: string;
    cameraConstraints: CameraConstraints;
    backgrounds: JsonBackground[];
    discs: JsonDisc[];
    goals: JsonGoal[];
    player: JsonPlayerPhysics;
    segments: JsonSegment[];
    teams: JsonTeam[];
}

export interface JsonTeam {
    name: string;
    color: string;
    kickOffPos?: [number, number];
}

export interface JsonPlayerPhysics {
    acceleration: number;
    damping: number;
    kickingAcceleration: number;
    kickStrength: number;
    invMass: number;
    radius: number;
}

export type CameraConstraints = [number, number];

export default class Stadium implements Packable {
    name: string;
    cameraConstraints: CameraConstraints = [0, 0];
    backgrounds: Background[] = [];
    discs: Disc[] = [];
    goals: Goal[] = [];
    segments: Segment[] = [];
    teams: JsonTeam[];
    playerPhysics: JsonPlayerPhysics;

    constructor(name: string) {
        this.name = name;
    }

    getTeam(name: string): JsonTeam {
        return this.teams.find(team => team.name == name);
    }

    getTeams() {
        return this.teams;
    }

    pack(): JsonStadium {
        return {
            name: this.name,
            cameraConstraints: this.cameraConstraints,
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
        stadium.cameraConstraints = json.cameraConstraints;
        stadium.teams = json.teams;
        stadium.playerPhysics = json.player;

        stadium.backgrounds = json.backgrounds.map(obj => Background.parse(obj));
        stadium.discs = json.discs.map(obj => Disc.parse(obj));
        stadium.goals = json.goals.map(obj => Goal.parse(obj));
        stadium.segments = json.segments.map(obj => Segment.parse(obj));

        return stadium;
    }
}
