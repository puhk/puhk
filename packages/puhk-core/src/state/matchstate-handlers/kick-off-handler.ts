import { MatchStates, updateMatchState } from '../MatchStates';
import State from '../State';

export default (state: State) => {
	const kickedOff = state.discs.filter(disc => disc.isBall).some(ball => ball.velocity.x != 0 || ball.velocity.y != 0);

	return updateMatchState(state, kickedOff ? MatchStates.Inplay : state.matchState);
};
