import update from 'immutability-helper';
import Vec from 'victor';
import { curry } from 'lodash/fp';
import Disc from '../entities/Disc';
import Line from '../entities/Line';
import { Segment } from '../entities/Stadium';
import State from '../state/State';

export const handleDiscSegmentCollision = curry((disc: Disc, state: State, segment: Segment) => {
    const result = discDistanceToLine(disc, segment);

    if (result === false) {
        return state;
    }

    let [dist, normal] = result;

    // otherside
    if (dist < 0) {
        dist *= -1;
        normal.invert();
    }

    if (dist >= disc.radius) {
        return state;
    }

    const sep = normal.clone().multiplyScalar(disc.radius - dist);

    const movement = normal.dot(disc.velocity);
    let bounce: Nullable<Vec>;

    if (movement < 0) {
        const bounceFactor = movement * (disc.bounce * (segment.data.bounce || 1) + 1);
        bounce = normal.clone().multiplyScalar(bounceFactor);
    }

    const index = state.discs.findIndex(d => d.id === disc.id);

    return state = update(state, {
        discs: {
            [index]: {
                position: (pos: Vec) => pos.clone().add(sep),
                velocity: (vel: Vec) => bounce ? vel.clone().subtract(bounce) : vel
            }
        }
    });
});

export function discDistanceToLine(disc: Disc, line: Line): false | [number, Vec] {
    const lineDist = line.p1.clone().subtract(line.p0);
    let discToLine = disc.position.clone().subtract(line.p0);

    if (discToLine.dot(lineDist) < 0) {
        return false;
    }

    if (discToLine.dot(lineDist) > 0) {
        discToLine = disc.position.clone().subtract(line.p1);
    }

    if (discToLine.dot(lineDist) >= 0) {
        return false;
    }

    const direction = lineDist.clone().normalize();
    const normal = new Vec(-direction.y, direction.x);

    return [normal.dot(discToLine), normal];
}
