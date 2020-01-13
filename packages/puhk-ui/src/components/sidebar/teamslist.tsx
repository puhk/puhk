import React from 'react';
import styled from 'styled-components';
import { Entities } from '@nojball/client';

import Team from './team';
import { ControllerProps } from '../component-props';

export interface TeamsListProps extends ControllerProps {
    teams: Entities.JsonTeam[];
    players: Entities.Player[];
    scores: Map<string, number>;
}

export interface TeamsListState {
    teams: Entities.JsonTeam[];
}

const specTeam: Entities.JsonTeam = {
    name: 'Spectators',
    color: '#ccc',
    kickOffPos: [0, 0],
};

const Teams = styled.ul`
    font-size: 0.9rem;
    margin: 0;
    list-style: none;
    padding: 0;
`;

const component = ({ controller, teams, players, scores }: TeamsListProps) => (
    <Teams>
        {[...teams, specTeam].map(team => (
            <Team
                controller={controller}
                team={team}
                players={players}
                scores={scores}
                key={team.name}
                specs={team.name === 'Spectators'} />
        ))}
    </Teams>
);

export default React.memo(component);
