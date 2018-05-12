import Vec from 'victor';

import Disc from 'entities/Disc';
import Goal from 'entities/Goal';
import Line from 'entities/Line';
import Segment from 'entities/Segment';
import Player from 'entities/Player';
import State from 'state/State';

export interface GoalScored {
    disc: Disc;
    goal: Goal;
}

export default class Engine {
    private state: State;
    private prevBallPositions = new Map<number, Vec>();

    public run(state: State) {
        this.state = state;
        return state.playing ? this.update() : [];
    }

    private update() {
        const stadium = this.state.stadium;
        const goalsScored: GoalScored[] = [];

        const applyPlayerMovement = (disc: Disc, player: Player) => {
            disc.kicking = player.keys.kick;

            const accel = stadium.playerPhysics[disc.kicking ? 'kickingAcceleration' : 'acceleration'];
            const move = new Vec(0, 0);

            if (player.keys.left) {
                move.x -= 1;
            }

            if (player.keys.right) {
                move.x += 1;
            }

            if (player.keys.up) {
                move.y -= 1;
            }

            if (player.keys.down) {
                move.y += 1;
            }

            if (move.x != 0 || move.y != 0) {
                disc.velocity.add(move.normalize().multiplyScalar(accel));
            }
        };

        this.state.discs.forEach((disc, i) => {
            const player = this.state.getPlayerFromDisc(disc.id);

            if (player) {
                applyPlayerMovement(disc, player);
            }

            disc.position.add(disc.velocity);
            disc.velocity.multiplyScalar(disc.damping);
        });

        this.state.discs.sort((a, b) => {
            return a.isBall ? 1 : -1;
        });

        this.state.discs.forEach((disc, i1) => {
            this.state.discs.forEach((disc2, i2) => {
                if (disc2 == disc || i1 >= i2) {
                    return;
                }

                this.handleCircleCollision(disc, disc2);
            });

            this.state.stadium.segments.forEach(segment => {
                // quick hack until collision masks to prevent player/segment collision
                if (this.state.getPlayerFromDisc(disc.id)) {
                    return;
                }

                this.handleSegmentCollision(disc, segment);
            });

            if (!disc.isBall) {
                return;
            }

            this.state.stadium.goals.forEach(goal => {
                if (this.checkGoal(disc, goal)) {
                    goalsScored.push({ disc, goal });
                }
            });

            this.prevBallPositions.set(disc.id, disc.position.clone());
        });

        return goalsScored;
    }

    private handleCircleCollision(disc: Disc, disc2: Disc) {
        const distSq = disc.position.distanceSq(disc2.position);

        if (disc2.isBall && disc.position.distance(disc2.position) <= disc.radius + disc2.radius + 4) {
            const player = this.state.getPlayerFromDisc(disc.id);

            if (player && player.keys.kick) {
                this.kick(disc, disc2);
                player.keys.kick = false;
                disc.kicking = false;
            }
        }

        if (distSq <= Math.pow(disc.radius + disc2.radius, 2)) {
            this.collideCircles(disc, disc2);
        }
    }

    private collideCircles(disc: Disc, disc2: Disc) {
        const diff = disc.position.clone().subtract(disc2.position);
        const direction = diff.clone().normalize();
        const totalMass = disc.mass + disc2.mass;

        // reposition
        const total = disc.invMass + disc2.invMass;
        const overlap = disc.radius + disc2.radius - diff.length();
        const amount = overlap * (disc.invMass / total);

        disc.position.add(direction.clone().multiplyScalar(amount));
        disc2.position.subtract(direction.clone().multiplyScalar(overlap - amount));

        // bounce?
        const speedDiff = disc.velocity.clone().subtract(disc2.velocity);
        const dot = direction.dot(speedDiff);

        if (dot < 0) {
            const totalBounce = disc.bounce * disc2.bounce;
            const bounceDir = direction.clone().multiplyScalar(dot * (totalBounce + 1));

            const bounce1 = bounceDir.clone().multiplyScalar(disc.invMass / total);
            const bounce2 = bounceDir.clone().multiplyScalar(disc2.invMass / total);

            disc.velocity.subtract(bounce1);
            disc2.velocity.add(bounce2);
        }
    }

    private kick(disc: Disc, ball: Disc) {
        const direction = ball.position.clone()
            .subtract(disc.position)
            .normalize();

        const force = direction.multiplyScalar(disc.kickStrength * ball.invMass);
        ball.velocity.add(force);
    }

    private discDistanceToLine(disc: Disc, line: Line): false | [number, Vec] {
        const lineDist = line.p1.clone().subtract(line.p0);
        let discToLine = disc.position.clone().subtract(line.p0);

        if (discToLine.dot(lineDist) < 0) {
            return false;
        }

        if (discToLine.dot(lineDist) > 0) {
            discToLine = disc.position.clone().subtract(line.p1);
        }

        if (discToLine.dot(lineDist) >= 0) {
            return false;
        }

        const direction = lineDist.clone().normalize();
        const normal = new Vec(-direction.y, direction.x);

        return [normal.dot(discToLine), normal];
    }

    private handleSegmentCollision(disc: Disc, segment: Segment) {
        const result = this.discDistanceToLine(disc, segment);

        if (result === false) {
            return;
        }

        let [dist, normal] = result;

        // otherside
        if (dist < 0) {
            dist *= -1;
            normal.invert();
        }

        if (dist >= disc.radius) {
            return;
        }

        const sep = normal.clone().multiplyScalar(disc.radius - dist);
        disc.position.add(sep);

        const movement = normal.dot(disc.velocity);

        if (movement < 0) {
            const bounceFactor = movement * (disc.bounce * segment.bounce + 1);
            const bounce = normal.clone().multiplyScalar(bounceFactor);

            disc.velocity.subtract(bounce);
        }
    }

    private checkGoal(ball: Disc, goal: Goal) {
        if (!this.prevBallPositions.has(ball.id)) {
            return false;
        }

        const distBall = this.discDistanceToLine(ball, goal);
        const prevPos = this.prevBallPositions.get(ball.id);
        const prevDist = this.discDistanceToLine(new Disc(prevPos), goal);

        if (distBall === false || prevDist === false) {
            return false;
        }

        return (prevDist[0] > 0 && distBall[0] < 0) || (prevDist[0] < 0 && distBall[0] > 0);
    }
}
