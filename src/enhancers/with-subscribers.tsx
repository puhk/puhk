import React from 'react';
import { Game } from 'nojball-game';

export interface SubscriberCreator {
    <T>(event: (new (...args: any[]) => T) | string, handler: (event: T) => void): void
}

export interface SubscriberProps extends React.ClassAttributes<any> {
    createSubscriber?: SubscriberCreator,
    game: Game
}

export interface SubscriberWrapper<P> extends React.Component<P, void> {
    subscribers: any[],
    createSubscriber: SubscriberCreator
}

export default <P extends SubscriberProps>(Component: React.ComponentClass<P>): (new() => SubscriberWrapper<P>) => {
    return class Wrapper extends React.Component<P, void> {
        subscribers: any[] = [];

        constructor() {
            super();
            this.createSubscriber = this.createSubscriber.bind(this);
        }

        createSubscriber<T>(event: (new () => T) | string, handler: (event: T) => void) {
            const subscriber = this.props.game.eventAggregator.subscribe(event, handler);
            this.subscribers.push(subscriber);
        };

        componentWillUnmount() {
            for (const subscriber of this.subscribers) {
                subscriber.dispose();
            }
        }

        render() {
            return <Component createSubscriber={this.createSubscriber} {...(this.props as any)} />
        }
    };
};
