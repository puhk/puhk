// @flow

import React from 'react';
import {Events} from 'nojball-game';

import type {Game} from 'nojball-game';

type InputProps = {
    game: Game
};

type InputState = {
    inputText: string
};

export default class Input extends React.Component<void, InputProps, InputState> {
    state: InputState = {
        inputText: ''
    };

    setMessageText(event: SyntheticInputEvent) {
        this.setState({inputText: event.target.value});
    }

    sendMessage(event: SyntheticInputEvent) {
        event.preventDefault();

        const {game} = this.props;
        const message = this.state.inputText;
        game.addEvent(new Events.PlayerChat(game.me.id, {message}));

        this.setState({inputText: ''});
    }

    render() {
        return (
            <form onSubmit={e => this.sendMessage(e)}>
                <input
                    type="text"
                    placeholder="Type here to chat"
                    tabIndex="2"
                    value={this.state.inputText}
                    onChange={e => this.setMessageText(e)}
                />
            </form>
        );
    }
}
