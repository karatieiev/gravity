import '@testing-library/jest-dom';
import {MaterialPoint, Point} from "./types";
import {calcMovement, syncVectors} from "./logic";

const center: Point = { x: 0, y: 0 }

describe('logic', () => {
    describe('calcMovement', () => {
        test('uniform rectilinear motion of one object along the x-axis', () => {
            const materialPoint: MaterialPoint = {
                id: 'id',
                name: 'test',
                mass: 100,
                prevVector: {
                    azimuth: 90,
                    value: 10,
                    point: center
                },
                nextVector: {
                    azimuth: 90,
                    value: 10,
                    point: center
                }
            }
            calcMovement([materialPoint]);
            expect(materialPoint.nextVector.azimuth).toBeCloseTo(90);
            expect(materialPoint.nextVector.value).toBeCloseTo(10);
            expect(materialPoint.nextVector.point.x).toBeCloseTo(10);
        });
    });

    test('syncVectors', () => {
        const mp: MaterialPoint = {
            id: 'id',
            name: 'test',
            mass: 100,
            prevVector: {
                azimuth: 180,
                value: 1,
                point: {x: 10, y: 20}
            },
            nextVector: {
                azimuth: 0,
                value: 0,
                point: center
            }
        }
        syncVectors([mp]);
        expect(mp.nextVector.azimuth).toBe(180);
        expect(mp.nextVector.value).toBe(1);
        expect(mp.nextVector.point.x).toBe(10);
        expect(mp.nextVector.point.y).toBe(20);
    });
});
