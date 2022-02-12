import {SummedVector, MaterialPoint, Vector} from "./types";
import {getDistance, getVector, invertAzimuth, sumVectors} from "./vectors";

export const generateMaterialPoint = (): MaterialPoint => {
    return {
        id: Math.random(),
        name: '',
        mass: 1000,
        point: {x: 100, y: 100},
        vector: {
            azimuth: 90,
            value: 3
        }
    }
}

export const calcMovement = (arr: Array<MaterialPoint>): number => {
    if (!arr.length) return 100;
    const vectors: Vector[][] = [[],[],[],[],[],[],[],[]];
    const summedVectors: SummedVector[] = [];
    for (let i=0; i<arr.length-1; i++) {
        for (let j=i+1; j<arr.length; j++) {
            const vector = getVector(arr[i].point, arr[j].point);
            vectors[i].push({
                azimuth: vector.azimuth,
                value: vector.value < 3 ? 0 : arr[j].mass / Math.pow(vector.value, 2)
            });
            vectors[j].push({
                azimuth: invertAzimuth(vector.azimuth),
                value: vector.value < 3 ? 0 : arr[i].mass / Math.pow(vector.value, 2)
            });
        }
    }
    let maxDelta = 0;
    for (let i=0; i<arr.length; i++) {
        let summedVector: SummedVector;

        if (vectors.length)
            summedVector = sumVectors([arr[i].vector, ...vectors[i]]);
        else
            summedVector = sumVectors([arr[i].vector]);

        maxDelta = Math.max(maxDelta, Math.abs(summedVector.dX), Math.abs(summedVector.dY));
        summedVectors.push(summedVector);
    }
    const factor = 1/maxDelta;
    for (let i=0; i<arr.length; i++) {
        arr[i].vector = summedVectors[i].vector;
        arr[i].point.x += summedVectors[i].dX;
        arr[i].point.y += summedVectors[i].dY;
    }
    return factor;
}

export const needToUpdateContext = (arr1: Array<MaterialPoint>, arr2: Array<MaterialPoint>, factor: number): boolean => {
    if (factor > 0.25) return true;
    let delta = 2;
    if (factor >= 0.05 && factor < 0.1 ) delta = 3;
    else if (factor >= 0.03333 && factor < 0.05000 ) delta = 5;
    else if (factor >= 0.02500 && factor < 0.03333 ) delta = 7;
    else if (factor >= 0.02000 && factor < 0.02500 ) delta = 9;
    else if (factor >= 0.01429 && factor < 0.02000 ) delta = 12;
    else if (factor >= 0.01111 && factor < 0.01429 ) delta = 16;
    else if (factor >= 0.00909 && factor < 0.01111 ) delta = 20;
    else if (factor >= 0.00769 && factor < 0.00909 ) delta = 24;
    else if (factor >= 0.00666 && factor < 0.00769 ) delta = 28;
    else if (factor >= 0.00526 && factor < 0.00666 ) delta = 34;
    else if (factor >= 0.00435 && factor < 0.00526 ) delta = 42;
    else if (factor >= 0.00370 && factor < 0.00435 ) delta = 50;
    else delta = 65;
    for(let i=0; i<arr1.length; i++) {
        if (getDistance(arr1[i].point, arr2[i].point) > delta) return true
    }
    return false;
}
