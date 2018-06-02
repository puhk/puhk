import Vec from 'victor';
import Disc from 'entities/Disc';
import Line from 'entities/Line';
import { JsonSegment } from 'entities/Stadium';

export function handleDiscSegmentCollision(disc: Disc, segment: Line<JsonSegment>) {
    const result = discDistanceToLine(disc, segment);

    if (result === false) {
        return;
    }

    let [dist, normal] = result;

    // otherside
    if (dist < 0) {
        dist *= -1;
        normal.invert();
    }

    if (dist >= disc.radius) {
        return;
    }

    const sep = normal.clone().multiplyScalar(disc.radius - dist);
    disc.position.add(sep);

    const movement = normal.dot(disc.velocity);

    if (movement < 0) {
        const bounceFactor = movement * (disc.bounce * (segment.data.bounce || 1) + 1);
        const bounce = normal.clone().multiplyScalar(bounceFactor);

        disc.velocity.subtract(bounce);
    }
}

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
