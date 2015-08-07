import Calculator from '../services/Calculator';

describe('Calculator', function () {

    it('should sum numbers', function () {
        let calculator = new Calculator(),
			sum = calculator.sum(3, 5);

        expect(sum).toEqual(8);
    });

});