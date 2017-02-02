// @flow

import React from 'react';
import {Events} from 'nojball-game';

import withSubscribers from '../enhancers/with-subscribers';

import type {Game, ChatMessage} from 'nojball-game';
import type {SubscriberCreator} from '../enhancers/with-subscribers';

class MessageList extends React.Component<void, MessageListProps, MessageListState> {
    element: HTMLElement;
    state: MessageListState = {
        messages: []
    };

    componentDidMount() {
        this.props.createSubscriber(Events.PlayerChat, (event: Events.PlayerChat) => {
            this.setState({
                messages: this.props.game.getChatMessages()
            });
        })
    }

    componentDidUpdate() {
        this.element.scrollTop = this.element.scrollHeight;
    }

    render() {
        return (
            <ul ref={el => this.element = el}>
                {this.state.messages.map((message, i) =>
                    <li key={i}>
                        <strong>{this.props.game.getPlayerById(message.playerId).name}: </strong>
                        <span>{message.msg}</span>
                    </li>
                )}
            </ul>
        );
    }
}

export default withSubscribers(MessageList);

type MessageListProps = {
    createSubscriber: SubscriberCreator,
    game: Game
};

type MessageListState = {
    messages: ChatMessage[]
};
