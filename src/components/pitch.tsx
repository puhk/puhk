import React from 'react';
import styled from 'styled-components';
import { Game, Renderer } from 'nojball-game';
import ResizeObserver from 'resize-observer-polyfill';

export interface PitchProps {
    game: Game,
    renderer: Renderer
}

const PitchContainer = styled.div`
    height: 100%;
    position: relative;
    outline: none;

    canvas {
        display: block;
        position: absolute;
    }
`;

export default class Pitch extends React.Component<PitchProps, void> {
    element: HTMLElement;
    resizeObserver: ResizeObserver;

    constructor(props: PitchProps) {
        super(props);

        this.resizeObserver = new ResizeObserver((entries, observer) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;

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
            .attach();

        this.resizeObserver.observe(this.element);
    }

    componentWillUnmount() {
        this.resizeObserver.unobserve(this.element);
    }

    render() {
        return <PitchContainer innerRef={el => this.element = el} tabIndex={-1} />;
    }
}
