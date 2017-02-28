// @flow

import React from 'react';
import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu';
import {Events} from 'nojball-game';

import withSubscribers from  '../enhancers/with-subscribers';

import type {Game, Player} from 'nojball-game';
import type {SubscriberCreator} from '../enhancers/with-subscribers';

type PlayerProps = {
    createSubscriber: SubscriberCreator,
    game: Game,
    player: Player
};

type PlayerState = {
    isAdmin: boolean
};

class PlayerClass extends React.Component<void, PlayerProps, PlayerState> {
    state: PlayerState = {
        isAdmin: false
    };

    toggleAdmin = () => {
        const event = new Events.PlayerAdmin(this.props.game.me.id, {
            player: this.props.player.clientId,
            isAdmin: !this.state.isAdmin
        });

        this.props.game.addEvent(event);
    };

    componentDidMount() {
        this.setState({isAdmin: this.props.player.admin});

        this.props.createSubscriber(Events.PlayerAdmin, (event: Events.PlayerAdmin) => {
            if (event.data.player == this.props.player.clientId) {
                this.setState({isAdmin: event.data.isAdmin});
            }
        });
    }

    render() {
        return (
            <div>
                <ContextMenuTrigger id={`player-menu-${this.props.player.clientId}`}>
                    <span>
                        <img src={'https://cdn2.iconfinder.com/data/icons/flags/flags/48/united-kingdom-great-britain.png'} />
                        <span className={`${this.state.isAdmin ? 'admin' : ''}`}>{this.props.player.name}</span>
                    </span>
                </ContextMenuTrigger>

                <ContextMenu id={`player-menu-${this.props.player.clientId}`}>
                    <MenuItem onClick={this.toggleAdmin}>
                        {`${this.state.isAdmin ? 'Remove' : 'Make'} admin`}
                    </MenuItem>
                </ContextMenu>
            </div>
        );
    }
}

export default withSubscribers(PlayerClass);
