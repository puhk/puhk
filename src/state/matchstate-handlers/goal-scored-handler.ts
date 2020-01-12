import State from '../State';
import { MatchStates, updateMatchState } from '../MatchStates';
import { isTimeUp, setEndGameState } from '../funcs/end-game';
import kickOffState from '../funcs/kick-off-state';

export default (state: State) => {
	if (state.matchStateTimer > 0) {
		return updateMatchState(state, state.matchState, state.matchStateTimer - 1);
	}

	const hasTeamWon = state.stadium.teams
		.map(team => state.scores.get(team.name))
		.filter((score): score is number => !!score)
		.some(score => score >= state.scoreLimit);

	if (hasTeamWon || isTimeUp(state)) {
		return setEndGameState(state);
	}

	return updateMatchState(kickOffState(state), MatchStates.Kickoff, 0);
};
