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
])('returns goal scored if ball crosses goal line %#', (p0, p1, d1, d2) => {
	const goalsScored = calculate(
		[createMock<Goal>({ p0, p1 })],
		[createMock<Disc>({ position: d1 })],
		[createMock<Disc>({ position: d2 })]
	);
	expect(goalsScored).toHaveLength(1);
});

it('returns 2 goals scored if 2 balls cross goal line', () => {
	const goalsScored = calculate(
		[
			createMock<Goal>({
				p0: new Vec(0, 10),
				p1: new Vec(0, -10),
			}),
		],
		[createMock<Disc>({ id: 0, position: new Vec(-3, 7) }), createMock<Disc>({ id: 1, position: new Vec(-2, -5) })],
		[createMock<Disc>({ id: 0, position: new Vec(2, 3) }), createMock<Disc>({ id: 1, position: new Vec(1, 1) })]
	);
	expect(goalsScored).toHaveLength(2);
});

it.each([
	[new Vec(0, -10), new Vec(0, 10), new Vec(-5, -12), new Vec(5, -12)],
	[new Vec(4, 0), new Vec(-4, 0), new Vec(-5, -5), new Vec(-5, 3)],
	[new Vec(4, 0), new Vec(-4, 0), new Vec(0, 2), new Vec(0, 0)],
])('returns no goal scored if ball hasnt crossed goal line %#', (p0, p1, d1, d2) => {
	const goalsScored = calculate(
		[createMock<Goal>({ p0, p1 })],
		[createMock<Disc>({ position: d1 })],
		[createMock<Disc>({ position: d2 })]
	);
	expect(goalsScored).toHaveLength(0);
});

const calculate = (goals: Goal[], oldDiscs: Disc[], newDiscs: Disc[]) => {
	const oldState = createMock<State>({
		discs: oldDiscs,
		stadium: createMock<Stadium>({ goals }),
	});

	const newState = createMock<State>({
		...oldState,
		discs: newDiscs,
	});

	return calculateGoalsScored(newState, oldState);
};
