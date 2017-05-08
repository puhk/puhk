import Vec from 'victor';
import Line from './Line';

export interface JsonSegment {
    p0: number[],
    p1: number[],
    bounce?: number
}

export default class Segment extends Line {
    bounce: number;

    constructor(p0: Vec, p1: Vec, bounce: number = 1) {
        super(p0, p1);
        this.bounce = bounce;
    }

    clone(): Segment {
        return new Segment(this.p0.clone(), this.p1.clone(), this.bounce);
    }

    pack(): JsonSegment {
        return {
            p0: this.p0.toArray(),
            p1: this.p1.toArray(),
            bounce: this.bounce
        };
    }

    static parse(obj: JsonSegment): Segment {
        return new Segment(Vec.fromArray(obj.p0), Vec.fromArray(obj.p1), obj.bounce);
    }
}
