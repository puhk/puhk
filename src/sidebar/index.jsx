// @flow

import React from 'react';
import {Events} from 'nojball-game';

import TeamsList from './teamslist';

import type {Game} from 'nojball-game';

type SidebarProps = {
    game: Game,
    toggleMenu: () => void
};

export default (props: SidebarProps) => {
    const {game} = props;

    return (
        <div className="sidebar">
            <TeamsList {...props} />

            <div>
                {game.state.playing &&
                    <button onClick={props.toggleMenu} className="toggle-menu">Toggle menu</button>
                }

                {game.state.playing ?
                    <button onClick={e => game.stop()} className="stop-game">Stop game</button> :
                    <button onClick={e => game.start()} className="start-game">Start game</button>
                }
            </div>
        </div>
    );
};
