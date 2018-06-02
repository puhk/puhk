import Vec from 'victor';

import handleCircleCollision from 'engine/circle-collision';
import { discDistanceToLine, handleDiscSegmentCollision } from 'engine/segment-collision';
import Disc from 'entities/Disc';
import Line from 'entities/Line';
import Player from 'entities/Player';
import { JsonGoal } from 'entities/Stadium';
import State from 'state/State';

export interface GoalScored {
    disc: Disc;
    goal: Line<JsonGoal>;
}

const prevBallPositions = new Map<number, Vec>();

export default function update(state: State): GoalScored[] {
    const stadium = state.stadium;
    let goalsScored: GoalScored[] = [];

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

        return move.normalize().multiplyScalar(accel);
    };

    state.discs.forEach((disc, i) => {
        const player = state.getPlayerFromDisc(disc.id);

        if (player) {
            disc.velocity.add(applyPlayerMovement(disc, player));
        }

        disc.position.add(disc.velocity);
        disc.velocity.multiplyScalar(disc.damping);
    });

    state.discs.sort((a, b) => a.isBall ? 1 : -1);

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

            handleDiscSegmentCollision(disc, segment);
        });

        if (!disc.isBall) {
            return;
        }

        goalsScored = [
            ...goalsScored,
            ...state.stadium.goals
                .filter(goal => checkGoal(disc, goal))
                .map(goal => ({ disc, goal }))
        ];

        prevBallPositions.set(disc.id, disc.position.clone());
    });

    return goalsScored;
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
