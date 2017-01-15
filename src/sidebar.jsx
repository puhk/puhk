// @flow

import React from 'react';
import TeamsList from './teamslist';

import type {Game} from 'nojball-game';

export default class Sidebar extends React.Component {
    render() {
        const {game}: {game: Game} = this.props;

        return (
            <div className="sidebar">
                <TeamsList {...this.props} />

                {game.isPlaying() ?
                    <button onClick={e => game.stop()} className="stop-game">Stop Game</button> :
                    ''}
            </div>
        );
    }
}
