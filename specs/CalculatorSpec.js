/// <reference path="../reference/jasmine/jasmine.d.ts" />

import Calculator from '../services/Calculator';

describe('Calculator', function () {

    it('should sum numbers', function () {
        var calculator = new Calculator(),
			sum = calculator.sum(3, 5);

        expect(sum).toEqual(8);
    });

});