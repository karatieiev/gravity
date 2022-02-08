import {Direction, Point, Vector} from "./types";

export const getDistance = (p1: Point, p2: Point): number => {
    return Math.pow(Math.pow(p1.x-p2.x, 2) + Math.pow(p1.y-p2.y, 2), 0.5);
}

export const getDirection = (basePoint: Point, azimuthPoint: Point): Direction => {
    const dX = basePoint.x - azimuthPoint.x;
    const dY = basePoint.y - azimuthPoint.y;
    const distance = getDistance(basePoint, azimuthPoint);
    const dXa = Math.abs(dX);
    const beta = Math.acos(dXa / distance) * 180 / Math.PI;
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
    return { azimuth, distance }
}

export const sumVectors = (vectors: Array<Vector>): Vector => {
    let dX: number = 0;
    let dY: number = 0;

    vectors.forEach(vector => {
        dX = dX + Math.sin(vector.azimuth * Math.PI / 180) * vector.value;
        dY = dY + Math.cos(vector.azimuth * Math.PI / 180) * vector.value;
    });

    const azimuthPoint: Point = {
        x: vectors[0].point.x + dX,
        y: vectors[0].point.y - dY
    }

    const direction: Direction = getDirection(vectors[0].point, azimuthPoint);

    return {
        point: azimuthPoint,
        azimuth: direction.azimuth,
        value: direction.distance
    };
}

export const invertAzimuth = (azimuth: number): number => {
    return azimuth >= 180 ? azimuth - 180 : azimuth + 180;
}
