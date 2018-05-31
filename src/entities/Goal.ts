import Vec from 'victor';
import Line from 'entities/Line';

export interface JsonGoal {
    p0: number[];
    p1: number[];
    teamScored: string;
}

export default class Goal extends Line {
    public constructor(public p0: Vec, public p1: Vec, public teamScored: string) {
        super(p0, p1);
    }

    public clone(): Goal {
        return new Goal(this.p0.clone(), this.p1.clone(), this.teamScored);
    }

    public pack(): JsonGoal {
        return {
            p0: this.p0.toArray(),
            p1: this.p1.toArray(),
            teamScored: this.teamScored
        };
    }

    public static parse(obj: JsonGoal): Goal {
        return new Goal(Vec.fromArray(obj.p0), Vec.fromArray(obj.p1), obj.teamScored);
    }
}
