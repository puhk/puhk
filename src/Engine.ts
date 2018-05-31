import Vec from 'victor';

import Disc from 'entities/Disc';
import Line from 'entities/Line';
import Player from 'entities/Player';
import { JsonGoal, JsonSegment } from 'entities/Stadium';
import State from 'state/State';

export interface GoalScored {
    disc: Disc;
    goal: Line<JsonGoal>;
}

const prevBallPositions = new Map<number, Vec>();

export default function update(state: State): GoalScored[] {
    const stadium = state.stadium;
    const goalsScored: GoalScored[] = [];

    const applyPlayerMovement = (disc: Disc, player: Player) => {
        disc.kicking = player.keys.kick;

        const accel = stadium.playerPhysics[disc.kicking ? 'kickingAcceleration' : 'acceleration'];
        const move = new Vec(0, 0);

        if (player.keys.left) {
            move.x -= 1;
        }

        if (player.keys.right) {
            move.x += 1;
        }

        if (player.keys.up) {
            move.y -= 1;
        }

        if (player.keys.down) {
            move.y += 1;
        }

        if (move.x != 0 || move.y != 0) {
            disc.velocity.add(move.normalize().multiplyScalar(accel));
        }
    };

    state.discs.forEach((disc, i) => {
        const player = state.getPlayerFromDisc(disc.id);

        if (player) {
            applyPlayerMovement(disc, player);
        }

        disc.position.add(disc.velocity);
        disc.velocity.multiplyScalar(disc.damping);
    });

    state.discs.sort((a, b) => {
        return a.isBall ? 1 : -1;
    });

    state.discs.forEach((disc, i1) => {
        state.discs.forEach((disc2, i2) => {
            if (disc2 == disc || i1 >= i2) {
                return;
            }

            handleCircleCollision(state, disc, disc2);
        });

        state.stadium.segments.forEach(segment => {
            // quick hack until collision masks to prevent player/segment collision
            if (state.getPlayerFromDisc(disc.id)) {
                return;
            }

            handleSegmentCollision(disc, segment);
        });

        if (!disc.isBall) {
            return;
        }

        state.stadium.goals.forEach(goal => {
            if (checkGoal(disc, goal)) {
                goalsScored.push({ disc, goal });
            }
        });

        prevBallPositions.set(disc.id, disc.position.clone());
    });

    return goalsScored;
}

function handleCircleCollision(state: State, disc: Disc, disc2: Disc) {
    const distSq = disc.position.distanceSq(disc2.position);

    if (disc2.isBall && disc.position.distance(disc2.position) <= disc.radius + disc2.radius + 4) {
        const player = state.getPlayerFromDisc(disc.id);

        if (player && player.keys.kick) {
            kick(disc, disc2);
            player.keys.kick = false;
            disc.kicking = false;
        }
    }

    if (distSq <= Math.pow(disc.radius + disc2.radius, 2)) {
        collideCircles(disc, disc2);
    }
}

function collideCircles(disc: Disc, disc2: Disc) {
    const diff = disc.position.clone().subtract(disc2.position);
    const direction = diff.clone().normalize();
    const totalMass = disc.mass + disc2.mass;

    // reposition
    const total = disc.invMass + disc2.invMass;
    const overlap = disc.radius + disc2.radius - diff.length();
    const amount = overlap * (disc.invMass / total);

    disc.position.add(direction.clone().multiplyScalar(amount));
    disc2.position.subtract(direction.clone().multiplyScalar(overlap - amount));

    // bounce?
    const speedDiff = disc.velocity.clone().subtract(disc2.velocity);
    const dot = direction.dot(speedDiff);

    if (dot < 0) {
        const totalBounce = disc.bounce * disc2.bounce;
        const bounceDir = direction.clone().multiplyScalar(dot * (totalBounce + 1));

        const bounce1 = bounceDir.clone().multiplyScalar(disc.invMass / total);
        const bounce2 = bounceDir.clone().multiplyScalar(disc2.invMass / total);

        disc.velocity.subtract(bounce1);
        disc2.velocity.add(bounce2);
    }
}

function kick(disc: Disc, ball: Disc) {
    const direction = ball.position.clone()
        .subtract(disc.position)
        .normalize();

    const force = direction.multiplyScalar(disc.kickStrength * ball.invMass);
    ball.velocity.add(force);
}

function discDistanceToLine(disc: Disc, line: Line): false | [number, Vec] {
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

function handleSegmentCollision(disc: Disc, segment: Line<JsonSegment>) {
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

function checkGoal(ball: Disc, goal: Line<JsonGoal>) {
    if (!prevBallPositions.has(ball.id)) {
        return false;
    }

    const distBall = discDistanceToLine(ball, goal);
    const prevPos = prevBallPositions.get(ball.id)!;
    const prevDist = discDistanceToLine(new Disc(prevPos), goal);

    if (distBall === false || prevDist === false) {
        return false;
    }

    return (prevDist[0] > 0 && distBall[0] < 0) || (prevDist[0] < 0 && distBall[0] > 0);
}
