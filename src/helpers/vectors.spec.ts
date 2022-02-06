import '@testing-library/jest-dom';
import {getDistance} from "./vectors";

describe('vectors', () => {

    test('getDistance', () => {
        expect(getDistance({x: 0, y: 0}, {x: 3, y: 4})).toBe(5);
    });

    test('getDirection', () => {

    });

});
