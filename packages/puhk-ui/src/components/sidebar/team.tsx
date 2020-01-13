import React from 'react';
import styled from 'styled-components';
import { Events, Entities, NetworkController } from '@puhk/puhk-core';

import Player from './player';
import ColorBlock from '../../elements/color-block';
import { ControllerProps } from '../component-props';

export interface TeamProps extends ControllerProps {
	players: Entities.Player[];
	team: Entities.JsonTeam;
	scores: Map<string, number>;
	specs?: boolean;
}

const Item = styled.li`
	border-bottom: 1px solid #000;
	border-top: 1px solid #1f2528;
	padding: 8px 2px;

	&:first-child {
		border-top: 0;
	}

	&:last-child {
		border-bottom: 0;
	}

	a {
		color: #fff;
		cursor: pointer;
		font-weight: bold;
		text-decoration: none;
		user-select: none;
	}
`;

const Score = styled.span`
	float: right;
	font-weight: bold;
`;

const Players = styled.ul`
	background: #181d20;
	font-size: 0.8rem;
	margin-top: 8px;
	list-style: none;
	padding-left: 0px;

	li {
		margin-bottom: 0;
		padding: 4px 6px;
	}
`;

const switchTeam = (controller: NetworkController, team: Nullable<string>) => {
	const { id } = controller.getMe();

	controller.addEvent(new Events.ChangeTeam(controller.getCurrentState().frame, id, { clientId: id, team }));
};

export default React.memo(({ team, scores, players, specs, controller }: TeamProps) => {
	const teamPlayers = players.filter(player => player.team === (specs ? null : team.name));

	return (
		<Item>
			<a onDoubleClick={() => switchTeam(controller, specs ? null : team.name)}>
				<ColorBlock style={{ backgroundColor: team.color }}></ColorBlock>
				{team.name}
			</a>

			{!specs && <Score>{scores.get(team.name)}</Score>}

			{teamPlayers.length > 0 && (
				<Players>
					{teamPlayers.map(player => (
						<li key={player.clientId}>
							<Player controller={controller} player={player} />
						</li>
					))}
				</Players>
			)}
		</Item>
	);
});
