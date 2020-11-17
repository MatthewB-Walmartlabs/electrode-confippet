"use strict";

const jsYaml = require("js-yaml");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fs'.
const fs = require("fs");

module.exports = {
  json: require,
  js: require,
  yaml: (fullF) => jsYaml.load(fs.readFileSync(fullF, "utf8"))
};
