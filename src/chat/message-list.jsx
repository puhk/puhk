// @flow

import React from 'react';
import {Events} from 'nojball-game';

import type {Game, ChatMessage} from 'nojball-game';

export default class MessageList extends React.Component<void, MessageListProps, MessageListState> {
    element: HTMLElement;
    subscriber: any = null;
    state: MessageListState = {
        messages: []
    };

    componentDidMount() {
        const handler = (event: Events.PlayerChat) => {
            this.setState({
                messages: this.props.game.getChatMessages()
            });
        };

        this.subscriber = this.props.game.eventAggregator.subscribe(Events.PlayerChat, handler);
    }

    componentWillUnmount() {
        this.subscriber.dispose();
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

type MessageListProps = {
    game: Game
};

type MessageListState = {
    messages: ChatMessage[]
};
