import React from 'react';
import styled from 'styled-components';
import { Game, Entities } from 'nojball-game';

import Team from './team';

export interface TeamsListProps {
    game: Game
}

export interface TeamsListState {
    teams: Entities.JsonTeam[]
}

const specTeam = {
    name: 'Spectators',
    color: '#ccc'
};

const Teams = styled.ul`
    font-size: 0.9rem;
    margin: 0;
    list-style: none;
    padding: 0;
`;

export default class TeamsList extends React.Component<TeamsListProps, TeamsListState> {
    state: TeamsListState = {
        teams: []
    };

    constructor(props: TeamsListProps) {
        super(props);

        this.state.teams = this.props.game.state.stadium.getTeams();
    }

    render() {
        return (
            <Teams>
                {this.state.teams.map(team =>
                    <Team game={this.props.game} team={team} key={team.name} />
                )}

                <Team game={this.props.game} team={specTeam} specs={true} />
            </Teams>
        );
    }
}
