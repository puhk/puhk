import React from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import styled from 'styled-components';
import { Events, Entities } from 'nojball-game';

import withSubscribers, { SubscriberProps } from '../../enhancers/with-subscribers';
import colors from '../../colors';

export interface PlayerProps extends SubscriberProps {
    player: Entities.Player
}

export interface PlayerState {
    isAdmin: boolean
}

interface NameProps {
    admin: boolean;
}

const Flag = styled.img`
    display: inline-block;
    margin-right: 5px;
    vertical-align: middle;
    width: 16px;
`;

const Name = styled.div`
    color: ${(props: NameProps) => props.admin && colors.admin};
`;

const OptionsMenu = styled(ContextMenu)`
    background: #eee;
    border-radius: 5px;
    color: ${colors.sidebar};

    .react-contextmenu-item {
        cursor: pointer;
        padding: 5px;
    }
`;

class Player extends React.Component<PlayerProps, PlayerState> {
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
        this.setState({ isAdmin: this.props.player.admin });

        this.props.createSubscriber(Events.PlayerAdmin, (event: Events.PlayerAdmin) => {
            if (event.data.player == this.props.player.clientId) {
                this.setState({ isAdmin: event.data.isAdmin });
            }
        });
    }

    render() {
        return (
            <div>
                <ContextMenuTrigger id={`player-menu-${this.props.player.clientId}`}>
                    <span>
                        <Flag src={'https://cdn2.iconfinder.com/data/icons/flags/flags/48/united-kingdom-great-britain.png'} />
                        <Name admin={this.state.isAdmin}>{this.props.player.name}</Name>
                    </span>
                </ContextMenuTrigger>

                <OptionsMenu id={`player-menu-${this.props.player.clientId}`}>
                    <MenuItem onClick={this.toggleAdmin}>
                        {`${this.state.isAdmin ? 'Remove' : 'Make'} admin`}
                    </MenuItem>
                </OptionsMenu>
            </div>
        );
    }
}

export default withSubscribers(Player);
