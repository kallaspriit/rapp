# RAPP - React APP
**RAPP (React APP) is a happy marriage of [react](http://facebook.github.io/react/), [react-router](http://rackt.github.io/react-router/) and [redux](http://gaearon.github.io/redux/index.html), providing reasonable directory structure and workflow tooling for authoring powerful modern web applications.**

It provides dev server with hot reload, production version generator, test framework and linting. You can write your code in ES6 and simple production app weighs in at around 284KB without gzip.

## Getting started
- `> npm install` - installs all the libraries dependencies
- `> gulp dev` - starts the dev server on port 3000 and production server on 3001
- open [http://localhost:3000](http://localhost:3000/)

## Gulp tasks
- `> gulp dev` - starts the dev server on port 3000 and production server on 3001
- `> gulp production` - starts production server on port 3001, application is rebuilt on source changes
- `> gulp lint` - checks the codebase for errors and style guide
- `> gulp test` - runs the test suite
- `> gulp build` - builds the production bundle in "build/production" directory

## Application libraries
- [react](http://facebook.github.io/react/) - facebook's user interface library
- [react-router](http://rackt.github.io/react-router/) - complete routing solution designed specifically for React.js
- [redux](http://gaearon.github.io/redux/index.html) - predictable state container for JavaScript apps

## Development tools
- [react-hot-loader](https://github.com/gaearon/react-hot-loader) - lets you tweak React components in real time
- [redux-devtools](https://github.com/gaearon/redux-devtools) - enables stores time travel
- [gulp](http://gulpjs.com/) - task automation
- [webpack](http://webpack.github.io/) - module bundler that takes modules with dependencies and generates static assets representing those modules
- [babel](https://babeljs.io/) - JavaScript transformer enabling ES2015 and more
- [postcss](https://twitter.com/postcss) - tool for transforming CSS with JS plugins
- [karma](http://karma-runner.github.io/0.13/index.html) - spectacular test runner
- [jasmine](http://jasmine.github.io/) - behavior-driven development framework for testing JavaScript code
- [eslint](http://eslint.org/) - provides pluggable linting utility for JavaScript

## Features
- write your code in ES2015
- full source maps support
- task automation with gulp
- built-in dev server
- redux dev tools including time-machine
- hot reload for views, flux reducers (redux flux stores) and CSS
- production version generation
- code linting including react components
- travis integration

## TODO
- resource generators
- testing views and components
- API communication example