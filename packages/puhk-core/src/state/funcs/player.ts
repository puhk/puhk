import Vec from 'victor';
import State from '../State';
import Disc from '../../entities/Disc';
import Player from '../../entities/Player';

export const getPlayerById = (state: State, id: number) => state.players.find(p => p.clientId === id);
export const getPlayerDisc = (state: State, player: Player) => state.discs.find(d => d.id === player.discId);
export const getPlayerFromDisc = (state: State, disc: Disc) => state.players.find(player => player.discId === disc.id);

export const createPlayerDisc = (state: State, player: Player) => {
	if (!player.team) {
		return;
	}

	const team = state.stadium.getTeam(player.team);

	if (player.team === null || !team) {
		return;
	}

	const disc = new Disc(
		new Vec(0, 0),
		state.stadium.playerPhysics.radius,
		team.color,
		state.stadium.playerPhysics.damping,
		state.stadium.playerPhysics.invMass
	);

	disc.kickStrength = state.stadium.playerPhysics.kickStrength;
	// disc.isMe = player.clientId == state.me.id;
	disc.text = player.avatar;

	return disc;
};
