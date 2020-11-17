"use strict";

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable '_'.
const _ = require("lodash");

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'util'.
const util = {
  replaceArray: (a, b) => _.isArray(b) && b || undefined,
  merge: function () {
    Array.prototype.push.call(arguments, util.replaceArray);
    return _.mergeWith.apply(_, arguments); // eslint-disable-line
  },
  //
  // if both are arrays and key starts with "+" then union the arrays
  //
  unionArray: (a, b, k) => {
    if (_.isArray(b)) {
      if (k.startsWith("+") && _.isArray(a)) {
        return _.union(a, b);
      }
      return b;
    }
  },

  uMerge: function () {
    Array.prototype.push.call(arguments, util.unionArray);
    return _.mergeWith.apply(_, arguments); // eslint-disable-line
  }
};

module.exports = util;
