import Vec from 'victor';

export default abstract class AbstractPositionalEntity {
    position: Vec;

    constructor(position: Vec) {
        this.position = position;
    }
}
