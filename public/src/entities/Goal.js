import Segment from './segment';

export default class Goal extends Segment {
    constructor(p0, p1, team) {
        super(p0, p1);
        this.team = team;
    }

    clone() {
        return new Goal(this.p0.clone(), this.p1.clone(), this.team);
    }

    pack() {
        return {
            p0: this.p0.toArray(),
            p1: this.p1.toArray(),
            bounce: this.bounce,
            team: this.team
        };
    }
}
