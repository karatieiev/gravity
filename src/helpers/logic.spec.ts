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
            }
            calcMovement([materialPoint]);
            expect(materialPoint.vector.azimuth).toBeCloseTo(90);
            expect(materialPoint.vector.value).toBeCloseTo(10);
            expect(materialPoint.point.x).toBeCloseTo(1);
        });
    });

});
