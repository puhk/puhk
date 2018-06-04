import Disc from '@src/entities/Disc';
import State from '@src/state/State';

export default function handleCircleCollision(state: State, disc: Disc, disc2: Disc) {
    const distSq = disc.position.distanceSq(disc2.position);

    if (disc2.isBall && disc.position.distance(disc2.position) <= disc.radius + disc2.radius + 4) {
        const player = state.getPlayerFromDisc(disc.id);

        if (player && player.keys.kick) {
            kick(disc, disc2);
            player.keys.kick = false;
            disc.borderFlash = false;
        }
    }

    if (distSq <= Math.pow(disc.radius + disc2.radius, 2)) {
        collideCircles(disc, disc2);
    }
}

function collideCircles(disc: Disc, disc2: Disc) {
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

function kick(disc: Disc, ball: Disc) {
    const direction = ball.position.clone()
        .subtract(disc.position)
        .normalize();

    const force = direction.multiplyScalar(disc.kickStrength * ball.invMass);
    ball.velocity.add(force);
}
