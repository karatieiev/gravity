import {Direction, MaterialPoint, Point, Vector} from "./types";

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

export const calcMovement = (arr: Array<MaterialPoint>) => {
    if (!arr.length) return;
    const vectors: Array<Array<Vector>> = [[]];
    for (let i=0; i<arr.length-1; i++) {
        for (let j=i; j<arr.length-1; j++) {
            const direction = getDirection(arr[j].prevVector.point, arr[j+1].prevVector.point);
            vectors[j].push({
               azimuth: direction.azimuth,
               point: {
                   x: arr[j].prevVector.point.x,
                   y: arr[j].prevVector.point.y
               },
               value: arr[j+1].mass / Math.pow(direction.distance, 2)
            });
            vectors[j+1].push({
                azimuth: invertAzimuth(direction.azimuth),
                point: {
                    x: arr[j+1].prevVector.point.x,
                    y: arr[j+1].prevVector.point.y
                },
                value: arr[j].mass / Math.pow(direction.distance, 2)
            });
        }
    }
    for (let i=0; i<arr.length; i++) {
        let resultVector: Vector | null;

        if (vectors.length)
            resultVector = sumVectors([arr[i].prevVector, ...vectors[i]]);
        else
            resultVector = sumVectors([arr[i].prevVector]);

        arr[i].nextVector = {
            point: {
                x: resultVector.point.x,
                y: resultVector.point.y,
            },
            azimuth: resultVector.azimuth,
            value: resultVector.value
        }
    }
}

export const syncVectors = (arrayOfMaterialPoints: Array<MaterialPoint>) => {
    arrayOfMaterialPoints.forEach(mp => {
        mp.nextVector.azimuth = mp.prevVector.azimuth;
        mp.nextVector.value = mp.prevVector.value;
        mp.nextVector.point.x = mp.prevVector.point.x;
        mp.nextVector.point.y = mp.prevVector.point.y;
    });
}
