import '@testing-library/jest-dom';
import {getDirection, getDistance, invertAzimuth, sumVectors} from "./vectors";
import {Point} from "./types";

const center: Point = { x: 0, y: 0 }

describe('vectors', () => {

    describe('getDirection', () => {
        test('north', () => {
            expect(getDirection(center, {x: 0, y: -10})).toEqual({distance: 10, azimuth: 0});
        });
        test('east-north', () => {
            expect(getDirection(center, {x: 4, y: -4}).azimuth).toBeCloseTo(45);
        });
        test('east', () => {
            expect(getDirection(center, {x: 4, y: 0}).azimuth).toBeCloseTo(90);
        });
        test('east-south', () => {
            expect(getDirection(center, {x: 4, y: 4}).azimuth).toBeCloseTo(135);
        });
        test('south', () => {
            expect(getDirection(center, {x: 0, y: 4}).azimuth).toBeCloseTo(180);
        });
        test('west-south', () => {
            expect(getDirection(center, {x: -4, y: 4}).azimuth).toBeCloseTo(225);
        });
        test('west', () => {
            expect(getDirection(center, {x: -4, y: 0}).azimuth).toBeCloseTo(270);
        });
        test('west-north', () => {
            expect(getDirection(center, {x: -4, y: -4}).azimuth).toBeCloseTo(315);
        });
    });

    describe('invertAzimuth', () => {
        test('less than 180 degree', () => {
            expect(invertAzimuth(90)).toBe(270);
        });
        test('more than 180 degree', () => {
            expect(invertAzimuth(280)).toBe(100);
        });
        test('0 degree', () => {
            expect(invertAzimuth(0)).toBe(180);
        });
        test('180 degree', () => {
            expect(invertAzimuth(180)).toBe(0);
        });
    });

    describe('sumVectors', () => {
        test('along the x-axis, same direction', () => {
            const result = sumVectors([
                {point: center, value: 4, azimuth: 90},
                {point: center, value: 2, azimuth: 90}
            ]);
            expect(result.azimuth).toBeCloseTo(90);
            expect(result.value).toBeCloseTo(6);
        });
        test('along the x-axis, opposite direction', () => {
            const result = sumVectors([
                {point: center, value: 4, azimuth: 90},
                {point: center, value: 2, azimuth: 270}
            ]);
            expect(result.azimuth).toBeCloseTo(90);
            expect(result.value).toBeCloseTo(2);
        });
        test('along the y-axis, opposite direction', () => {
            const result = sumVectors([
                {point: center, value: 4, azimuth: 0},
                {point: center, value: 2, azimuth: 180}
            ]);
            expect(result.azimuth).toBeCloseTo(0);
            expect(result.value).toBeCloseTo(2);
        });
        test('x-axis same direction, y-axis opposite direction', () => {
            const result = sumVectors([
                {point: center, value: 4, azimuth: 30},
                {point: center, value: 4, azimuth: 150}
            ]);
            expect(result.azimuth).toBeCloseTo(90);
            expect(result.value).toBeCloseTo(4);
        });
    });

    describe('misc', () => {
        test('getDistance', () => {
            expect(getDistance(center, {x: 3, y: 4})).toBe(5);
        });
    });

});
