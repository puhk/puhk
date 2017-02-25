// @flow

import React from 'react';

import type {Game, Player} from 'nojball-game';

type PlayerProps = {
    player: Player
};

export default (props: PlayerProps) => (
    <span>
        <img src={'https://cdn2.iconfinder.com/data/icons/flags/flags/48/united-kingdom-great-britain.png'} />
        <span>{props.player.name}</span>
    </span>
);
