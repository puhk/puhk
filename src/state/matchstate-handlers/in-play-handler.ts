import update from 'immutability-helper';
import { MatchStates, updateMatchState } from '../MatchStates';
import State from '../State';
import { isTimeUp, setEndGameState } from '../funcs/end-game';
import { GoalScored } from '../../engine';
import { JsonTeam } from '../../entities/Stadium';

export default (state: State, goalsScored: GoalScored[]) => {
    const scores = goalsScored
        .map(goalScored => state.stadium.getTeam(goalScored.goal.data.teamScored))
        .filter((team): team is JsonTeam => !!team)
        .map(team => <[string, number]>[team.name, state.scores.get(team.name)! + 1]);

    const newState = update(state, {
        timer: { $set: state.timer + (1 / 60) },
        scores: { $add: scores }
    });

    if (isTimeUp(newState)) {
        return setEndGameState(newState);
    }

    if (scores.length) {
        return updateMatchState(newState, MatchStates.GoalScored, 150);
    }

    return newState;
};
