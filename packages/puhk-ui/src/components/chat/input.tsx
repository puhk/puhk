import React from 'react';
import styled from 'styled-components';
import { Events } from '@puhk/puhk-core';
import { autobind } from 'core-decorators';
import { ControllerProps } from '../component-props';

export interface InputState {
    inputText: string;
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

export default class Input extends React.PureComponent<ControllerProps, InputState> {
    state: InputState = {
        inputText: ''
    };

    @autobind
    setMessageText(event: React.SyntheticEvent<HTMLInputElement>) {
        this.setState({ inputText: event.currentTarget.value });
    }

    @autobind
    sendMessage(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        const { controller } = this.props;
        const message = this.state.inputText;

        controller.addEvent(
            new Events.PlayerChat(
                controller.getCurrentState().frame,
                controller.getMe().id,
                { message }
            )
        );

        this.setState({ inputText: '' });
    }

    render() {
        return (
            <Form onSubmit={this.sendMessage}>
                <input
                    type="text"
                    placeholder="Type here to chat"
                    tabIndex={2}
                    value={this.state.inputText}
                    onChange={this.setMessageText} />
            </Form>
        );
    }
}
