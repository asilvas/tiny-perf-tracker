import { fmt } from "./fmt";
import { toString } from "./toString";
import { toJSON } from "./toJSON";
import { track } from "./track";

const instances = {};

export function instance(name = "$", opts = {}) {
  const tinyPerfTracker = {
    r: {}, // results
    triggers: [],
    track,
    fmt,
    instance,
    toString,
    toJSON,
    ...opts,
  };

  const i = instances[name] || tinyPerfTracker;

  return (instances[name] = i);
}
