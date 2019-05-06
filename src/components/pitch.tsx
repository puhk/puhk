import React, { createRef } from 'react';
import styled from 'styled-components';
import { NetworkController, Renderer } from '@nojball/client';
import ResizeObserver from 'resize-observer-polyfill';
import Color from 'color';
import colors from '../colors';

export interface PitchProps {
    controller: NetworkController;
    renderer: Renderer;
}

const PitchContainer = styled.div`
    background: ${Color(colors.bg).lighten(0.4).toString()};
    height: 100%;
    position: relative;
    outline: none;

    canvas {
        display: block;
        position: absolute;
    }
`;

export default class Pitch extends React.Component<PitchProps> {
    ref = createRef<HTMLElement>();
    resizeObserver: Nullable<ResizeObserver> = null;

    shouldComponentUpdate(nextProps: PitchProps) {
        return nextProps.controller != this.props.controller || nextProps.renderer != this.props.renderer;
    }

    componentDidMount() {
        this.resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;

                this.props.renderer
                    .setWidth(width)
                    .setHeight(height)
                    .center();
            }
        });

        this.props.controller.initKeyboard(this.ref.current!);

        this.props.renderer
            .setParent(this.ref.current!)
            .setWidth(this.ref.current!.offsetWidth)
            .setHeight(this.ref.current!.offsetHeight)
            .center()
            .attach();

        this.resizeObserver.observe(this.ref.current!);
    }

    componentWillUnmount() {
        this.resizeObserver!.unobserve(this.ref.current!);
        this.resizeObserver = null;
        this.props.renderer.remove();
    }

    render() {
        return <PitchContainer innerRef={this.ref} tabIndex={-1} />;
    }
}
