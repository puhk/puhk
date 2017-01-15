// @flow

import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import type {Renderer} from 'nojball-game';

export default class Pitch extends React.Component<void, PitchProps, void> {
    element: HTMLElement;
    resizeObserver: ResizeObserver;
    
    constructor(props: PitchProps) {
        super(props);

        this.resizeObserver = new ResizeObserver((entries, observer) => {
            for (const entry of entries) {
                const {width, height} = entry.contentRect;

                this.props.renderer
                    .setWidth(width)
                    .setHeight(height)
                    .center();
            }
        });
    }

    componentDidMount() {
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
        return <div className="pitch" ref={el => this.element = el} />;
    }
}

type PitchProps = {
    renderer: Renderer
};
