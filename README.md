# version-check
When our app starts check we're using the correct node/npm version

[![circleci](https://circleci.com/gh/orangemug/version-check.png?style=shield)][circleci]
[![Dependency Status](https://david-dm.org/orangemug/version-check.svg)][dm-prod]
[![Dev Dependency Status](https://david-dm.org/orangemug/version-check/dev-status.svg)][dm-dev]

[circleci]:  https://circleci.com/gh/orangemug/version-check
[dm-prod]:   https://david-dm.org/orangemug/version-check
[dm-dev]:    https://david-dm.org/orangemug/version-check#info=devDependencies


## Why?
Because if as a company we've decided to use nodejs LTS, we want to assert that everyone is developing with the same version.


## Usage
At the start of your app include

    require("version-check");

This will assert that the [npm engines](https://docs.npmjs.com/files/package.json#engines) are valid.


## License
[MIT](LICENSE)
