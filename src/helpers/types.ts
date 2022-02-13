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
    id: number,
    name: string,
    mass: number,
    point: Point,
    vector: Vector,
    color: string
    showPath?: boolean
}

export interface Path {
    id: number,
    points: Point[]
}
