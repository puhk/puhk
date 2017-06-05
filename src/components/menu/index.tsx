import React from 'react';
import styled from 'styled-components';
import { Game, Events, Entities, defaultStadiums } from 'nojball-game';

import withSubscribers, { SubscriberProps } from '../../enhancers/with-subscribers';

export interface MenuState {
    currentStadium: Entities.Stadium,
    roomName: string,
    stadiums: Entities.Stadium[],
    scoreLimit: number,
    timeLimit: number
}

const Container = styled.div`
    background: rgba(0, 0, 0, 0.6);
    border-radius: 5px;
    color: #efefef;
    display: flex;
    font-size: 0.9rem;
    margin: 2% auto;
    padding: 1%;
    width: 75%;
`;

const SettingGroup = styled.div`
    flex: 1;

    h2 {
        margin-top: 0;
    }
`;

const InputGroup = styled.div`
    margin-bottom: 2px;

    label {
        display: block;
        margin-bottom: 0;

        span {
            display: inline-block;
            width: 30%;
        }

        input, select {
            background: rgba(0, 0, 0, 0.6);
            border: 0;
            border-radius: 5px;
            color: #efefef;
            outline: none;
            padding: 5px;

            &.block {
                display: inline-block;
                width: 70%;
            }
        }
    }
`;

class Menu extends React.Component<SubscriberProps, MenuState> {
    state: MenuState = {
        currentStadium: null,
        stadiums: defaultStadiums,
        roomName: '',
        scoreLimit: 0,
        timeLimit: 0
    };

    changeStadium = (event: React.SyntheticEvent<HTMLSelectElement>) => {
        const stadium = this.state.stadiums.find(stadium => stadium.name == event.currentTarget.value);

        if (stadium) {
            const event = new Events.ChangeStadium(this.props.game.getMe().id, { stadium });
            this.props.game.addEvent(event);
        }
    };

    changeRoomName = (event: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({
            roomName: event.currentTarget.value
        });
    };

    changeScoreLimit = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const limit = parseInt(event.currentTarget.value);
        this.props.game.addEvent(new Events.ChangeScoreLimit(this.props.game.getMe().id, { limit }));
    };

    changeTimeLimit = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const limit = parseInt(event.currentTarget.value);
        this.props.game.addEvent(new Events.ChangeTimeLimit(this.props.game.getMe().id, { limit }));
    };

    setRoomName = () => {
        if (this.state.roomName != this.props.game.state.roomName) {
            const event = new Events.ChangeRoomName(this.props.game.getMe().id, { name: this.state.roomName });
            this.props.game.addEvent(event);
        }
    };

    componentDidMount() {
        const { game } = this.props;

        this.setState({
            currentStadium: game.state.stadium,
            roomName: game.state.roomName,
            scoreLimit: game.state.scoreLimit,
            timeLimit: game.state.timeLimit
        });

        this.props.createSubscriber(Events.ChangeRoomName, (event: Events.ChangeRoomName) => {
            this.setState({ roomName: event.data.name });
        });

        this.props.createSubscriber(Events.ChangeStadium, (event: Events.ChangeStadium) => {
            this.setState({ currentStadium: event.stadium });
        });

        this.props.createSubscriber(Events.ChangeScoreLimit, (event: Events.ChangeScoreLimit) => {
            this.setState({ scoreLimit: event.data.limit });
        });

        this.props.createSubscriber(Events.ChangeTimeLimit, (event: Events.ChangeTimeLimit) => {
            this.setState({ timeLimit: event.data.limit });
        });
    }

    render() {
        return (
            <Container>
                <SettingGroup>
                    <h2>Room Settings</h2>

                    <InputGroup>
                        <label>
                            <span>Room name</span>
                            <input type="text" onChange={this.changeRoomName} onBlur={this.setRoomName} value={this.state.roomName} />
                        </label>
                    </InputGroup>

                    <InputGroup>
                        <label>
                            <span>Password</span>
                            <input type="password" />
                        </label>
                    </InputGroup>

                    <InputGroup>
                        <label>
                            <span>Max players</span>
                            <input type="number" />
                        </label>
                    </InputGroup>
                </SettingGroup>

                <SettingGroup>
                    <h2>Match settings</h2>

                    <InputGroup>
                        <label>
                            <span>Time limit</span>
                            <input type="number" min="0" onChange={this.changeTimeLimit} value={this.state.timeLimit} />
                        </label>
                    </InputGroup>

                    <InputGroup>
                        <label>
                            <span>Score limit</span>
                            <input type="number" min="0" onChange={this.changeScoreLimit} value={this.state.scoreLimit} />
                        </label>
                    </InputGroup>

                    <InputGroup>
                        <label>
                            <span>Stadium</span>

                            <select
                                onChange={this.changeStadium}
                                value={(this.state.currentStadium && this.state.currentStadium.name) || ''}
                                disabled={this.props.game.state.playing}
                            >
                                {this.state.stadiums.map(stadium =>
                                    <option value={stadium.name} key={stadium.name}>{stadium.name}</option>
                                )}
                            </select>
                        </label>
                    </InputGroup>
                </SettingGroup>
            </Container>
        );
    }
}

export default withSubscribers(Menu);
