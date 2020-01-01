import { createMock } from 'ts-auto-mock';
import Vec from 'victor';

import calculateGoalsScored from '../goals-scored';
import Disc from '../../entities/Disc';
import Stadium, { Goal } from '../../entities/Stadium';
import State from '../../state/State';

it.each([
    [new Vec(0, -10), new Vec(0, 10), new Vec(-5, 0), new Vec(5, 0)],
    [new Vec(0, 5), new Vec(0, -5), new Vec(2, 0), new Vec(-2, 0)],
    [new Vec(8, 0), new Vec(-8, 0), new Vec(0, 2), new Vec(0, -2)],
    [new Vec(-2, 0), new Vec(5, 0), new Vec(0, -4), new Vec(0, 1)],
    [new Vec(-3, -6), new Vec(2, 5), new Vec(-1, 2), new Vec(3, -1)],
    [new Vec(7, -2), new Vec(-3, 5), new Vec(5, 1), new Vec(-2, 1)],
])('returns goal scored if ball crosses goal line', (p0, p1, d1, d2) => {
    const goal = createMock<Goal>({ p0, p1 });

    const oldState = createMock<State>({
        discs: [createMock<Disc>({ position: d1 })],
        stadium: createMock<Stadium>({ goals: [goal] })
    });

    const newState = createMock<State>({
        ...oldState,
        discs: [createMock<Disc>({ position: d2 })],
    });

    const goalsScored = calculateGoalsScored(newState, oldState);
    expect(goalsScored).toHaveLength(1);
});
