import React from 'react';
import styled from 'styled-components';
import { Entities } from '@nojball/client';

import TeamsList from './teamslist';
import colors from '../../colors';
import { ControllerProps } from '../component-props';

export interface SidebarProps extends ControllerProps {
    teams: Entities.JsonTeam[];
    players: Entities.Player[];
    scores: Map<string, number>;
    playing: boolean;
    toggleMenu: () => void;
}

interface ButtonProps {
    type: 'toggle' | 'start' | 'stop';
}

const Sidebar = styled.div`
    background-color: ${colors.sidebar};
    color: #fff;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
`;

const buttonColors = {
    toggle: '#2a2d30',
    start: '#234f71',
    stop: '#a52424'
}

const Button = styled.button`
    background: ${(props: ButtonProps) => buttonColors[props.type]};
    border: 0;
    border-radius: 3px;
    color: white;
    cursor: pointer;
    display: block;
    outline: none;
    padding: 5px;
    width: 100%;

    &:not(:last-child) {
        margin-bottom: 5px;
    }
`;

export default React.memo((props: SidebarProps) => (
    <Sidebar>
        <TeamsList {...props} />

        <div>
            {props.playing &&
                <Button onClick={props.toggleMenu} type="toggle">Toggle menu</Button>
            }

            {props.playing ?
                <Button onClick={() => props.controller.stop()} type="stop">Stop game</Button> :
                <Button onClick={() => props.controller.start()} type="start">Start game</Button>
            }
        </div>
    </Sidebar>
));
