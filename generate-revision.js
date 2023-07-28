var fs = require('fs');
const yaml = require('js-yaml');

console.log("Incrementing build number")
let yamlFile = fs.readFileSync("version.yml", "utf8");
let version = yaml.load(yamlFile)
version.bridge_scorecard_api.revision = version.bridge_scorecard_api.revision + 1;
fs.writeFile("version.yml", yaml.dump(version), function (err) {
    if (err) throw err;
    console.log(`Current build number: ${version.bridge_scorecard_api.major}.${version.bridge_scorecard_api.minor}.${version.bridge_scorecard_api.revision}`);
})

// Path: generate-version.js