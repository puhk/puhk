import Vec from 'victor';
import Line from 'entities/Line';

export interface JsonSegment {
    p0: number[];
    p1: number[];
    bounce?: number;
}

export default class Segment extends Line {
    public constructor(public p0: Vec,public p1: Vec, public bounce: number = 1) {
        super(p0, p1);
    }

    public clone(): Segment {
        return new Segment(this.p0.clone(), this.p1.clone(), this.bounce);
    }

    public pack(): JsonSegment {
        return {
            p0: this.p0.toArray(),
            p1: this.p1.toArray(),
            bounce: this.bounce
        };
    }

    public static parse(obj: JsonSegment): Segment {
        return new Segment(Vec.fromArray(obj.p0), Vec.fromArray(obj.p1), obj.bounce);
    }
}
