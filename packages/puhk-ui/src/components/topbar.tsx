import React from 'react';
import styled from 'styled-components';
import Color from 'color';
import { Entities } from '@puhk/puhk-core';

import Timer from './timer';
import ColorBlock from '../elements/color-block';
import colors from '../colors';
import { ControllerProps } from './component-props';

export interface TopbarProps extends ControllerProps {
	teams: Entities.JsonTeam[];
	scores: Map<string, number>;
	roomName: string;
	timer: number;
	timeLimit: number;
}

interface TeamProps {
	teams: number;
	index: number;
}

const Container = styled.div`
	background: ${Color(colors.bg)
		.darken(0.2)
		.string()};
	border-bottom: 1px solid #4a4a4a;
	color: #fff;
	display: flex;
	padding: 10px;
	text-shadow: 1px 1px 0px #000;

	> * {
		flex: 1;
	}
`;

const Scores = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
`;

const Team = styled.li`
	display: inline-flex;
	margin-right: 10px;
	vertical-align: middle;

	${(props: TeamProps) =>
		props.teams == 2 &&
		props.index == 1 &&
		`
        &::before {
            content: '-';
            margin-right: 10px;
        }

        .team-color {
            margin-left: 5px;
            margin-right: 0;
            order: 1;
        }

        .score {
            order: 0;
        }
    `}
`;

const TeamColor = styled(ColorBlock)`
	box-shadow: 1px 1px 1px 0px #000;
	height: 20px;
	order: 0;
	width: 20px;
`;

const Score = styled.span`
	order: 1;
`;

const RoomName = styled.div`
	letter-spacing: 2px;
	text-align: center;
`;

const topBar = ({ controller, teams, scores, roomName, timer, timeLimit }: TopbarProps) => (
	<Container>
		<Scores>
			{teams.map((team, i) => (
				<Team teams={teams.length} index={i} key={team.name}>
					<TeamColor className="team-color" style={{ backgroundColor: team.color }}></TeamColor>
					<Score className="score">{scores.get(team.name)}</Score>
				</Team>
			))}
		</Scores>

		<RoomName>{roomName}</RoomName>

		<Timer controller={controller} timer={timer} timeLimit={timeLimit} />
	</Container>
);

export default React.memo(
	topBar,
	(prevProps, nextProps) =>
		prevProps.controller === nextProps.controller &&
		prevProps.teams === nextProps.teams &&
		prevProps.scores === nextProps.scores &&
		prevProps.roomName === nextProps.roomName &&
		Math.floor(prevProps.timer) === Math.floor(nextProps.timer) &&
		prevProps.timeLimit === nextProps.timeLimit
);
