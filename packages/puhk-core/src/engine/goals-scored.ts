import flatMap from 'lodash/flatMap';

import { discDistanceToLine } from './segment-collision';
import Disc from '../entities/Disc';
import { Goal } from '../entities/Stadium';
import State from '../state/State';

export interface GoalScored {
	disc: Disc;
	goal: Goal;
}

const hasBallCrossedGoalLine = (ball: Disc, goal: Goal, previousBall?: Disc) => {
	if (!previousBall) {
		return false;
	}

	const distBall = discDistanceToLine(ball, goal);
	const prevDist = discDistanceToLine(previousBall, goal);

	if (distBall === false || prevDist === false) {
		return false;
	}

	return (prevDist[0] > 0 && distBall[0] < 0) || (prevDist[0] < 0 && distBall[0] > 0);
};

const findDiscFromPreviousState = (previousState: State, disc: Disc) => {
	return previousState.discs.find(d => d.id == disc.id);
};

export default function calculateGoalsScored(newState: State, previousState: State): GoalScored[] {
	return flatMap(newState.discs, (disc: Disc) => {
		const previousDisc = findDiscFromPreviousState(previousState, disc);
		return newState.stadium.goals
			.filter(goal => hasBallCrossedGoalLine(disc, goal, previousDisc))
			.map(goal => ({ disc, goal }));
	});
}
