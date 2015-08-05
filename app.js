import React from 'react';

import log from './services/Log.js';
import Calculator from './services/Calculator.js';
import RootView from './views/RootView.jsx';

let calculator = new Calculator();

log('hello world, 4 + 2 = ' + calculator.sum(4, 2));

React.render(
    React.createElement(RootView),
    document.getElementById('app')
);