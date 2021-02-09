import { fmt } from "./fmt";
import { toString } from "./toString";
import { toJSON } from "./toJSON";
import { track } from "./track";

export function create() {
  return {
    r: {}, // results
    triggers: [],
    track,
    fmt,
    create,
    toString,
    toJSON,
    p: window?.performance||eval("require('perf_hooks').performance"), // eval hack to avoid web bundlers looking at node builtin
  };
}
