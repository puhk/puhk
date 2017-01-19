// @flow

import React from 'react';
import TeamsList from './teamslist';

import type {Game} from 'nojball-game';

export default (props: SidebarProps) => {
    const {game} = props;

    return (
        <div className="sidebar">
            <TeamsList {...props} />

            {game.isPlaying() &&
                <button onClick={e => game.stop()} className="stop-game">Stop Game</button>
            }
        </div>
    );
};

type SidebarProps = {
    game: Game
};
