import log from './services/Log.js';
import Calculator from './services/Calculator.js';

let calculator = new Calculator();

log('hello world, 4 + 2 = ' + calculator.sum(4, 2));