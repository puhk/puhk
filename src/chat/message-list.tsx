import React from 'react';
import styled from 'styled-components';
import { Game, Events, Entities } from 'nojball-game';

import withSubscribers, { SubscriberProps, SubscriberWrapper } from '../enhancers/with-subscribers';

export interface MessageListState {
    messages: Entities.ChatMessage[]
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

class MessageList extends React.Component<SubscriberProps, MessageListState> {
    element: HTMLElement;
    state: MessageListState = {
        messages: []
    };

    componentDidMount() {
        this.props.createSubscriber(Events.PlayerChat, (event: Events.PlayerChat) => {
            this.setState({
                messages: this.props.game.state.chatMessages
            });
        })
    }

    componentDidUpdate() {
        this.element.scrollTop = this.element.scrollHeight;
    }

    render() {
        return (
            <List innerRef={el => this.element = el}>
                {this.state.messages.map((message, i) =>
                    <li key={i}>
                        <strong>{this.props.game.state.getPlayerById(message.playerId).name}: </strong>
                        <span>{message.msg}</span>
                    </li>
                )}
            </List>
        );
    }
}

export default withSubscribers(MessageList);
