// @flow

import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import type {Game, Renderer} from 'nojball-game';

type PitchProps = {
    game: Game,
    renderer: Renderer
};

export default class Pitch extends React.Component<void, PitchProps, void> {
    element: HTMLElement;
    resizeObserver: ResizeObserver;

    constructor(props: PitchProps) {
        super(props);

        this.resizeObserver = new ResizeObserver((entries, observer) => {
            for (const entry of entries) {
                const {width, height} = entry.contentRect;

                props.renderer
                    .setWidth(width)
                    .setHeight(height);
            }
        });
    }

    componentDidMount() {
        this.props.game.initKeyboard(this.element);

        this.props.renderer
            .setParent(this.element)
            .setWidth(this.element.offsetWidth)
            .setHeight(this.element.offsetHeight)
            .render();

        this.resizeObserver.observe(this.element);
    }

    componentWillUnmount() {
        this.resizeObserver.unobserve(this.element);
    }

    render() {
        return <div className="pitch" ref={el => this.element = el} tabIndex="-1" />;
    }
}
