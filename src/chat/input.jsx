// @flow

import React from 'react';

import type {Game} from 'nojball-game';

export default class Input extends React.Component<void, InputProps, InputState> {
    state: InputState = {
        inputText: ''
    };

    setMessageText(event: SyntheticInputEvent) {
        this.setState({inputText: event.target.value});
    }

    sendMessage(event: SyntheticInputEvent) {
        event.preventDefault();

        this.props.game.sendChatMessage(this.state.inputText);
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

type InputProps = {
    game: Game
};

type InputState = {
    inputText: string
};
