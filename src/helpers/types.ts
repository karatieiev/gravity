export interface Point {
    x: number,
    y: number
}

export interface Vector {
    azimuth: number,
    value: number
}

export interface SummedVector {
    vector: Vector,
    dX: number,
    dY: number
}

export interface MaterialPoint {
    id: number | string,
    name: string,
    mass: number,
    point: Point,
    vector: Vector
}
