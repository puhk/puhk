import React from 'react';
import styled from 'styled-components';
import { Events, Entities, State } from 'nojball-game';
import Color from 'color';

import Timer from './timer';
import withSubscribers, { SubscriberProps } from '../enhancers/with-subscribers';
import ColorBlock from '../elements/color-block';
import colors from '../colors';

interface TopBarState {
    roomName: string,
    scores: Map<string, number>,
    teams: Entities.JsonTeam[]
}

interface TeamProps {
    teams: number;
    index: number;
};

const Container = styled.div`
    background: ${Color(colors.bg).darken(0.2).string()};
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

    ${(props: TeamProps) => props.teams == 2 && props.index == 1 && `
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

class TopBar extends React.Component<SubscriberProps, TopBarState> {
    state: TopBarState = {
        roomName: '',
        scores: new Map,
        teams: []
    };

    constructor(props: SubscriberProps) {
        super(props);

        this.state = {
            roomName: props.game.state.roomName,
            teams: props.game.state.stadium.getTeams(),
            scores: props.game.state.scores
        };
    }

    componentDidMount() {
        this.props.createSubscriber('goalScored', (event: { goal: Entities.Goal, state: State }) => {
            this.setState({ scores: event.state.scores });
        });

        this.props.createSubscriber(Events.ChangeRoomName, (event: Events.ChangeRoomName) => {
            this.setState({ roomName: event.data.name });
        });
    }

    render() {
        return (
            <Container>
                <Scores>
                    {this.state.teams.map((team, i) =>
                        <Team teams={this.state.teams.length} index={i} key={team.name}>
                            <TeamColor className="team-color" style={{ backgroundColor: team.color }}></TeamColor>
                            <Score className="score">{this.state.scores.get(team.name)}</Score>
                        </Team>
                    )}
                </Scores>

                <RoomName>{this.state.roomName}</RoomName>
                <Timer game={this.props.game} />
            </Container>
        );
    }
}

export default withSubscribers(TopBar);
