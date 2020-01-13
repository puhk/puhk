import update from 'immutability-helper';
import { MatchStates, updateMatchState } from '../MatchStates';
import State from '../State';
import { isTimeUp, setEndGameState } from '../funcs/end-game';
import calculateGoalsScored, { GoalScored } from '../../engine/goals-scored';
import { JsonTeam } from '../../entities/Stadium';

const mapGoalsScoredToTeamScores = (goalsScored: GoalScored[], state: State): [string, number][] => {
	return goalsScored
		.map(goalScored => state.stadium.getTeam(goalScored.goal.data.teamScored))
		.filter((team): team is JsonTeam => !!team)
		.map(team => [team.name, state.scores.get(team.name)! + 1]);
};

export default (state: State, previousState: State) => {
	const scores = mapGoalsScoredToTeamScores(calculateGoalsScored(state, previousState), state);

	const newState = update(state, {
		timer: { $set: state.timer + 1 / 60 },
		scores: { $add: scores },
	});

	if (isTimeUp(newState)) {
		return setEndGameState(newState);
	}

	if (scores.length) {
		return updateMatchState(newState, MatchStates.GoalScored, 150);
	}

	return newState;
};
