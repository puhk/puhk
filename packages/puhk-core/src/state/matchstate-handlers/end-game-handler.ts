import update from 'immutability-helper';
import State from '../State';

export default (state: State) => {
	return update(state, {
		$merge: {
			matchStateTimer: state.matchStateTimer - 1,
			playing: state.matchStateTimer > 0,
		},
	});
};
