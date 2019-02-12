import Vec from 'victor';
import update from 'immutability-helper';
import flatMap from 'lodash/flatMap';

import handleCircleCollision from './circle-collision';
import { discDistanceToLine, handleDiscSegmentCollision } from './segment-collision';
import Disc from '../entities/Disc';
import Player from '../entities/Player';
import { Goal } from '../entities/Stadium';
import State from '../state/State';
import { getPlayerFromDisc } from '../state/funcs/player';
import { Keys } from '../Keyboard';

export interface GoalScored {
    disc: Disc;
    goal: Goal;
}

const prevBallPositions = new Map<number, Vec>();

export default function run(state: State): [State, GoalScored[]] {
    const stadium = state.stadium;

    const applyPlayerMovement = (player: Player) => {
        const accel = stadium.playerPhysics[player.keys[Keys.kick] ? 'kickingAcceleration' : 'acceleration'];
        const move = new Vec(
            +player.keys[Keys.right] - +player.keys[Keys.left],
            +player.keys[Keys.down] - +player.keys[Keys.up]
        );

        if (move.lengthSq() === 0) {
            return move;
        }

        return move.normalize().multiplyScalar(accel);
    };

    state = state.discs.reduce((state, disc, i) => {
        const player = getPlayerFromDisc(state, disc);
        let velocity = disc.velocity;

        if (player) {
            const movement = applyPlayerMovement(player);

            if (movement.lengthSq() > 0) {
                velocity = velocity.clone().add(movement);
            }

            state = update(state, {
                discs: {
                    [i]: {
                        $merge: {
                            borderFlash: player.keys[Keys.kick],
                            velocity
                        }
                    }
                }
            });
        }

        return update(state, {
            discs: {
                [i]: {
                    position: (pos: Vec) => pos.clone().add(velocity),
                    velocity: (vel: Vec) => vel.clone().multiplyScalar(disc.damping)
                }
            }
        });
    }, state);

    const orderedDiscs = [...state.discs].sort(a => a.isBall ? 1 : -1);

    state = orderedDiscs
        .map(disc => disc.id)
        .reduce((state, id, i1) => {
            const disc = orderedDiscs.find(disc => disc.id === id)!;
            const shouldCollide = (disc2: Disc, i2: number) => disc2 !== disc && i1 < i2;

            state = orderedDiscs
                .filter(shouldCollide)
                .reduce(handleCircleCollision(disc), state);

            // quick hack until collision masks to prevent player/segment collision
            if (getPlayerFromDisc(state, disc)) {
                return state;
            }

            return state.stadium.segments.reduce(handleDiscSegmentCollision(disc), state);
        }, state);

    const goalsScored = flatMap(state.discs, (disc: Disc) => {
        const goalsScored = state.stadium.goals
            .filter(goal => checkGoal(disc, goal))
            .map(goal => ({ disc, goal }));

        prevBallPositions.set(disc.id, disc.position.clone());
        return goalsScored;
    });

    return [state, goalsScored];
}

function checkGoal(ball: Disc, goal: Goal) {
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
