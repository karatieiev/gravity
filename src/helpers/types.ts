export interface Point {
    x: number,
    y: number
}

export interface Azimuth {
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
