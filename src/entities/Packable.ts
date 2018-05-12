export interface Packable {
    pack: () => object
}

export function isPackable(object: any): object is Packable {
    return typeof object.pack === 'function';
}
