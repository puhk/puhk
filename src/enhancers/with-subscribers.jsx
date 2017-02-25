// @flow

import React from 'react';

import type {Game} from 'nojball-game';

type SubscriberProps = {
    game: Game
};

type WrappedProps = {
    createSubscriber: SubscriberCreator
};

export type SubscriberCreator = <T>(event: Class<T> | string, handler: (event: T) => void) => void;

export default <P: $Subtype<WrappedProps>>(Component: Class<React$Component<any, P, any>>) => {
    return class extends React.Component<void, $Subtype<SubscriberProps>, void> {
        subscribers = [];

        createSubscriber: SubscriberCreator = (event, handler) => {
            const subscriber = this.props.game.eventAggregator.subscribe(event, handler);
            this.subscribers.push(subscriber);
        };

        componentWillUnmount() {
            for (const subscriber of this.subscribers) {
                subscriber.dispose();
            }
        }

        render() {
            return <Component createSubscriber={this.createSubscriber} {...this.props} />
        }
    };
};
