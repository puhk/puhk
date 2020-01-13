import React from 'react';
import styled from 'styled-components';
import { Events, defaultStadiums } from '@puhk/puhk-core';
import { StateControllerProps } from '../component-props';

export interface MenuState {
    roomName: string;
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

export default class Menu extends React.Component<StateControllerProps> {
    state: MenuState = {
        roomName: '',
    };

    changeStadium = (event: React.SyntheticEvent<HTMLSelectElement>) => {
        const stadium = defaultStadiums.find(stadium => stadium.name === event.currentTarget.value);

        if (stadium) {
            const { controller, gameState } = this.props;

            const event = new Events.ChangeStadium(
                gameState.frame,
                controller.getMe().id,
                { stadium }
            );

            controller.addEvent(event);
        }
    };

    changeRoomName = (event: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({
            roomName: event.currentTarget.value
        });
    };

    changeScoreLimit = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const limit = parseInt(event.currentTarget.value);
        const { controller, gameState } = this.props;

        controller.addEvent(
            new Events.ChangeScoreLimit(
                gameState.frame,
                controller.getMe().id,
                { limit }
            )
        );
    };

    changeTimeLimit = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const limit = parseInt(event.currentTarget.value);
        const { controller, gameState } = this.props;

        controller.addEvent(
            new Events.ChangeTimeLimit(
                gameState.frame,
                controller.getMe().id,
                { limit }
            )
        );
    };

    setRoomName = () => {
        if (this.state.roomName === this.props.controller.simulator.concreteState.roomName) {
            return;
        }

        const { controller, gameState } = this.props;

        controller.addEvent(
            new Events.ChangeRoomName(
                gameState.frame,
                controller.getMe().id,
                { name: this.state.roomName }
            )
        );
    };

    render() {
        const { gameState } = this.props;

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
                            <input type="number" min="0" onChange={this.changeTimeLimit} value={gameState.timeLimit} />
                        </label>
                    </InputGroup>

                    <InputGroup>
                        <label>
                            <span>Score limit</span>
                            <input type="number" min="0" onChange={this.changeScoreLimit} value={gameState.scoreLimit} />
                        </label>
                    </InputGroup>

                    <InputGroup>
                        <label>
                            <span>Stadium</span>

                            <select
                                onChange={this.changeStadium}
                                value={(gameState.stadium && gameState.stadium.name) || ''}
                                disabled={gameState.playing}
                            >
                                {defaultStadiums.map(stadium =>
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
