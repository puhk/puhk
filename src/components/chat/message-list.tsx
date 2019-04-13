import React, { createRef } from 'react';
import styled from 'styled-components';
import { getPlayerById, Entities } from '@nojball/client';
import { ControllerProps } from '../component-props';

export interface MessageListProps extends ControllerProps {
    messages: Entities.ChatMessage[];
}

const List = styled.ul`
    height: 100%;
    list-style: none;
    margin: 0;
    padding-left: 0;
    overflow: auto;

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-track, &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 5px;
    }
`;

export default class MessageList extends React.PureComponent<MessageListProps> {
    ref = createRef<HTMLElement>();

    componentDidUpdate() {
        this.ref.current!.scrollTop = this.ref.current!.scrollHeight;
    }

    render() {
        const gameState = this.props.controller.getCurrentState();
        return (
            <List innerRef={this.ref}>
                {this.props.messages.map((message, i) =>
                    <li key={i}>
                        <strong>{getPlayerById(gameState, message.playerId)!.name}: </strong>
                        <span>{message.msg}</span>
                    </li>
                )}
            </List>
        );
    }
}
