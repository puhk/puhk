import { MatchStates, updateMatchState } from '../MatchStates';
import State from '../State';

export const scoresEqual = (state: State) =>
	state.stadium.teams.map(team => state.scores.get(team.name)).every((score, i, scores) => score === scores[0]);

export const isTimeUp = (state: State) => state.timer >= state.timeLimit * 60 && !scoresEqual(state);
export const setEndGameState = (state: State) => updateMatchState(state, MatchStates.EndGame, 300);
