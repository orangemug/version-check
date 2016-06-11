var cp     = require("child_process");
var semver = require("semver");

// The apps package.json
var pkg = require("../../package.json");

var version = {
  node: process.version,
  npm: cp.execSync("npm --version").toString().replace(/^\s+|\s+$/, "")
};

var toCheck = [
  "node",
  "npm"
];

var hasErrored = false;

toCheck.forEach(function(engine) {
  if(!pkg.engines.hasOwnProperty(engine)) {
    console.warn("'%s' engine missing in package.json", engine);
  }
  else {
    var passes = semver.satisfies(version[engine], pkg.engines[engine]);
    if(!passes) {
      console.error("'"+engine+"' ("+version[engine]+") does not satisfy "+pkg.engines[engine]);
      console.error("Suggest installing nvm <https://github.com/creationix/nvm>");
      hasErrored = true;
    }
  }
});

if(hasErrored) {
  process.exit(40);
}

