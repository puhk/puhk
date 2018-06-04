import Vec from 'victor';

import Background, { JsonBackground } from '@src/entities/Background';
import Disc, { JsonDisc } from '@src/entities/Disc';
import Line from '@src/entities/Line';
import { Packable } from '@src/entities/Packable';

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
    kickOffPos: [number, number];
}

export interface JsonPlayerPhysics {
    acceleration: number;
    damping: number;
    kickingAcceleration: number;
    kickStrength: number;
    invMass: number;
    radius: number;
}

export interface JsonGoal {
    p0: [number, number];
    p1: [number, number];
    teamScored: string;
}

export interface JsonSegment {
    p0: [number, number];
    p1: [number, number];
    bounce?: number;
}

export type CameraConstraints = [number, number];

export default class Stadium implements Packable {
    public cameraConstraints: CameraConstraints = [0, 0];
    public backgrounds: Background[] = [];
    public discs: Disc[] = [];
    public goals: Line<JsonGoal>[] = [];
    public segments: Line<JsonSegment>[] = [];
    public teams: JsonTeam[] = [];
    public playerPhysics!: JsonPlayerPhysics;

    constructor(public name: string) {}

    public getTeam(name: string): JsonTeam | undefined {
        return this.teams.find(team => team.name == name);
    }

    public getTeams() {
        return this.teams;
    }

    public pack(): JsonStadium {
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

    public static parse(json: JsonStadium) {
        const stadium = new Stadium(json.name);
        stadium.cameraConstraints = json.cameraConstraints;
        stadium.teams = json.teams;
        stadium.playerPhysics = json.player;

        stadium.backgrounds = json.backgrounds.map(obj => Background.parse(obj));
        stadium.discs = json.discs.map(obj => Disc.parse(obj));
        stadium.goals = json.goals.map(obj => Line.parse(obj));
        stadium.segments = json.segments.map(obj => Line.parse(obj));

        return stadium;
    }
}
