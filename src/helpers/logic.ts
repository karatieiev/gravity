import {MaterialPoint, Vector} from "./types";
import {getDirection, invertAzimuth, sumVectors} from "./vectors";

export const generateMaterialPoint = (): MaterialPoint => {
    return {
        id: Math.random(),
        name: '',
        mass: 1000000,
        prevVector: {
            azimuth: 90,
            value: 100,
            point: {x: 100, y: 100}
        },
        nextVector: {
            azimuth: 90,
            value: 100,
            point: {x: 100, y: 100}
        }
    }
}

export const calcMovement = (arr: Array<MaterialPoint>) => {
    if (!arr.length) return;
    const vectors: Vector[][] = [[],[]];
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
        mp.prevVector.azimuth = mp.nextVector.azimuth;
        mp.prevVector.value = mp.nextVector.value;
        mp.prevVector.point.x = mp.nextVector.point.x;
        mp.prevVector.point.y = mp.nextVector.point.y;
    });
}
