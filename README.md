# version-check
When our app starts check we're using the correct node/npm version


## Why?
Because if as a company we've decided to use nodejs LTS, we want to assert that everyone is developing with the same version.


## Usage
At the start of your app include

    require("version-check");

This will assert that the [npm engines](https://docs.npmjs.com/files/package.json#engines) are valid.


## License
[MIT](LICENSE)
