import React from 'react';
import styled from 'styled-components';
import { Game, Events } from 'nojball-game';

export interface InputProps {
    game: Game
}

export interface InputState {
    inputText: string
}

const Form = styled.form`
    height: 25px;

    input {
        background: rgba(0, 0, 0, 0.25);
        border: none;
        color: white;
        display: block;
        height: 100%;
        margin: 0;
        outline: none;
        padding: 5px;
        width: 100%;
    }
`;

export default class Input extends React.Component<InputProps, InputState> {
    state: InputState = {
        inputText: ''
    };

    setMessageText(event: React.SyntheticEvent<HTMLInputElement>) {
        this.setState({ inputText: event.currentTarget.value });
    }

    sendMessage(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        const { game } = this.props;
        const message = this.state.inputText;
        game.addEvent(new Events.PlayerChat(game.me.id, { message }));

        this.setState({ inputText: '' });
    }

    render() {
        return (
            <Form onSubmit={e => this.sendMessage(e)}>
                <input
                    type="text"
                    placeholder="Type here to chat"
                    tabIndex={2}
                    value={this.state.inputText}
                    onChange={e => this.setMessageText(e)} />
            </Form>
        );
    }
}
