import React from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import styled from 'styled-components';
import { Events, Entities, NetworkController } from '@puhk/puhk-core';

import colors from '../../colors';
import { ControllerProps } from '../component-props';

export interface PlayerProps extends ControllerProps {
    player: Entities.Player;
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

const Name = styled.span`
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

const toggleAdmin = (controller: NetworkController, player: Entities.Player) => {
    const data = {
        player: player.clientId,
        isAdmin: !player.admin
    };

    controller.addEvent(
        new Events.PlayerAdmin(
            controller.getCurrentState().frame,
            controller.getMe().id,
            data
        )
    );
};

export default React.memo(({ controller, player }: PlayerProps) => (
    <div>
        <ContextMenuTrigger id={`player-menu-${player.clientId}`}>
            <span>
                <Flag src={'https://cdn2.iconfinder.com/data/icons/flags/flags/48/united-kingdom-great-britain.png'} />
                <Name admin={player.admin}>{player.name}</Name>
            </span>
        </ContextMenuTrigger>

        <OptionsMenu id={`player-menu-${player.clientId}`}>
            <MenuItem onClick={() => toggleAdmin(controller, player)}>
                {`${player.admin ? 'Remove' : 'Make'} admin`}
            </MenuItem>
        </OptionsMenu>
    </div>
));
