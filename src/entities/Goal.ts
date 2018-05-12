import Vec from 'victor';
import Line from 'entities/Line';

export interface JsonGoal {
    p0: number[];
    p1: number[];
    teamScored: string;
}

export default class Goal extends Line {
    teamScored: string;

    constructor(p0: Vec, p1: Vec, teamScored: string) {
        super(p0, p1);
        this.teamScored = teamScored;
    }

    clone(): Goal {
        return new Goal(this.p0.clone(), this.p1.clone(), this.teamScored);
    }

    pack(): JsonGoal {
        return {
            p0: this.p0.toArray(),
            p1: this.p1.toArray(),
            teamScored: this.teamScored
        };
    }

    static parse(obj: JsonGoal): Goal {
        return new Goal(Vec.fromArray(obj.p0), Vec.fromArray(obj.p1), obj.teamScored);
    }
}
