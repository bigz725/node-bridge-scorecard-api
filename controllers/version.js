const fs = require('fs');
const yaml = require('js-yaml');
exports.version = (req, res) => {
    let yamlFile = fs.readFileSync("version.yml", "utf8");
    let bridgeApiVersion = yaml.load(yamlFile).bridge_scorecard_api;
    bridgeApiVersion.tag = process.env.TAG;
    res.status(200).send(bridgeApiVersion);
}
