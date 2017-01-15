// @flow

import React from 'react';
import Team from './team';

import type {Game, JsonTeam} from 'nojball-game';

export default class TeamsList extends React.Component {
    state: TeamsListState = {
        teams: []
    };

    constructor(props: TeamsListProps) {
        super(props);

        this.state.teams = this.props.game.getTeams();
    }

    render() {
        let specTeam = {
            name: 'Spectators',
            color: '#ccc'
        };

        return (
            <ul className="teams-list">
                { this.state.teams.map(team =>
                    <Team game={this.props.game} team={team} key={team.name} />
                ) }

                <Team game={this.props.game} team={specTeam} specs={true} />
            </ul>
        );
    }
}

type TeamsListProps = {
    game: Game
};

type TeamsListState = {
    teams: JsonTeam[]
};
