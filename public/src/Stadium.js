import Vec from 'maxkueng/victor';

import Background from './entities/Background';
import Disc from './entities/Disc';
import Goal from './entities/Goal';
import Segment from './entities/Segment';

export default class Stadium {
    backgrounds = [];
    discs = [];
    goals = [];
    planes = [];
    segments = [];
    teams = [];

    constructor(json) {
        this.teams = json.teams;

        this.backgrounds = json.backgrounds.map(obj => {
            let background = new Background(Vec.fromArray(obj.pos), obj.width, obj.height, obj.type);
            background.load();
            return background;
        });

        /*this.discs = json.discs.map(obj => {
            let pos = Vec.fromArray(obj.pos);

            let disc = new Disc(pos, obj.radius, {
                color: obj.color,
                damping: obj.damping,
                invMass: obj.invMass
            });

            disc.isBall = obj.ball;
            return disc;
        });*/

        this.discs = json.discs.map(obj => Disc.parse(obj));

        this.segments = json.segments.map(obj => {
            let start = Vec.fromArray(obj.p0);
            let end = Vec.fromArray(obj.p1);

            let segment = new Segment(start, end);

            if (obj.bounce) {
                segment.bounce = obj.bounce;
            }

            return segment;
        });

        this.goals = json.goals.map(obj => {
            let start = Vec.fromArray(obj.p0);
            let end = Vec.fromArray(obj.p1);

            return new Goal(start, end, obj.team);
        });
    }

    pack() {
        return {
            backgrounds: this.backgrounds.map(background => background.pack()),
            discs: this.discs.map(disc => disc.pack()),
            goals: this.goals.map(goal => goal.pack()),
            segments: this.segments.map(segment => segment.pack()),
            teams: this.teams
        };
    }

    getTeam(name) {
        return this.teams.find(team => team.name == name);
    }
}
