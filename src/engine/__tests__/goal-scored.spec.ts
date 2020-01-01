import { createMock } from 'ts-auto-mock';
import Vec from 'victor';

import calculateGoalsScored from '../goals-scored';
import Disc from '../../entities/Disc';
import Stadium, { Goal } from '../../entities/Stadium';
import State from '../../state/State';

it('returns goal scored if ball crosses goal left -> right', () => {
    const goal = createMock<Goal>({
        p0: new Vec(0, -10),
        p1: new Vec(0, 10),
    });

    const oldState = createMock<State>({
        discs: [
            createMock<Disc>({
                position: new Vec(-5, 0)
            })
        ],
        stadium: createMock<Stadium>({
            goals: [goal]
        })
    });

    const newState = createMock<State>({
        ...oldState,
        discs: [
            createMock<Disc>({
                position: new Vec(5, 0)
            })
        ],
    });

    const goalsScored = calculateGoalsScored(newState, oldState);
    expect(goalsScored).toHaveLength(1);
});
