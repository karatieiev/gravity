import '@testing-library/jest-dom';
import {MaterialPoint, Point} from "./types";
import {calcMovement} from "./logic";

const center: Point = { x: 0, y: 0 }

describe('logic', () => {
    describe('calcMovement', () => {
        test('uniform rectilinear motion of one object along the x-axis', () => {
            const materialPoint: MaterialPoint = {
                id: 'id',
                name: 'test',
                mass: 100,
                point: center,
                vector: {
                    azimuth: 90,
                    value: 10
                }
            };
            calcMovement([materialPoint]);
            expect(materialPoint.vector.azimuth).toBeCloseTo(90);
            expect(materialPoint.vector.value).toBeCloseTo(10);
            expect(materialPoint.point.x).toBeCloseTo(10);
        });

        test('x-axis', () => {
            const materialPoint1: MaterialPoint = {
                id: 'id',
                name: 'test',
                mass: 100,
                point: {x: 0, y: 0},
                vector: {
                    azimuth: 90,
                    value: 0
                }
            };
            const materialPoint2: MaterialPoint = {
                id: 'id',
                name: 'test',
                mass: 100,
                point: {x: 10, y: 0},
                vector: {
                    azimuth: 270,
                    value: 1
                }
            };
            calcMovement([materialPoint1, materialPoint2]);
            expect(materialPoint1.vector.azimuth).toBeCloseTo(90);
            expect(materialPoint1.vector.value).toBeCloseTo(1);
            expect(materialPoint1.point.x).toBeCloseTo(1);
            expect(materialPoint2.vector.azimuth).toBeCloseTo(270);
            expect(materialPoint2.vector.value).toBeCloseTo(2);
            expect(materialPoint2.point.x).toBeCloseTo(8);
        });
    });

});
