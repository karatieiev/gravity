export interface Point {
    x: number,
    y: number
}

export interface Direction {
    azimuth: number,
    distance: number
}

export interface Vector {
    point: Point,
    azimuth: number,
    value: number
}

export interface SumVector {
    basePoint: Point,
    azimuthPoint: Point,
    azimuth: number,
    value: number
}

export interface MaterialPoint {
    id: number | string,
    name: string,
    prevVector: Vector,
    nextVector: Vector,
    mass: number
}
