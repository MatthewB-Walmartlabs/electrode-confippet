"use strict";
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable '_'.
const _ = require("lodash");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'processCon... Remove this comment to see the full error message
const processConfig = require("./process-config");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'composeCon... Remove this comment to see the full error message
const composeConfig = require("./compose-config");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'util'.
const util = require("./util");

function hideProperties(obj, props) {
  props.forEach((prop) => {
    Object.defineProperty(obj, prop, {
      enumerable: false,
      writable: false,
      configurable: false
    });
  });
}

class Config {
  store: any;
  constructor(store) {
    this.store = store;
  }

  use(data) {
    util.merge(this.store, data);
  }

  defaults(data) {
    _.defaultsDeep(this.store, _.clone(data));
  }

  compose(info) {
    util.merge(this.store, composeConfig(info));
  }

  process(options) {
    processConfig(this.store, options);
  }

  reset() {
    const keys = Object.keys(this.store);
    keys.forEach((k) => {
      delete this.store[k];
    });
  }
}

function $get(p) {
  return _.get(this, p); // eslint-disable-line
}

function factory() {
  const store = {};

  // @ts-expect-error ts-migrate(2339) FIXME: Property '$' does not exist on type '{}'.
  store.$ = $get;

  // @ts-expect-error ts-migrate(2339) FIXME: Property '_$' does not exist on type '{}'.
  store._$ = new Config(store);

  hideProperties(store, ["$", "_$"]);

  return store;
}

module.exports = factory;
