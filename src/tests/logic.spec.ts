import '@testing-library/jest-dom';
import {MaterialPoint, Point} from "../helpers/types";
import {calcMovement} from "../helpers/logic";

const center: Point = { x: 0, y: 0 }

describe('logic', () => {
    describe('calcMovement', () => {
        test('uniform rectilinear motion of one object along the x-axis', () => {
            const materialPoint: MaterialPoint = {
                id: 1,
                name: 'test',
                mass: 100,
                point: center,
                color: 'red',
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
                id: 1,
                name: 'test',
                mass: 100,
                point: {x: 0, y: 0},
                color: 'red',
                vector: {
                    azimuth: 90,
                    value: 0
                }
            };
            const materialPoint2: MaterialPoint = {
                id: 1,
                name: 'test',
                mass: 100,
                point: {x: 10, y: 0},
                color: 'red',
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

    test('x-axis', () => {
        const materialPoint1: MaterialPoint = {
            id: 1,
            name: 'test',
            mass: 100000,
            point: {x: 0, y: 0},
            color: 'red',
            vector: {
                azimuth: 90,
                value: 0
            }
        };
        const materialPoint2: MaterialPoint = {
            id: 1,
            name: 'test',
            mass: 100,
            point: {x: 100, y: 0},
            color: 'red',
            vector: {
                azimuth: 270,
                value: 0
            }
        };
        calcMovement([materialPoint1, materialPoint2]);
        expect(materialPoint2.vector.azimuth).toBeCloseTo(270);
        expect(materialPoint2.vector.value).toBeCloseTo(10);
        expect(materialPoint2.point.x).toBeCloseTo(90);
    });

});
