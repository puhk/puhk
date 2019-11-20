import Vec from 'victor';
import update from 'immutability-helper';
import flatMap from 'lodash/flatMap';
import flow from 'lodash/fp/flow';

import handleCircleCollision from './circle-collision';
import { discDistanceToLine, handleDiscSegmentCollision } from './segment-collision';
import Disc from '../entities/Disc';
import Player from '../entities/Player';
import Stadium, { Goal } from '../entities/Stadium';
import State from '../state/State';
import { getPlayerFromDisc } from '../state/funcs/player';
import { Keys } from '../Keyboard';

export interface GoalScored {
    disc: Disc;
    goal: Goal;
}

const calculatePlayerMovementVector = (player: Player, stadium: Stadium) => {
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

const moveDisc = (state: State, disc: Disc, discIndex: number): State => {
    const player = getPlayerFromDisc(state, disc);
    let velocity = disc.velocity;

    if (player) {
        const movement = calculatePlayerMovementVector(player, state.stadium);

        if (movement.lengthSq() > 0) {
            velocity = velocity.clone().add(movement);
        }

        state = update(state, {
            discs: {
                [discIndex]: {
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
            [discIndex]: {
                position: (pos: Vec) => pos.clone().add(velocity),
                velocity: (vel: Vec) => vel.clone().multiplyScalar(disc.damping)
            }
        }
    });
};

const applyDiscsMovement = (state: State): State => state.discs.reduce(moveDisc, state);

const collideDiscs = (state: State): State => {
    const orderedDiscs = [...state.discs].sort(a => a.isBall ? 1 : -1);

    return orderedDiscs
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
};

const updateDiscPositions = flow(applyDiscsMovement, collideDiscs);

const prevBallPositions = new Map<number, Vec>();

const calculateGoalsScored = (state: State) => {
    return flatMap(state.discs, (disc: Disc) => {
        const goalsScored = state.stadium.goals
            .filter(goal => checkGoal(disc, goal))
            .map(goal => ({ disc, goal }));

        prevBallPositions.set(disc.id, disc.position.clone());
        return goalsScored;
    });
}

export default function run(state: State): [State, GoalScored[]] {
    const updatedState = updateDiscPositions(state);
    return [updatedState, calculateGoalsScored(updatedState)];
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
