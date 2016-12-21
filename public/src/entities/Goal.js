import Vec from 'maxkueng/victor';
import Segment from './segment';

export default class Goal extends Segment {
    constructor(p0, p1, teamScored) {
        super(p0, p1);
        this.teamScored = teamScored;
    }

    clone() {
        return new Goal(this.p0.clone(), this.p1.clone(), this.teamScored);
    }

    pack() {
        return {
            p0: this.p0.toArray(),
            p1: this.p1.toArray(),
            bounce: this.bounce,
            teamScored: this.teamScored
        };
    }

    static parse(obj) {
        return new Goal( Vec.fromArray(obj.p0),  Vec.fromArray(obj.p1), obj.teamScored);
    }
}
