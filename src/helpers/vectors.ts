import {Point, SummedVector, Vector} from "./types";

export const getDistance = (p1: Point, p2: Point): number => {
    return Math.pow(Math.pow(p1.x-p2.x, 2) + Math.pow(p1.y-p2.y, 2), 0.5);
}

export const getVector = (basePoint: Point, azimuthPoint: Point): Vector => {
    const dX = basePoint.x - azimuthPoint.x;
    const dY = basePoint.y - azimuthPoint.y;
    const value = getDistance(basePoint, azimuthPoint);
    if (value === 0) return {azimuth: 0, value: 0};
    const dXa = Math.abs(dX);
    const beta = Math.acos(dXa / value) * 180 / Math.PI;
    let azimuth;
    if (dX > 0) {
        if (dY < 0)
            azimuth = 270 - beta;
        else
            azimuth = 270 + beta;
    } else {
        if (dY < 0)
            azimuth = 90 + beta;
        else
            azimuth = 90 - beta;
    }
    return { azimuth, value }
}

export const sumVectors = (vectors: Array<Vector>): SummedVector => {
    let dX: number = 0;
    let dY: number = 0;

    vectors.forEach(vector => {
        dX = dX + Math.sin(vector.azimuth * Math.PI / 180) * vector.value;
        dY = dY + Math.cos(vector.azimuth * Math.PI / 180) * vector.value;
    });

    dY = -dY;

    const vector: Vector = getVector({x: 0, y: 0}, {x: dX, y: dY});

    return { vector, dX, dY };
}

export const invertAzimuth = (azimuth: number): number => {
    return azimuth >= 180 ? azimuth - 180 : azimuth + 180;
}
