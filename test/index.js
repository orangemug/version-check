var assert     = require("assert");
var proxyquire = require("proxyquire").noCallThru();


describe("version-check", function() {

  function test(opts) {
    var oldExit = process.exit;
    var exited;
    process.exit = function(_code) {
      exited = _code;
    };

    var engines = {}
    if(opts.pkg.hasOwnProperty("node")) {
      engines.node = opts.pkg.node;
    }
    if(opts.pkg.hasOwnProperty("npm")) {
      engines.npm = opts.pkg.npm;
    }

    Object.defineProperty(process, 'version', {
      value: opts.system.node
    })
    proxyquire('../', {
      "child_process": {
        execSync: function() {
          return opts.system.npm || ""
        }
      },
      "../../package.json": {
        engines: engines
      }
    });

    process.exit = oldExit;

    return exited;
  }

  it("should error on invalid npm version", function() {
    var exitCode = test({
      system: {npm: "0.3.0"},
      pkg: {npm: ">0.3.0"}
    })

    assert.equal(exitCode, 40);
  });

  it("should error on invalid node version", function() {
    var exitCode = test({
      system: {node: "0.3.0"},
      pkg: {node: ">0.3.0"}
    })

    assert.equal(exitCode, 40);
  });

  it("should pass on valid npm version", function() {
    var exitCode = test({
      system: {npm: "0.3.1"},
      pkg: {npm: ">0.3.0"}
    })

    assert.equal(exitCode, undefined);
  });

  it("should pass on valid node version", function() {
    var exitCode = test({
      system: {node: "0.3.1"},
      pkg: {node: ">0.3.0"}
    })

    assert.equal(exitCode, undefined);
  });

  it("should error on invalid npm and node version", function() {
    var exitCode = test({
      system: {
        node: "0.3.0",
        npm: "0.3.0"
      },
      pkg: {
        node: ">0.3.0",
        npm: ">0.3.0"
      }
    })

    assert.equal(exitCode, 40);
  });

  it("should pass on valid npm and node version", function() {
    var exitCode = test({
      system: {
        node: "0.3.1",
        npm: "0.3.1"
      },
      pkg: {
        node: ">0.3.0",
        npm: ">0.3.0"
      }
    })

    assert.equal(exitCode, undefined);
  });

});

