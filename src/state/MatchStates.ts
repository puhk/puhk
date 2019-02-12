import update from 'immutability-helper';
import State from './State';

export enum MatchStates {
    Kickoff = 0,
    Inplay = 1,
    GoalScored = 2,
    EndGame = 3
}

export const updateMatchState = (state: State, matchState: MatchStates, matchStateTimer: number = 0) =>
    update(state, {
        $merge: { matchState, matchStateTimer }
    });
